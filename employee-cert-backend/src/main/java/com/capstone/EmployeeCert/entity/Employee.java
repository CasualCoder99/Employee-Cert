package com.capstone.EmployeeCert.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Employee {

	@Id
	@GeneratedValue
	private Long employeeId;
	
	private String name;
	
	@Column(unique = true)
	private String email;
	
	private String password;
	
	private Long phoneNumber;
	
	private String employeeType; // employee or manager?
	
	private String managerId;
	
	private boolean hasResetPassword = false; // has employee reset the auto generated password?
	
//	@OneToMany(mappedBy = "emp") 
//	private List<Test> testsGiven;
	
	protected Employee(){
		
	}
	
	
	public Employee(Long employeeID, String name, String email, String password, Long phoneNumber) {
		this.employeeId = employeeID;
		this.name = name;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
	}
	
	public Employee(Long employeID, String name, String email, 
			String password, Long phoneNumber, String employeeType) {
		
		this(employeID, name, email, password, phoneNumber);
		this.employeeType = employeeType;
		
	}
	
	public Employee(Long employeID, String name, String email, 
			String password, Long phoneNumber, 
				String employeeType, String managerId) {
		this(employeID, name, email, password, phoneNumber, employeeType);
		this.managerId = managerId;
		
	}

	public Long getEmployeeID() {
		return employeeId;
	}

	public void setEmployeeID(Long employeeID) {
		this.employeeId = employeeID;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getManagerId() {
		return managerId;
	}

	public void setManagerId(String managerId) {
		this.managerId = managerId;
	}

	public Long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(Long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmployeeType() {
		return employeeType;
	}

	public void setEmployeeType(String employeeType) {
		this.employeeType = employeeType;
	}
	
//	public void addTest(Test test) {
//		this.testsGiven.add(test);
//	}
//
//	public List<Test> getTestsGiven() {
//		return testsGiven;
//	}

	public boolean isHasResetPassword() {
		return hasResetPassword;
	}


	public void setHasResetPassword(boolean hasResetPassword) {
		this.hasResetPassword = hasResetPassword;
	}


	@Override
	public String toString() {
		return "Employee [employeeID=" + employeeId + ", name=" + name + ", email=" + email + ", phoneNumber="
				+ phoneNumber + ", employeeType=" + employeeType + "]";
	}
	
	
}
