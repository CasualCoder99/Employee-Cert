import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  password1  = '';

  password2 = '';

  empId = sessionStorage.getItem('authenticatedUser');

  form!: FormGroup;

  loading = false;
  submitted = false;

  invalidReset = false;
  validationError = ""

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
      employeeId: [''],
      password1: ['', [Validators.required]],
      password2: ['', Validators.required]
  });
  if(!this.empId)
    this.formController.employeeId.setValidators([Validators.required, Validators.pattern('[0-9 ]*')])
  }

  get formController() { 
    return this.form.controls; 
  }

  handleReset(){
    
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }

    if(this.formController.password1.value !== this.formController.password2.value){
      this.invalidReset = true;
      this.validationError = "Passwords entered do not match. Try again";
      console.log(this.validationError)
      return
    }

    this.loading = true;

    if(this.empId === null){
      this.empService.checkEmployeeIdValid(Number(this.formController.employeeId.value))
      .subscribe(
        data => {
         console.log(data)
         if(data === true){
           this.empService.resetPassword(Number(this.formController.employeeId.value), this.formController.password2.value).subscribe(
             response => {
               console.log(response);
               this.loading = false;
                this.invalidReset = false;
                this.router.navigate(['home']);
             }
           )
       }
       else{
         this.invalidReset = true;
         this.validationError = "Employee doesn't exist for the Id entered. Try again."
         this.loading = false;
         return
       }
     },
     error => {
       console.log(error);
       this.loading = false;
       this.invalidReset = false;
     }
     )
    }
    else{
      this.empService.resetPassword(Number(this.empId), this.formController.password2.value).subscribe(
        response => {
          console.log(response);
          this.loading = false;
          this.invalidReset = false;
          this.router.navigate(['home']);
        }
      )
      this.invalidReset = false;
    }

    
      }

}
