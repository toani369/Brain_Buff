package com.example.demo.controller;

import com.example.demo.entity.CognitiveExercise;
import com.example.demo.repository.CognitiveExerciseRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exercises")
@CrossOrigin(origins = "*")
public class ExerciseController {

    private final CognitiveExerciseRepository repository;

    public ExerciseController(CognitiveExerciseRepository repository) {
        this.repository = repository;
    }


    @GetMapping
    public ResponseEntity<Page<CognitiveExercise>> getAll(Pageable pageable) {
        return ResponseEntity.ok(repository.findAll(pageable));
    }

    @PostMapping
    @PreAuthorize("hasRole('SYSTEM_ARCHITECT')")
    public ResponseEntity<CognitiveExercise> create(@RequestBody CognitiveExercise exercise) {
        return ResponseEntity.ok(repository.save(exercise));
    }


    @GetMapping("/{id}")
    public ResponseEntity<CognitiveExercise> getById(@PathVariable Long id) {

        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('SYSTEM_ARCHITECT')")
    public ResponseEntity<CognitiveExercise> update(@PathVariable Long id,
                                                    @RequestBody CognitiveExercise exercise) {

        exercise.setId(id);
        return ResponseEntity.ok(repository.save(exercise));
    }


    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}