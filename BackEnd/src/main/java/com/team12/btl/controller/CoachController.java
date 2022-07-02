package com.team12.btl.controller;

import com.team12.btl.entity.Coach;
import com.team12.btl.service.service_impl.CoachService_Impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;
@RestController
@RequestMapping("/api/v1/coach/")
public class CoachController {
    @Autowired
    CoachService_Impl coachService;
    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(coachService.findAll());
    }
        @GetMapping("/findById/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(coachService.findById(id));
    }
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        return ResponseEntity.ok(coachService.delete(id));
    }
    @PostMapping("/create")
    public ResponseEntity<?> createCoach(@Valid @RequestBody Coach coach) {
        return ResponseEntity.ok(coachService.create(coach));
    }
    @PutMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody Coach coach) {
        return ResponseEntity.ok(coachService.update(coach));
    }
    @GetMapping("/searchCoach")
    public ResponseEntity<?> searchCoach(@RequestParam Map<String, String> param) {
        return ResponseEntity.ok(coachService.searchCoach(param));
    }
}
