import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Question, QuestionService } from '../services/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  form!:FormGroup;

  ques: Question = new Question('', ['', '', '', ''], '', '', '');

  difficulty: string = "Select Difficulty";

  testCategory: string = "Select Test Category"

  questions: Array<Question> = []

  loadingForm = false;
  submitted = false;

  loadingQuestions = false;

  constructor(private quesService: QuestionService,
    private formBuilder: FormBuilder,
    private router: Router) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      };
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      questionStatement: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      difficulty: ['', Validators.required],
      testCategory: ['', Validators.required],
  });
    this.loadingQuestions = true;
    this.quesService.fetchAllQuestionObjects()
      .subscribe(
        response => {
          response.forEach((ques) => {
            if(ques.questionStatement)
              this.questions.push(ques)
          })
          this.loadingQuestions = false;
        }
      )
      // this.loadingQuestions = false;
      
  }

  get formController() { 
    return this.form.controls; 
  }

  onSubmitForm(){
    this.submitted = true;
    // stop here if form is invalid
    // console.log(this.formController)
    if (this.form.invalid) {
        return;
    }
    // this.ques = this.formController
    this.ques.correctAnswer = this.formController.correctAnswer.value;
    this.ques.difficultyLevel = this.formController.difficulty.value;
    this.ques.testCategory = this.formController.testCategory.value;
    this.ques.questionStatement = this.formController.questionStatement.value;
    this.ques.possibleAnswers = [this.formController.option1.value, this.formController.option2.value,
        this.formController.option3.value, this.formController.option4.value];
    // console.log(this.ques)
    this.loadingForm = true;
    this.quesService.createQuestionObject(this.ques)
      .subscribe(
        response => {
          // console.log(response)
          this.router.navigate(['/questions'])
        }
      )

  }

  changeDifficulty(level){
    this.ques.difficultyLevel = level;
    this.formController.difficulty.setValue(level)
  }

  changeTestCategory(testCategory){
    this.ques.testCategory = testCategory;
    this.formController.testCategory.setValue(testCategory)
  }

  setCorrectAnswer(answer){
    this.ques.correctAnswer = answer;
    this.formController.correctAnswer.setValue(answer);
  }

}
