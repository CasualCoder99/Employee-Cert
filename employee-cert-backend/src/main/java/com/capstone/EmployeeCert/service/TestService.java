package com.capstone.EmployeeCert.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.EmployeeCert.entity.Question;
import com.capstone.EmployeeCert.entity.Test;
import com.capstone.EmployeeCert.repository.TestRepository;

@Service
public class TestService {

	@Autowired
	TestRepository testRepository;
	
	public List<Test> getAllTests(){
		return testRepository.getAllTests();
	}
	
	public Test getTestById(Long testId) {
		return testRepository.getTestById(testId);
	}
	
	public List<Test> getTestByEmployeeId(Long employeeId) {
		return testRepository.getTestByEmployeeId(employeeId);
	}
	
	public Test saveTest(Test test) {
		return testRepository.saveTest(test);
	}
	
	public List<Question> getQuestions(Long testId) {
		return testRepository.getQuestions(testId);
	}
	
	public List<Test> getTestsForManager(Long managerId){
		return testRepository.getAllTestsForManager(managerId);
	}
}
