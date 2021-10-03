package com.capstone.EmployeeCert.controller;

import java.net.URI;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.capstone.EmployeeCert.entity.Employee;
import com.capstone.EmployeeCert.service.EmployeeService;

@CrossOrigin(origins = "*")
@RestController
public class EmployeeController {
	
	@Autowired
	EmployeeService empService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@GetMapping("/api/employees")
	public List<Employee> getAllEmployees(){
		return empService.getAllEmployees();
	}
	
	@GetMapping("/api/employees/{id}")
	public Employee getEmployeeById(@PathVariable(name="id") Long id) {
		Employee emp = empService.getEmployeeById(id);
		if(emp != null)
			return emp;
		else
			throw new ResponseStatusException(
			           HttpStatus.NOT_FOUND, "Employee Not Found");
	}
	
	@GetMapping("/api/employees/manager/{managerId}")
	public List<Employee> getEmployeesByManagerId(@PathVariable(name="managerId")
			String managerId){
		return empService.getAllEmployeesByManagerId(managerId);
	}
	
	@GetMapping("/api/employees/check/valid/{employeeId}&{password}")
	public Boolean checkEmployeeCredentials(@PathVariable(name="employeeId")Number employeeId, 
			@PathVariable(name = "password")String password) {
		try {
			 Employee emp = empService.getEmployeeById(employeeId.longValue());
			 System.out.println(employeeId + " " + password + " " + emp.getPassword());
//			 System.out.println(emp);
			 String encodedPassword = emp.getPassword();
			 if(passwordEncoder.matches(password, encodedPassword))
				 return true;
			 return false;
		}
		catch (Exception nullException) {
//	         throw new ResponseStatusException(
//	           HttpStatus.NOT_FOUND, "Test Not Found", nullException);
			return false;
	    }
	}
	
	@GetMapping("/api/employees/check/{employeeId}")
	public Boolean checkEmployeeId(@PathVariable(name="employeeId")Long employeeId) {
			 Employee emp = empService.getEmployeeById((Long)employeeId);
			 System.out.println(emp);
			 if(emp == null)
				 return false;
			 return true;
	}
	
	@PutMapping("/api/employees/reset-password/")
	public void resetPassword(@RequestBody LinkedHashMap<String, Object> creds) {
		Number employeeId = (Number) creds.get("employeeId");
		String password = (String) creds.get("password");
		try {
			Employee emp = empService.getEmployeeById(employeeId.longValue());
			String encodedPassword = passwordEncoder.encode(password);
			emp.setPassword(encodedPassword);
			emp.setHasResetPassword(true);
			empService.saveEmployee(emp);
		}
		catch (Exception nullException) {
	         throw new ResponseStatusException(
	           HttpStatus.NOT_FOUND, "Employee Not Found", nullException);
	    }
		
	}
	
	@PutMapping("/api/employees/edit-profile/")
	public void editProfile(@RequestBody Employee emp) {
		System.out.println(emp);
		empService.saveEmployee(emp);
	}
	
	@PostMapping("/api/employees")
	public ResponseEntity<Void> saveEmployee(@RequestBody Employee emp) {
		System.out.println(emp);
		Employee createdEmployee = empService.saveEmployee(emp);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(createdEmployee.getEmployeeID()).toUri();
		
		return ResponseEntity.created(uri).build(); 
	}
}
