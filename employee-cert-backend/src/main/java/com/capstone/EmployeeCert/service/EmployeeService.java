package com.capstone.EmployeeCert.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.EmployeeCert.entity.Employee;
import com.capstone.EmployeeCert.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
	EmployeeRepository empRepo;

	public void setEmpRepo(EmployeeRepository empRepo) {
		this.empRepo = empRepo;
	}
	
	public Employee getEmployeeById(Long id) {
		return empRepo.getEmployeeById(id);
	}
	
	public List<Employee> getAllEmployees(){
		return empRepo.getAllEmployees();
	}
	
	public List<Employee> getAllEmployeesByManagerId(String managerId){
		return empRepo.getAllEmployeesByManagerId(managerId);
	}
	
	public Employee saveEmployee(Employee emp) {
		return empRepo.saveEmployee(emp);
	}
}
