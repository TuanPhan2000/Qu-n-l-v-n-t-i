package com.team12.btl.controller;


import com.team12.btl.dto.Status;
import com.team12.btl.entity.CoachTurn;
import com.team12.btl.entity.Route;
import com.team12.btl.service.service_impl.CoachTurnService_Impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/coachTurn")
public class CoachTurnController {
    @Autowired
    CoachTurnService_Impl coachTurnService;

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(coachTurnService.findAll());
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id){
        return ResponseEntity.ok(coachTurnService.findById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCoachTurn(@Valid @RequestBody CoachTurn coachTurn){
        try {
            return ResponseEntity.ok(coachTurnService.create(coachTurn));
        } catch (Exception e) {
            System.out.println("\u001B[31m" + e.getMessage() + "\u001B[0m");
            return new ResponseEntity<Status>(new Status(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody CoachTurn coachTurn) {

        try {
            return ResponseEntity.ok(coachTurnService.update(coachTurn));
        } catch (Exception e) {
            System.out.println("\u001B[31m" + e.getMessage() + "\u001B[0m");
            return new ResponseEntity<Status>(new Status(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/deleteById/{Id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer Id){
        try {
            return ResponseEntity.ok(coachTurnService.delete(Id));
        } catch (Exception e) {
            System.out.println("\u001B[31m" + e.getMessage() + "\u001B[0m");
            return new ResponseEntity<Status>(new Status(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam Map<String,String> param){
        return ResponseEntity.ok(coachTurnService.searchCoachTurn(param));
    }

    @GetMapping("/getListCoachTurnByIdCoachAndTime")
    public ResponseEntity<?> getListCoachTurnByIdCoachAndTime(@RequestParam Map<String,String> param){
        return ResponseEntity.ok(coachTurnService.getListCoachTurnByIdCoachAndTime(param));
    }

    @GetMapping("/getRevenueCoachByTime")
    public ResponseEntity<?> getRevenueCoachByTime(@RequestParam Map<String,String> param){
        return ResponseEntity.ok(coachTurnService.getRevenueCoachByTime(param));
    }
}
