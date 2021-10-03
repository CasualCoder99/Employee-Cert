import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Question{
  constructor(public questionStatement: string, public possibleAnswers: Array<string>,
     public correctAnswer: string, 
    public difficultyLevel: string, public testCategory: string){
  }
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient
  ) {}

  createQuestionObject(ques: Question){
    return this.http.post('http://localhost:8080/api/questions', ques);
  }

  fetchAllQuestionObjects(){
    return this.http.get<Array<Question>>('http://localhost:8080/api/questions');
  }

  fetchQuestionObject(id: Number){
    return this.http.get<Array<Question>>(`http://localhost:8080/api/questions/${id}`);
  }
}
