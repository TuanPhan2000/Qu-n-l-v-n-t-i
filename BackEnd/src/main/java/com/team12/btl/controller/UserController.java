package com.team12.btl.controller;

import com.team12.btl.dto.Status;
import com.team12.btl.entity.User;
import com.team12.btl.service.service_impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/findByUserName")
    public ResponseEntity<?> findByUserName(@RequestParam String username) {
        return ResponseEntity.ok(userService.getInfoByUserName(username));
    }

    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody Map<String, String> data) {
        try {
            return ResponseEntity.ok(userService.update(data));
        } catch (Exception e) {
            return new ResponseEntity<>(new Status(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestParam String username){
        try {
            return ResponseEntity.ok(userService.resetPassword(username));
        } catch (Exception e) {
            return new ResponseEntity<>(new Status(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

}
