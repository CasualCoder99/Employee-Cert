import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Employee, EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = ""

  loading = false;


  employees: Array<Employee> = []

  constructor(public authenticationService: AuthenticationService,
    private empService: EmployeeService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('name') || '';
  }

  

  handleErrorResponse(error)
    {
      console.log("Error Occured!")
      console.log(error)
    }
  

}
