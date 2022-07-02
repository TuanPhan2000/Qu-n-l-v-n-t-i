package com.team12.btl.controller;

import com.team12.btl.dto.Status;
import com.team12.btl.entity.TotalSalary;
import com.team12.btl.service.service_impl.TotalSalaryService_Imp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/v1/totalSalary")
public class TotalSalaryController {
    @Autowired
    TotalSalaryService_Imp totalSalaryService;

    @GetMapping("/search/{month}/{year}")
    public ResponseEntity<?> findTotalSalaryByMonthAndYear(@PathVariable Integer month, @PathVariable Integer year){
//        String[] s = date.split("/");
        return ResponseEntity.ok(totalSalaryService.findTotalSalaryByMonthAndYear(month, year));
    }

    @GetMapping("/currentMonthSalary")
    @ResponseBody
    public ResponseEntity<?> getCurrentMonthSalary(){
        return ResponseEntity.ok(totalSalaryService.getCurrentMonthSalary());

    }
    @PostMapping("/saveToDB")
    public ResponseEntity<?> createMonthTotalSalary(@RequestBody List<Map> totalSalaryList) {
        try {

            return ResponseEntity.ok(totalSalaryService.saveToDB(totalSalaryList));
        } catch (Exception e) {
            System.out.println("\u001B[31m" + e.getMessage() + "\u001B[0m");
            return new ResponseEntity<Status>(new Status(e.getMessage()), HttpStatus.BAD_REQUEST);
        }

    }
}
