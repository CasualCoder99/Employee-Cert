package com.capstone.EmployeeCert.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.capstone.EmployeeCert.entity.Question;

@Repository
@Transactional
public class QuestionRepository {
	
	@Autowired
	EntityManager em;
	
	public Question getQuestionById(Long questionId) {
		Question ques = em.find(Question.class, questionId);
		return ques;
	}
	
	// GET all the questions
	@SuppressWarnings("unchecked")
	public List<Question> getAllQuestions(){
		Query query = em.createQuery("SELECT ques FROM Question ques", Question.class);
		return query.getResultList();
	}
	
	// GET questions with difficulty filter
	@SuppressWarnings("unchecked")
	public List<Question> getAllQuestionsByDifficulty(String difficultyLevel){
		Query query = em.createQuery("SELECT ques FROM Question ques WHERE ques.difficultyLevel = :diffcultyLevel", Question.class);
		return query.setParameter("difficultyLevel", difficultyLevel).getResultList();
	}
	
	//GET questions with category filter
	@SuppressWarnings("unchecked")
	public List<Question> getAllQuestionsByTestCategory(String testCategory){
		Query query = em.createQuery("SELECT ques FROM Question ques WHERE ques.testCategory = :testCategory", Question.class);
		return query.setParameter("testCategory", testCategory).getResultList();
	}
	
	public Question saveQuestion(Question ques) {
		System.out.println("Question Object in Repository ====> " + ques);
		if(ques.getQuestionId() == null) {
			em.persist(ques);
		}
		else {
			em.merge(ques);
		}
		return ques;
	}
}