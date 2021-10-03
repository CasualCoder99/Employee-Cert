package com.capstone.EmployeeCert.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.capstone.EmployeeCert.entity.Employee;

@Repository
@Transactional
public class EmployeeRepository {
	
	@Autowired
	EntityManager em;
	
	public Employee getEmployeeById(Long employeeId) {
		Employee emp = em.find(Employee.class, employeeId);
		return emp;
	}
	
	@SuppressWarnings("unchecked")
	public List<Employee> getAllEmployees(){
		Query query = em.createQuery("SELECT emp FROM Employee emp", Employee.class);
		return query.getResultList();
	}
	
	@SuppressWarnings("unchecked")
	public List<Employee> getAllEmployeesByManagerId(String managerId){
		Query query = em.createQuery("SELECT emp FROM Employee emp WHERE emp.managerId = :managerId", Employee.class);
		return query.setParameter("managerId", managerId).getResultList();
	}
	
	public Employee saveEmployee(Employee emp) {
//		System.out.println("EMPLOYEE  Object ======>   " + emp);
		if(emp.getEmployeeID() == null) {
			em.persist(emp);
		}
		else {
			em.merge(emp);
		}
		return emp;
	}
}
