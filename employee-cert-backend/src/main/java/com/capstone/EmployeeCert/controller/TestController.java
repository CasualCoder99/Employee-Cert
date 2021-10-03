package com.capstone.EmployeeCert.controller;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.capstone.EmployeeCert.entity.Question;
import com.capstone.EmployeeCert.entity.Test;
import com.capstone.EmployeeCert.service.QuestionService;
import com.capstone.EmployeeCert.service.TestService;

@CrossOrigin(origins = "*")
@RestController
public class TestController {

	@Autowired
	TestService testService;
	
	@Autowired
	QuestionService quesService;
	
	@GetMapping("api/tests")
	public @ResponseBody ResponseEntity<List<Test>> allTests(){
		//service to return all the tests created by the admin
		try {
			return new ResponseEntity<List<Test>>(testService.getAllTests(), HttpStatus.OK);
		}
		catch (Exception nullException) {
	         throw new ResponseStatusException(
	           HttpStatus.NOT_FOUND, "No Tests Found", nullException);
	    }
	}
	
	@GetMapping("api/tests/get-questions/{testId}")
	public @ResponseBody ResponseEntity<List<Question>> getQuestions(@PathVariable(name = "testId")Long testId){
		//service to return all the tests created by the admin
		 {
//			System.out.println(testId);
			return new ResponseEntity<List<Question>>(testService.getQuestions(testId), HttpStatus.OK);
		}
	}
	
	@GetMapping("api/tests/{testId}")
	public Test getTestById(@PathVariable(name = "testId") Long testId) {
		// service to get the required test by the employee
		try {
			return testService.getTestById(testId);
		}
		catch (Exception nullException) {
	         throw new ResponseStatusException(
	           HttpStatus.NOT_FOUND, "Test Not Found", nullException);
	    }
	}
	
//	@SuppressWarnings("unchecked")
	@GetMapping("api/tests/employees/{employeeId}")
	public @ResponseBody  ResponseEntity<List<Test>> getTestByEmployeeId(@PathVariable(name = "employeeId") Long employeeId) {
		// service to get the required test by the employee
		try {
			List<Test> entities = testService.getTestByEmployeeId(employeeId);
			return new ResponseEntity<List<Test>>(entities, HttpStatus.OK);
		}
		catch (Exception nullException) {
			nullException.printStackTrace();
	         throw new ResponseStatusException(
	           HttpStatus.NOT_FOUND, "Tests Not Found", nullException);
	    }
	}
	
	@GetMapping("api/tests/manager/{managerId}")
	public @ResponseBody  ResponseEntity<List<Test>> getTestForManager(@PathVariable(name = "managerId") Long managerId) {
		// service to get the required test by the manager's reports
		try {
			List<Test> entities = testService.getTestsForManager(managerId);
			return new ResponseEntity<List<Test>>(entities, HttpStatus.OK);
		}
		catch (Exception nullException) {
			nullException.printStackTrace();
	         throw new ResponseStatusException(
	           HttpStatus.NOT_FOUND, "No Tests Found for Employees Reporting under the manager", nullException);
	    }
	}
	
	@PostMapping("api/create-test")
	public ResponseEntity<Test> saveTest(@RequestBody Test test) {
//		System.out.println(test);
		return ResponseEntity.ok().body(testService.saveTest(test));
	}
	
	@PutMapping("api/tests/attempt/{testId}")
	public void submitTest(@PathVariable(name = "testId") Long testId, 
			@RequestBody HashMap<Long, String> answeredQuestions) {
		
		System.out.println("ASNWERED QUESTIONS ===> "+answeredQuestions);
		
		Test testGiven = testService.getTestById(testId);
		testGiven.setIsTestAttempted(true); // mark test is now given
		
		Iterator<Map.Entry<Long, String>> itr = answeredQuestions.entrySet().iterator();
		
		while(itr.hasNext()) {
			
			Map.Entry<Long, String> quesEntry = itr.next();
			Question ques = quesService.getQuestionById(quesEntry.getKey()); // get question from id service
			
//			System.out.println(ques.getPossibleAnswers());
//			
//			System.out.println(ques.getCorrectAnswer());
			
			int index = (int)ques.getCorrectAnswer() - 65;
			
			testGiven.setTestScore(0);
			
			if(index  == ques.getPossibleAnswers().indexOf(quesEntry.getValue())) { // check if the answer is correct
				Integer testScore = testGiven.getTestScore() + 1;
				testGiven.setTestScore(testScore);
			}
		}
		testGiven.setMarkedAnswers(answeredQuestions);
		
		testService.saveTest(testGiven);
	}
	
	@GetMapping("api/tests/answers/{testId}")
	public Map<Long, String> getMarkedAnswersById(@PathVariable(name = "testId") Long testId) {
		// service to get the required test by the employee
		{
			Test givenTest = testService.getTestById(testId);
			if(givenTest != null) {
				return givenTest.getMarkedAnswers();
			}
			else
				throw new ResponseStatusException(
				           HttpStatus.NOT_FOUND, "Test Not Found");
		}
	}
}
