import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Employee, EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  form!: FormGroup;
  editform!: FormGroup;

  employee!: Employee;
  editEmployee: any;

  loading = false;
  editLoading = false;

  @ViewChild('closebutton') closebutton: any;

  submitted = false;
  editSubmitted = false;
  invalidSubmit = false;

  loadingEmployees = false;
  employees: Array<any> = [];


  constructor(private empService: EmployeeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    public authService: AuthenticationService,
  ) {
    this.employee = new Employee('', '', 'Select Employee Type', '', '', '');
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    if(this.authService.isEmployee()){
      this.router.navigate(['/profile'])
    }
    this.employee.password = this.generatePassword(8);
    this.form = this.formBuilder.group({
      employeeName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9 ]*'),
      Validators.maxLength(10), Validators.minLength(10)]],
      employeeType: ['', Validators.required],
      managerId: [''],
    });

    this.editform = this.formBuilder.group({
      employeeName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9 ]*'),
      Validators.maxLength(10), Validators.minLength(10)]],
      employeeType: ['', Validators.required],
      managerId: [''],
    });
    this.fetchEmployees();
  }

  fetchEmployees() {
    if (this.authService.isSystemAdmin()) {
      this.loadingEmployees = true;
      this.empService.getAllEmployeesObjects()
        .subscribe(
          response => {
            response.forEach((emp) => {
              // console.log(emp)
              if (emp.employeeId !== null)
                this.employees.push(emp)
            })
            this.loadingEmployees = false;
          }
        )
    }
    else if (this.authService.isManager()) {
      this.loadingEmployees = true;
      this.empService.getAllEmployeesObjectsByManager(
        (sessionStorage.getItem('authenticatedUser') || '0'))
        .subscribe(
          response => {
            response.forEach((emp) => {
              // console.log(emp)
              if (emp.employeeId !== null)
                this.employees.push(emp)
            })
            this.loadingEmployees = false;
            // console.log(this.employees)
          }
        )
    }
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  get formController() {
    return this.form.controls;
  }

  get editformController() {
    return this.editform.controls;
  }

  onSubmitEditForm() {

    this.editSubmitted = true;
    // stop here if form is invalid
    if (this.editform.invalid) {
      // console.log(this.form)
      console.log("invalid")
      return;
    }

    this.editLoading = true;
    // this.editEmployee.employeeID = this.editformController.employeeId.value;
    this.editEmployee.name = this.editformController.employeeName.value;
    this.editEmployee.email = this.editformController.email.value;
    this.editEmployee.phoneNumber = this.editformController.phoneNumber.value;
    this.editEmployee.employeeType = this.editformController.employeeType.value;
    this.editEmployee.managerId = this.editformController.managerId.value;
    console.log(this.editEmployee)
    this.empService.editEmployeeObject(this.editEmployee)
      .subscribe(
        data => {
          this.editLoading = false;
          // this.router.navigateByUrl('create-employee');
          // this.ngOnInit();
          this.employees = []
          this.fetchEmployees()
        },
        error => {
          console.log(error);
          this.editLoading = false;
          this.invalidSubmit = true;
        }
      )
  }

  onSubmitForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      // console.log(this.form)
      const controls = this.form.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          console.log(controls[name].errors, name)
        }
      }
      return;
    }
    console.log('valid')
    this.loading = true;
    this.employee.email = this.formController.email.value;
    this.employee.phoneNumber = this.formController.phoneNumber.value;
    this.employee.employeeType = this.formController.employeeType.value;
    this.employee.name = this.formController.employeeName.value;
    this.empService.createEmployeeObject(this.employee)
      .subscribe(
        response => {
          this.loading = false;
          this.router.navigate(['/create-employee']);
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

  changeEditEmployeeType(type) {
    console.log(this.editEmployee.employeeType)
    if (type === 'Employee') {
      this.editformController.managerId.setValidators([Validators.required, Validators.pattern('[1-9 ]*')]);
      this.editformController.employeeType.setValue('Employee');
    }
    else {
      this.editformController.managerId.clearValidators();
      this.editformController.managerId.setErrors(null);
      this.editformController.employeeType.setValue('Manager');
    }

  }

  checkIfEmployee() {
    return this.employee.employeeType == 'Employee';
  }

  checkIfEditEmployee() {
    return this.editEmployee.employeeType == 'Employee';
  }

  fetchEmployeeObject(id: string) {
    this.editLoading = true;
    this.empService.getEmployeeObject(Number(id)).subscribe(
      response => {
        console.log(response);
        this.editEmployee = response;
        this.editform.get('employeeId')?.setValue(this.editEmployee.employeeID);
        this.editform.get('email')?.setValue(this.editEmployee.email)
        this.editform.get('employeeType')?.setValue(this.editEmployee.employeeType);
        this.editform.get('phoneNumber')?.setValue(this.editEmployee.phoneNumber)
        this.editform.get('employeeName')?.setValue(this.editEmployee.name)
        this.editform.get('managerId')?.setValue(this.editEmployee.managerId)
        this.editLoading = false;
      },
      error => {
        console.log(error);
        this.editLoading = false;
      }
    )
  }

  generatePassword(length) {
    let result = '';
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let lettersLength = letters.length;
    let nums = '0123456789';
    let numsLength = nums.length;
    let specialCharacters = '@!#$%^&*';
    let specialCharactersLength = specialCharacters.length;
    for (let i = 0; i < 4; i++) {
      result += letters.charAt(Math.floor(Math.random() *
        lettersLength));
    }
    for (let i = 0; i < 3; i++) {
      result += nums.charAt(Math.floor(Math.random() *
        numsLength));
    }
    for (let i = 0; i < 1; i++) {
      result += specialCharacters.charAt(Math.floor(Math.random() *
        specialCharactersLength));
    }
    return result;
  }

}
