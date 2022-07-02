package com.team12.btl.repository;

import com.team12.btl.entity.Coach;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.*;
import java.util.List;

public interface CoachRepository extends JpaRepository<Coach, Integer>, JpaSpecificationExecutor<Coach> {

    List<Coach> findByActiveIsTrue();


    Coach findByIdAndActiveTrue(Integer id);


    @Modifying
    @Query(value = "UPDATE coach SET is_active = 0 WHERE Id = ?1",nativeQuery = true)
    int deleteCoach(Integer Id);



    @Query(value="SELECT c.* FROM coach c where c.is_active = true AND (CONCAT(c.id, '') LIKE %?1%) AND UPPER(c.plate) like CONCAT('%',UPPER(?2),'%') " +
            "AND UPPER(c.model) LIKE CONCAT('%',UPPER(?3),'%') " +
            "AND UPPER(c.manufacturer) LIKE CONCAT('%',UPPER(?4),'%') " +
            "AND (c.capacity >= ?5) " +
            "AND (c.years_of_use <= ?6 OR ?6 = '') "+
            "AND (CONCAT(c.last_maintenance_day, '') LIKE %?7%)" , nativeQuery = true)
    List<Coach> searchCoach(String id,String plate,String model, String manufacturer, String capacity, String yearsOfUse,String lastMaintenanceDay);
}