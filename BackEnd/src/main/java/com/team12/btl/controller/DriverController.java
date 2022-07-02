package com.team12.btl.controller;

import com.team12.btl.dto.Status;
import com.team12.btl.entity.Driver;
import com.team12.btl.entity.Route;
import com.team12.btl.service.service_impl.DriverService_Impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/v1/driver")
public class DriverController {

    @Autowired
    DriverService_Impl driverService;

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() throws Exception {
        return ResponseEntity.ok(driverService.findAll());
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(driverService.findById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createDriver(@Valid @RequestBody Driver driver) {
        try {
            return ResponseEntity.ok(driverService.create(driver));
        } catch (Exception e) {
            return new ResponseEntity<Status>(new Status(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        return ResponseEntity.ok(driverService.delete(id));
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody Driver driver) {
        return ResponseEntity.ok(driverService.update(driver));
    }

    @GetMapping("/searchDriver")
    public ResponseEntity<?> searchDriver(@RequestParam Map<String, String> param) {
        return ResponseEntity.ok(driverService.searchDriver(param));
    }

}
