package com.team12.btl.repository;

import com.team12.btl.entity.Complexity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ComplexityRepository extends JpaRepository<Complexity, Integer>, JpaSpecificationExecutor<Complexity> {

}