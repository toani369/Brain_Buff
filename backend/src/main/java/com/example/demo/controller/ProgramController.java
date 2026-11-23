package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.TrainingProgram;
import com.example.demo.service.ProgramCuratorService;

@RestController
@RequestMapping("/api/programs")
@CrossOrigin(origins = "*")
public class ProgramController {

    @Autowired
    private ProgramCuratorService service;

    // GET /
    @GetMapping
    public ResponseEntity<?> getAllPrograms() {
        return ResponseEntity.ok(service.getAllPrograms());
    }

    // GET /{id}
    @GetMapping("/{id}")
    public ResponseEntity<?> getProgramById(@PathVariable Long id) {
        com.example.demo.entity.TrainingProgram program = service.getProgramById(id);
        if (program != null) {
            return ResponseEntity.ok(program);
        }
        return ResponseEntity.notFound().build();
    }

    // POST /
    @PostMapping
    @org.springframework.security.access.prepost.PreAuthorize("hasAnyRole('NEURO_COACH','SYSTEM_ARCHITECT')")
    public ResponseEntity<String> createProgram(
            @RequestBody TrainingProgram program,
            org.springframework.security.core.Authentication authentication) {
        if (authentication != null && authentication.getName() != null) {
            if (program.getCoach() == null || program.getCoach().getId() == null) {
                com.example.demo.entity.SystemUser authCoach = new com.example.demo.entity.SystemUser();
                authCoach.setUsername(authentication.getName());
                program.setCoach(authCoach);
            }
        }
        service.createProgram(program);
        return ResponseEntity.ok("Program created successfully");
    }

    // PUT /{id}
    @PutMapping("/{id}")
    @org.springframework.security.access.prepost.PreAuthorize("hasAnyRole('NEURO_COACH','SYSTEM_ARCHITECT')")
    public ResponseEntity<String> updateProgram(
            @PathVariable Long id,
            @RequestBody TrainingProgram program) {

        service.updateProgram(id, program);
        return ResponseEntity.ok("Program updated successfully");
    }

    // DELETE /{id}
    @DeleteMapping("/{id}")
    @org.springframework.security.access.prepost.PreAuthorize("hasAnyRole('NEURO_COACH','SYSTEM_ARCHITECT')")
    public ResponseEntity<String> deleteProgram(@PathVariable Long id) {
        service.deleteProgram(id);
        return ResponseEntity.ok("Program deleted successfully");
    }
}