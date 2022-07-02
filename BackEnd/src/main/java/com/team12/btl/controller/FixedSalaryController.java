package com.team12.btl.controller;

import com.team12.btl.service.service_impl.FixedSalaryService_Impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/fixedSalary")
public class FixedSalaryController {
    @Autowired
    FixedSalaryService_Impl fixedSalaryService;

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() throws Exception {
        return ResponseEntity.ok(fixedSalaryService.findAll());
    }

}
