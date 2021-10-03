import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Employee{
  constructor(public email: string, public password: string,
    public employeeType: string, 
    public managerId: string, public name: string, public phoneNumber: string){

  }
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  getAllEmployeesObjects(){
    return this.http.get<Array<any>>('http://localhost:8080/api/employees');
  }

  getAllEmployeesObjectsByManager(id: string){
    return this.http.get<Array<any>>(`http://localhost:8080/api/employees/manager/${id}`);
  }

  getEmployeeObject(id: number){
    return this.http.get<any>(`http://localhost:8080/api/employees/${id}`);
  }

  createEmployeeObject(emp: Employee){
    return this.http.post('http://localhost:8080/api/employees', emp);
  }

   checkEmployeeValid(employeeId: Number, password: string){
    return  this.http.get<Boolean>('http://localhost:8080/api/employees/check/valid/'+ encodeURIComponent(String(employeeId)) + "&" + encodeURIComponent(password));
  }

  checkEmployeeIdValid(employeeId: Number){
    return  this.http.get<Boolean>('http://localhost:8080/api/employees/check/'+ employeeId);
  }

  resetPassword(employeeId: Number, password:string)
  {
    return  this.http.put('http://localhost:8080/api/employees/reset-password/', {"employeeId":employeeId, "password":password});
  }

  editEmployeeObject(emp:Employee){
    return  this.http.put('http://localhost:8080/api/employees/edit-profile/', emp);
  }
}
