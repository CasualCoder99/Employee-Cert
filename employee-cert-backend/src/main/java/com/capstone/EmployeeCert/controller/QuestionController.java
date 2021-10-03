package com.capstone.EmployeeCert.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.capstone.EmployeeCert.entity.Question;
import com.capstone.EmployeeCert.service.QuestionService;

@CrossOrigin(origins = "*")
@RestController
public class QuestionController {

	@Autowired
	QuestionService quesService;
	
	@GetMapping("/api/questions")
	public List<Question> getAllQuestions(){
		try {
			return quesService.getAllQuestions();
		}
		catch (Exception nullException) {
	         throw new ResponseStatusException(
	           HttpStatus.NOT_FOUND, "Questions Not Found", nullException);
	    }
	}
	
	@GetMapping("/api/questions/{quesId}")
	public Question getQuestionById(@PathVariable(name = "quesId")Long quesId){
		 
		{
			Question ques = quesService.getQuestionById(quesId);
			if(ques == null )
				throw new ResponseStatusException(
				           HttpStatus.NOT_FOUND, "Questions Not Found");
			else
				return ques;
		}
	}
	
	@PostMapping("/api/questions")
	public void createQuestion(@RequestBody Question ques) {
		// service to save the question passed
		System.out.println(ques.toString());
		quesService.saveQuestion(ques);
	}
}
