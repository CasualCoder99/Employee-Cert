package com.capstone.EmployeeCert.entity;

import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;


@Entity
public class Question {
	
	// question statement, possible answers, correct answer, difficulty level
	
	@Id
	@GeneratedValue
	private Long questionId;
	
	private String questionStatement;
	
	@ElementCollection
    @CollectionTable(name = "possible_answers", joinColumns=@JoinColumn(name="questionId"))
    @Column(name = "options")
	private List<String> possibleAnswers;
	
	private Character correctAnswer;
	
	private String difficultyLevel;
	
	private String testCategory;
	
	protected Question() {
		
	}

	public Question(Long questionId, String questionStatement, 
			List<String> possibleAnswers, Character correctAnswer,
			String difficultyLevel, String testCategory) {
		super();
		this.questionId = questionId;
		this.questionStatement = questionStatement;
		this.possibleAnswers = possibleAnswers;
		this.correctAnswer = correctAnswer;
		this.difficultyLevel = difficultyLevel;
		this.testCategory = testCategory;
	}

	public Long getQuestionId() {
		return questionId;
	}


	public String getQuestionStatement() {
		return questionStatement;
	}

	public void setQuestionStatement(String questionStatement) {
		this.questionStatement = questionStatement;
	}

	public List<String> getPossibleAnswers() {
		return possibleAnswers;
	}

	public void setPossibleAnswers(List<String> possibleAnswers) {
		this.possibleAnswers = possibleAnswers;
	}

	public Character getCorrectAnswer() {
		return correctAnswer;
	}

	public void setCorrectAnswer(Character correctAnswer) {
		this.correctAnswer = correctAnswer;
	}

	public String getDifficultyLevel() {
		return difficultyLevel;
	}

	public void setDifficultyLevel(String difficultyLevel) {
		this.difficultyLevel = difficultyLevel;
	}

	public String getTestCategory() {
		return testCategory;
	}

	public void setTestCategory(String testCategory) {
		this.testCategory = testCategory;
	}

	@Override
	public String toString() {
		return "Question [questionId=" + questionId + ", questionStatement=" + questionStatement + ", possibleAnswers="
				+ possibleAnswers + ", correctAnswer=" + correctAnswer + ", difficultyLevel=" + difficultyLevel
				+ ", testCategory=" + testCategory + "]";
	}
	
	
	
}
