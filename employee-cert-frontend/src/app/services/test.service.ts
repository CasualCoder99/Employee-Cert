import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee.service';
import { Question } from './question.service';

export class Test{
  constructor(public testName: string, 
     public testDifficulty: string, 
     public testCategory: string,
     public emp: any
     )
     {
  }
}

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private http: HttpClient
  ) {}

  fetchAllTestObjects(): Observable<Test[]>{
    return this.http.get<Array<Test>>('http://localhost:8080/api/tests');
  }

  fetchTestById(id: number): Observable<Test[]>{
    return this.http.get<Array<Test>>(`http://localhost:8080/api/tests/${id}`);
  }

  fetchAllTestObjectsForManager(id: number): Observable<Test[]>{
    return this.http.get<Array<Test>>(`http://localhost:8080/api/tests/manager/${id}`);
  }

  fetchAllTestObjectsForEmployee(id: number): Observable<Test[]>{
    return this.http.get<Array<Test>>(`http://localhost:8080/api/tests/employees/${id}`);
  }

  createTestObject(test: Test){
    return this.http.post('http://localhost:8080/api/create-test', test);
  }

  fetchAllQuestionObjectsForTest(id: number): Observable<Question[]>{
    return this.http.get<Array<Question>>(`http://localhost:8080/api/tests/get-questions/${id}`);
  }

  submitTest(testId:number, markedAnswers: Map<Number, String>){
    const convMap = {};
    markedAnswers.forEach((val: String, key: Number) => {
      convMap[String(key)] = val;
    });
    console.log(convMap)
    return this.http.put(`http://localhost:8080/api/tests/attempt/${testId}`, convMap)
  }

  fetchMarkedAnswers(id: number){
    return this.http.get<Map<Number, String>>(`http://localhost:8080/api/tests/answers/${id}`);
  }
  
}
