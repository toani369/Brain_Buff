package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.ActivitySession;
import com.example.demo.service.TrainingExecutionService;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*")
public class SessionController {

    @Autowired
    private TrainingExecutionService service;

    //POST /api/sessions/submit
    @PostMapping("/submit")
    public ResponseEntity<String> submitSession(@RequestBody ActivitySession session) {
        service.submitSession(session);
        return ResponseEntity.ok("Session submitted successfully");
    }

    //GET /api/sessions/trainee/{id}
    @GetMapping("/trainee/{id}")
    public ResponseEntity<List<ActivitySession>> getSessionsByTrainee(@PathVariable Long id) {
        return ResponseEntity.ok(service.getSessionsByTrainee(id));
    }

    //GET /api/sessions/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ActivitySession> getSessionById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getSessionById(id));
    }
}