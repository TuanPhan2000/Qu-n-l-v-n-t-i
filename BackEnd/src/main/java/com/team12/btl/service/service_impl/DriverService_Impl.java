package com.team12.btl.service.service_impl;

import com.team12.btl.entity.Driver;
import com.team12.btl.entity.Route;
import com.team12.btl.repository.DriverRepository;
import com.team12.btl.service.GeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
public class DriverService_Impl implements GeneralService<Driver> {

    @Autowired
    DriverRepository driverRepository;

    @Override
    public List<Driver> findAll() {
        return driverRepository.findByActiveIsTrue();
    }

    @Override
    public Driver findById(Integer id) {
        return driverRepository.findByIdAndActiveTrue(id);
    }

    public Driver findByIdCardAndActiveTrue(String idCard) {
        return driverRepository.findByIdCardAndActiveTrue(idCard);
    }

    @Override
    public Driver create(Driver driver) throws Exception {
        Driver d = driverRepository.findByIdCardAndActiveTrue(driver.getIdCard().trim());
        if(d == null){
            driver.setActive(true);
            return driverRepository.save(driver);
        }
        else{
            throw new Exception("Đã tồn tại");
        }
    }

    @Override
    public Driver update(Driver driver) {
        driver.setActive(true);
        return driverRepository.save(driver);
    }


    @Override
    public int delete(Integer id) {
        return driverRepository.deleteDriver(id);
    }

    public List<Driver> searchDriver(Map<String, String> map){

        return driverRepository.searchDriver
                (map.get("id") != null ? map.get("id"):"",
                        map.get("name") != null ? map.get("name"):"",
                        map.get("idCard") != null ? map.get("idCard"):"",
                        map.get("drivingLicenseCode") != null ? map.get("drivingLicenseCode"):"",
                        map.get("typeOfLicense") != null ? map.get("typeOfLicense"):"",
                        map.get("address") != null ? map.get("address"):"",
                        map.get("birthday") != null ? map.get("birthday"):"",
                        map.get("experience") != null ? map.get("experience"):"",
                        map.get("grade") != null ? map.get("grade"):"");
    }


}
