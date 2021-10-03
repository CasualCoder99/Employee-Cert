import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Employee } from '../services/employee.service';
import { Test, TestService } from '../services/test.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  test: Test = new Test('', '', '', {"emp": {}})
  viewTest: any;

  form!: FormGroup;

  employeeId: string = "";

  difficulty: string = "Select Difficulty";

  testCategory: string = "Select Test Category";

  submitted = false;
  loading = false;

  loadingTests = false;
  loadingTest = false;

  tests: Array<Test> = [];

  constructor(private testService: TestService,
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthenticationService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.form = this.formBuilder.group({
      testName: ['', Validators.required],
      employeeId: ['', Validators.required],
      difficultyLevel: ['', Validators.required],
      testCategory: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadingTests = true;
    if (this.authService.isSystemAdmin()) {
      this.testService.fetchAllTestObjects().subscribe(
        response => {
          response.forEach((test) => {
            if (test.testName)
              this.tests.push(test)
          })
          console.log(this.tests)
          this.loadingTests = false;
          // console.log(this.questions)
        }
      )
    }
    else if (this.authService.isManager()) {
      this.testService.fetchAllTestObjectsForManager(Number(sessionStorage.getItem('authenticatedUser')))
        .subscribe(
          response => {
            response.forEach((test) => {
              if (test.testName)
                this.tests.push(test)
            })
            console.log(this.tests)
            this.loadingTests = false;
            // console.log(this.questions)
          }
        )
    }
    else {
      this.testService.fetchAllTestObjectsForEmployee(Number(sessionStorage.getItem('authenticatedUser')))
        .subscribe(
          response => {
            response.forEach((test) => {
              if (test.testName)
                this.tests.push(test)
            })
            console.log(this.tests)
            this.loadingTests = false;
            // console.log(this.questions)
          }
        )
    }
  }

  get formController() {
    return this.form.controls;
  }

  onSubmitForm() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      // console.log(this.form)
      return;
    }

    console.log(this.test);
    this.loading = true;
    this.test.testName = this.formController.testName.value;
    this.test.emp.employeeId = this.formController.employeeId.value;
    this.test.testDifficulty = this.formController.difficultyLevel.value;
    this.test.testCategory = this.formController.testCategory.value;
    this.testService.createTestObject(this.test)
      .subscribe(
        response => {
          console.log(response)
          this.loading = false;
          this.router.navigate(['/create-test'])
        },
        error => {
          this.loading = false
          console.log(error)
        }
      )
  }

  changeDifficulty(level) {
    this.difficulty = level;
    this.formController.difficultyLevel.setValue(level);
  }

  changeEmployeeId(id) {
    this.employeeId = id;
    this.formController.employeeId.setValue(id);
  }

  changeTestCategory(testCategory) {
    this.testCategory = testCategory;
    this.formController.testCategory.setValue(testCategory);
  }

  onView(test: any) {
    // console.log(test.testId);
    this.loadingTest = true;
    this.testService.fetchTestById(test.testId).subscribe(
      response => {
        // console.log(response);
        this.viewTest = response;
        this.loadingTest = false;
        this.router.navigateByUrl('/test', { state: { "test": this.viewTest } })
      },
      error => {
        console.log(error);
        this.loadingTest = false;
      }
    )
  }

}