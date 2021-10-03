package com.capstone.EmployeeCert.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.capstone.EmployeeCert.entity.Employee;
import com.capstone.EmployeeCert.entity.Question;
import com.capstone.EmployeeCert.entity.Test;

@Repository
@Transactional
public class TestRepository {

	@Autowired
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<Test> getAllTests() {
		Query query = em.createQuery("SELECT t FROM Test t", Test.class);

		return query.getResultList();
	}

	public Test getTestById(Long testId) {
		Test test = em.find(Test.class, testId);
		return test;
	}

	@SuppressWarnings("unchecked")
	public List<Test> getTestByEmployeeId(Long id) {
		Query query = em.createQuery("SELECT t FROM Test t WHERE t.emp.employeeId = :employeeId", Test.class);
		query.setParameter("employeeId", id);
//		Query query = em.createNativeQuery(
//				"select test0_.test_id as test_id1_3_0_, test0_.employee_id as employee7_3_0_, test0_.is_test_attempted as is_test_2_3_0_, "
//				+ "test0_.test_category as test_cat3_3_0_, test0_.test_difficulty as test_dif4_3_0_, test0_.test_name as test_nam5_3_0_, "
//				+ "test0_.test_score as test_sco6_3_0_ from test test0_ where test0_.emp.employee_id=?");
//		List<Test> dtoList = entityManager.createNativeQuery(sql)
//		        .setParameter("userId", userId)
//		        .unwrap(org.hibernate.Query.class).setResultTransformer(Transformers.aliasToBean(JobDTO.class)).list();
//		query.setParameter(1, id);
		List<Test> items = (List<Test>) query.getResultList();
		return items;
	}
	
	@SuppressWarnings("unchecked")
	public List<Test> getAllTestsForManager(Long managerId) {
		Query query = em.createQuery("SELECT emp FROM Employee emp WHERE emp.managerId = :managerId", Employee.class);
		List<Employee> employeesList = query.setParameter("managerId", managerId.toString()).getResultList();
		System.out.println(employeesList);
		List<Test> allTests = new ArrayList<Test>();
		for(Employee emp: employeesList) {
			List<Test> testsForEmployee = getTestByEmployeeId(emp.getEmployeeID());
			allTests.addAll(testsForEmployee);
		}
		System.out.println(allTests);
		return allTests;
	}

	public Test saveTest(Test test) {
		System.out.println(test);
		if(test.getTestId() == null) {
			em.persist(test);
		}
		else {
			em.merge(test);
		}
		return test;
	}
	
	public List<Question> randomList(List<Question> givenList) {
//	    List<Integer> givenList = Lists.newArrayList(1, 2, 3, 4, 5, 6);
	    Collections.shuffle(givenList);

	    int randomSeriesLength = 14;

	    List<Question> randomSeries = givenList.subList(0, randomSeriesLength);
	    
	    return randomSeries;
	    
	}

	// GET random 15 questions
	@SuppressWarnings("unchecked")
	public List<Question> getQuestions(Long testId) {
		Test test = em.find(Test.class, testId); // required test object
		
		System.out.println(test);
		Query query1 = em.createQuery("SELECT ques FROM Question ques WHERE ques.difficultyLevel = :difficultyLevel", Question.class);
//		query1.setParameter("testCategory", test.getTestCategory());
		query1.setParameter("difficultyLevel", test.getTestDifficulty());
		List<Question> quesList = query1.getResultList();
		for(Question ques: quesList) {
			ques.setCorrectAnswer(null);
		}

//		int[] index = new Random().ints(15, 0, quesList.size()).toArray();
//
//		Query query = em.createQuery("SELECT ques FROM Question ques WHERE ques.difficultyLevel = :difficultyLevel AND "
//				+ "" + " INDEX(ques) IN :indexes", Question.class);
//		query.setParameter("indexes", index);
//		query.setParameter("testCategory", test.getTestCategory());
//		query.setParameter("difficultyLevel", test.getTestDifficulty());
//		
//		List<Question> randomQuestions = query.getResultList(); // random 15 questions based on category and difficulty
		return randomList(quesList);
	}
}