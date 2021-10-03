import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username  = '';

  password = '';

  form!: FormGroup;

  loading = false;
  submitted = false;

  invalidLogin = false;

  router: Router;
  authenticationService: AuthenticationService;

  constructor(router: Router, 
    authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private empService: EmployeeService
    ) { 
    this.router = router;
    this.authenticationService = authenticationService;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      employeeId: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],
      password: ['', Validators.required]
  });
  }

  get formController() { 
    return this.form.controls; 
  }


  handleLogin(){
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;

    this.empService.checkEmployeeValid(Number(this.formController.employeeId.value), this.formController.password.value)
         .subscribe(
           data => {
            // console.log(data)
            if(data === true){
              this.empService.getEmployeeObject(this.formController.employeeId.value).subscribe(
                response => {
                  // console.log(response)
                  sessionStorage.setItem('persona', response.employeeType)
                  sessionStorage.setItem('name', response.name)
                  if(response.hasResetPassword)
                    this.router.navigate(['home']);
                  else
                    this.router.navigate(['password-reset'])
                }
              )
              sessionStorage.setItem('authenticatedUser', this.formController.employeeId.value.toString());
              // console.log("Logged In");
              this.invalidLogin = false;
          }
          else{
            this.invalidLogin = true;
            this.loading = false;
            return
          }
        },
        error => {
          console.log(error);
          this.loading = false;
        }
        )
  }


}
