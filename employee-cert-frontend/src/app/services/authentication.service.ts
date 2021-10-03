import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private empService: EmployeeService,
    private router: Router) { }

  async authenticate(username: string, password){
    console.log(Number(username))
    if(Number(username) !== NaN){
       (await this.empService.checkEmployeeValid(Number(username), password))
         .subscribe(
          data => {
            // console.log(data)
            if(data === true){
              sessionStorage.setItem('authenticatedUser', username.toString());
              this.router.navigate(['home']);
              return true;
          }
            else
              return false;
        },
        error => {
          console.log(error);
          return false;
        }
        )
    }
    else
      console.log(NaN)
  }

  getEmployeeName(){
    let user = sessionStorage.getItem('name');
    if(user !== null)
      return user.valueOf();
    return "";
  }

  getPersona(){
    let persona = sessionStorage.getItem('persona');
    if(persona !== null)
      return persona.valueOf();
    return "";
  }
  

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return user !== null
  }

  logout(){
    let user = sessionStorage.getItem('authenticatedUser');
    if(user !== null){
      sessionStorage.removeItem('authenticatedUser');
      sessionStorage.removeItem('persona');
    }
  }

  isSystemAdmin(){
    let persona = sessionStorage.getItem('persona');
    if(persona !== null)
      return persona === 'System Admin';
    return false;
  }

  isManager(){
    let persona = sessionStorage.getItem('persona');
    if(persona !== null)
      return persona === 'Manager';
    return false;
  }

  isEmployee(){
    let persona = sessionStorage.getItem('persona');
    if(persona !== null)
      return persona === 'Employee';
    return false;
  }

  }

