package com.capstone.EmployeeCert.entity;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class Test {

	@Id
	@GeneratedValue
	private Long testId;

	private String testName;

	private String testDifficulty;

	private String testCategory;

	private Boolean isTestAttempted = false;

	private Integer testScore = 0;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "employee_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Employee emp;

	@ElementCollection
	@Column(name = "markedAnswers")
	private Map<Long, String> markedAnswers = new HashMap<Long, String>();

	public Employee getEmp() {
		return emp;
	}

	public void setEmp(Employee emp) {
		this.emp = emp;
	}

	public String getTestName() {
		return testName;
	}

	public Test() {

	}

	public Test(Long testId, String testName, String testDifficulty, String testCategory) {
		super();
		this.testId = testId;
		this.testName = testName;
		this.testDifficulty = testDifficulty;
		this.testCategory = testCategory;
	}

	public Long getTestId() {
		return testId;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	public String getTestDifficulty() {
		return testDifficulty;
	}

	public void setTestDifficulty(String testDifficulty) {
		this.testDifficulty = testDifficulty;
	}

	public String getTestCategory() {
		return testCategory;
	}

	public void setTestCategory(String testCategory) {
		this.testCategory = testCategory;
	}

	public Boolean getIsTestAttempted() {
		return isTestAttempted;
	}

	public void setIsTestAttempted(Boolean isTestAttempted) {
		this.isTestAttempted = isTestAttempted;
	}

	public Integer getTestScore() {
		return testScore;
	}

	public void setTestScore(Integer testScore) {
		this.testScore = testScore;
	}

//	

	public Map<Long, String> getMarkedAnswers() {
		return markedAnswers;
	}

	public void setMarkedAnswers(HashMap<Long, String> markedAnswers) {
		this.markedAnswers = markedAnswers;
	}

	@Override
	public String toString() {
		return "Test [testId=" + testId + ", testName=" + testName + ", testDifficulty=" + testDifficulty
				+ ", testCategory=" + testCategory + ", isTestAttempted=" + isTestAttempted + ", testScore=" + testScore
				+ "]";
	}
}
