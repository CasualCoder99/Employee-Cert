import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { QuestionService } from '../services/question.service';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  loadingAttemptTest = false;;

  test: any;

  show: boolean = false;

  markedAnswers!: Map<Number, String>;

  currentQues!: any;

  questions: Array<any> = [];

  loadingQuestions = false;


  constructor(private testService: TestService,
    private quesService: QuestionService,
    private router: Router,
    public authService: AuthenticationService) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.test = this.router.getCurrentNavigation()?.extras.state!.test;
    }
    else {
      this.router.navigate(['/create-test'])
    }
  }

  ngOnInit(): void {
    // console.log(this.test)
    if (this.test.isTestAttempted) {
      this.loadingQuestions = true;
      this.testService.fetchMarkedAnswers(this.test.testId).subscribe(
        response => {
          this.markedAnswers = response;
          this.loadingQuestions = false;
          Object.keys(this.markedAnswers).forEach((key) => {
            // console.log(key, this.markedAnswers[key]);
            this.quesService.fetchQuestionObject(Number(key)).subscribe(
              response => {
                this.questions.push(response); //question objects
              },
              error => {
                this.loadingQuestions = false;
                console.log(error);
              }
            )
          })
        },
        error => {
          this.loadingQuestions = false;
          console.log(error);
        }
      )
    }
    // this.quesService.fetchAllQuestionObjects().subscribe(
    //   response => {
    //     this.questions = response; 
    //     console.log(this.questions)  
    //     this.loadingQuestions = false;
    //   }
    // )
  }

  attemptTest() {
    this.loadingAttemptTest = true;
    this.testService.fetchAllQuestionObjectsForTest(this.test.testId).subscribe(
      response => {
        // console.log(response);
        // console.log(document.getElementById('attemptTest'))
        this.loadingAttemptTest = false;
        this.router.navigateByUrl('/give-test', { state: { "questions": response, "testId": this.test.testId } })
      }
    )
  }

  getCorrectAnswer(option: string, ques: any){
    return ques.possibleAnswers[option.charCodeAt(0) - 65]
  }

}