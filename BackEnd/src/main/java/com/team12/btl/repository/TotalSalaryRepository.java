package com.team12.btl.repository;

import com.team12.btl.entity.TotalSalary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface TotalSalaryRepository extends JpaRepository<TotalSalary, Integer>, JpaSpecificationExecutor<TotalSalary> {

    List<TotalSalary> findTotalSalaryByMonthAndYear(Integer month, Integer year);
    Integer countTotalSalaryByMonthAndYear(Integer month, Integer year);
    @Modifying
    @Query(value = "DELETE FROM total_salary WHERE (month=?1 and year=?2);",nativeQuery = true)
    int deleteCurrentMonth(Integer month, Integer year);

//    @Query(value = "call ltw.currentMonthSalary(?1, ?2);", nativeQuery = true)

    @Query(value = "call currentMonthSalary(?1, ?2);", nativeQuery = true)
    List<Map> getCurrentMonthSalary(Integer month, Integer year);

}