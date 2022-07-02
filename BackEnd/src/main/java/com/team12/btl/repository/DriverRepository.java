package com.team12.btl.repository;

import com.team12.btl.entity.CoachTurn;
import com.team12.btl.entity.Driver;
import com.team12.btl.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DriverRepository extends JpaRepository<Driver, Integer>, JpaSpecificationExecutor<Driver> {
    List<Driver> findByActiveIsTrue();

    Driver findByIdAndActiveTrue(Integer id);

    Driver findByIdCardAndActiveTrue(String idCard);

    @Modifying
//    @Query(value = "select d.* from driver d " +
//            "WHERE d.is_active = 1 " +
//            "and d.id_card = ?1 " , nativeQuery = true)
//    List<Driver> checkDriver(String idCard);

    @Query(value = "UPDATE driver SET is_active = 0 WHERE Id = ?1", nativeQuery = true)
    int deleteDriver(Integer Id);

    @Query(value = "SELECT d.* FROM driver d, fixed_salary f where d.is_active = true AND d.fixed_salary_id=f.id AND (CONCAT(d.id, '') LIKE %?1%) AND UPPER(d.name) like CONCAT('%',UPPER(?2),'%') " +
            "AND UPPER(d.id_card) LIKE CONCAT('%',UPPER(?3),'%') " +
            "AND UPPER(d.driving_license_code) LIKE CONCAT('%',UPPER(?4),'%') " +
            "AND UPPER(d.type_of_license) LIKE CONCAT('%',UPPER(?5),'%') " +
            "AND UPPER(d.address) LIKE CONCAT('%',UPPER(?6),'%') " +
            "AND (CONCAT(d.birthday, '') LIKE %?7%)" +
            "AND (CONCAT(d.experience, '') LIKE %?8%)" +
            "AND (CONCAT(f.grade, '') LIKE %?9%)"
            , nativeQuery = true)
    List<Driver> searchDriver(String id, String name, String idCard, String drivingLicenseCode, String typeOfLicense, String address, String birthday, String experience, String grade);
}