import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Employee, EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  employee: any;

  profileLoading: boolean = false;

  editform!: FormGroup;


  loading = false;
  submitted = false;
  invalidSubmit = false;

  loadingEmployees = false;
  employees: Array<any> = [];


  constructor(private empService: EmployeeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    public authService: AuthenticationService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  get formController() {
    return this.editform.controls;
  }

  ngOnInit(): void {
    this.loading = false;
    const id = Number(sessionStorage.getItem('authenticatedUser'));
    this.profileLoading = true;
    this.editform = this.formBuilder.group({
      employeeName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9 ]*'),
      Validators.maxLength(10), Validators.minLength(10)]],
      employeeType: ['', Validators.required],
      managerId: [''],
    });
    this.empService.getEmployeeObject(id).subscribe(
      response => {
        // console.log(response.employeeID)
        // console.log(response)
        this.employee = response
        this.profileLoading = false;
        // console.log(this.editform)
        this.editform.get('employeeId')?.setValue(this.employee.employeeID);
        this.editform.get('email')?.setValue(this.employee.email)
        this.editform.get('employeeType')?.setValue(this.employee.employeeType);
        this.editform.get('phoneNumber')?.setValue(this.employee.phoneNumber)
        this.editform.get('employeeName')?.setValue(this.employee.name)
      }
    );

  }

  onSubmitForm() {
    this.submitted = true;
    console.log('valid')
    // stop here if form is invalid
    if (this.editform.invalid) {
      // console.log(this.form)
      const controls = this.editform.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          console.log(controls[name])
        }
      }
      return;
    }
    this.loading = true;
    this.employee.email = this.formController.email.value;
    this.employee.phoneNumber = this.formController.phoneNumber.value;
    this.employee.employeeType = this.formController.employeeType.value;
    this.employee.name = this.formController.employeeName.value;
    this.empService.editEmployeeObject(this.employee)
      .subscribe(
        response => {
          console.log(response);
          this.ngOnInit();
        },
        error => {
          this.invalidSubmit = true;
          console.log(error);
        }
      )
  }

  changeEmployeeType(type) {
    this.employee.employeeType = type;
    if (type === 'Employee') {
      this.formController.managerId.setValidators([Validators.required, Validators.pattern('[1-9 ]*')]);
      this.formController.employeeType.setValue('Employee');
    }
    else {
      this.formController.managerId.clearValidators();
      this.formController.managerId.setErrors(null);
      this.formController.employeeType.setValue('Manager');
    }

  }

  checkIfEmployee() {
    return this.employee.employeeType == 'Employee';
  }

}
