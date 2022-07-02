package com.team12.btl.repository;

import com.team12.btl.entity.FixedSalary;
import com.team12.btl.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface FixedSalaryRepository extends JpaRepository<FixedSalary, Integer>, JpaSpecificationExecutor<FixedSalary> {
    List<FixedSalary> findAll();
}