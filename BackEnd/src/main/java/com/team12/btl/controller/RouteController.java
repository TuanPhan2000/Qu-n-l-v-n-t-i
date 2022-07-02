package com.team12.btl.controller;

import com.team12.btl.entity.Route;
import com.team12.btl.service.service_impl.RouteService_Impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/route")
public class RouteController {
    @Autowired
    RouteService_Impl routeService;

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(routeService.findAll());
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(routeService.findById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRoute(@Valid @RequestBody Route route) {
        return ResponseEntity.ok(routeService.create(route));
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Integer id) {
        return ResponseEntity.ok(routeService.delete(id));
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody Route route) {
        return ResponseEntity.ok(routeService.update(route));
    }

    @GetMapping("/searchRoute")
    public ResponseEntity<?> searchRoute(@RequestParam Map<String, String> param) {
        return ResponseEntity.ok(routeService.searchRoute(param));
    }
}
