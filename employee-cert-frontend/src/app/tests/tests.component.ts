import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Test, TestService } from '../services/test.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  loadingTest!:boolean;

  test: any;

  show: boolean = false;

  constructor(private testService:TestService,
     private router:Router,
     public authService: AuthenticationService) {
    this.test = this.router.getCurrentNavigation()?.extras.state!.test;
     }

  ngOnInit(): void {
    this.loadingTest = false;
    console.log(this.test)
  }

  attemptTest(test: any) {
    document.getElementById('attemptTest')?.setAttribute('data-dismiss', 'modal');
    this.testService.fetchAllQuestionObjectsForTest(test.testId).subscribe(
      response => {
        console.log(response);

        console.log(document.getElementById('attemptTest'))
        this.router.navigateByUrl('/give-test', { state: { "questions": response, "testId": test.testId } })
      }
    )
  }

}
