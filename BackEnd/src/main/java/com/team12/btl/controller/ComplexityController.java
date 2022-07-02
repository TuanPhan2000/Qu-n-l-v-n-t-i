package com.team12.btl.controller;

import com.team12.btl.service.service_impl.ComplexityService_Impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/complexity")
public class ComplexityController {

    @Autowired
    ComplexityService_Impl complexityService;

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(complexityService.findAll());
    }

}
