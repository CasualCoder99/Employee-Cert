import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-give-test',
  templateUrl: './give-test.component.html',
  styleUrls: ['./give-test.component.css']
})
export class GiveTestComponent implements OnInit {

  state$!: Observable<object>;

  questions!: Array<any>;

  currentQues: any;

  currentQuesIndex = -1;

  questionDisplay: any;

  testId: any;

  test: any;

  markedAnswers: Map<number, string> = new Map();

  testSubmitted = false;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private testService: TestService) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.questions = this.router.getCurrentNavigation()?.extras.state!.questions;
      this.testId = this.router.getCurrentNavigation()?.extras.state!.testId;
    }
    else {
      this.router.navigate(['/create-test']);
    }
    this.testService.fetchTestById(this.testId).subscribe(
      response => {
        console.log(response);
        this.test = response;
      }
    )
  }

  ngOnInit(): void {
    // console.log(this.markedAnswers);
  }



  progressTest(jump: number) {
    this.questionDisplay = document.getElementById('currentQues');
    this.currentQuesIndex += jump;
    if (this.currentQuesIndex < this.questions.length) {
      this.currentQues = this.questions[this.currentQuesIndex];
    }
  }

  markAnswer(mark: string, id: number) {
    // console.log(mark, id);
    this.markedAnswers.set(id, mark);
  }

  getMarkedAnswer(id: number) {
    return this.markedAnswers.get(id);
  }

  submitTest() {
    // console.log(this.markedAnswers);
    this.testSubmitted = true;
    this.testService.fetchTestById(this.testId).subscribe(
      response => {
        this.test = response;
        this.testService.submitTest(this.testId, this.markedAnswers).subscribe(
          data => {
            console.log(this.markedAnswers, this.testId)
            this.testSubmitted = false;
            this.router.navigateByUrl('/test', {
              state: {
                "test": this.test,
                "markedAnswers": this.markedAnswers
              }
            })
          },
          error => {
            console.log(error);
            this.testSubmitted = false;
          }
        );
      }
    )
  }


}