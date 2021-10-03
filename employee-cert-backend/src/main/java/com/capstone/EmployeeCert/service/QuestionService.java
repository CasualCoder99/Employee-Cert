package com.capstone.EmployeeCert.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.EmployeeCert.entity.Question;
import com.capstone.EmployeeCert.repository.QuestionRepository;

@Service
public class QuestionService {

	@Autowired
	private QuestionRepository quesRepo;
	
	public List<Question> getAllQuestions(){
		return quesRepo.getAllQuestions();
	}
	
	public Question getQuestionById(Long quesId) {
		return quesRepo.getQuestionById(quesId);
	}
	
	public Question saveQuestion(Question ques) {
		System.out.println("Question Object in Service ====>" + ques);
		return quesRepo.saveQuestion(ques);
	}
}
