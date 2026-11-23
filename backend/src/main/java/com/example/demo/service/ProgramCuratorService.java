package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.TrainingProgram;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.TrainingProgramRepository;

@Service
public class ProgramCuratorService {

    @Autowired
    private TrainingProgramRepository repository;

    @Autowired(required = false)
    private com.example.demo.repository.SystemUserRepository userRepository;

    @Autowired(required = false)
    private com.example.demo.repository.CognitiveExerciseRepository exerciseRepository;

    public java.util.List<TrainingProgram> getAllPrograms() {
        return repository.findAll();
    }

    public TrainingProgram getProgramById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // CREATE
    public void createProgram(TrainingProgram program) {
        if (userRepository != null) {
            com.example.demo.entity.SystemUser resolvedCoach = null;
            if (program.getCoach() != null && program.getCoach().getId() != null) {
                resolvedCoach = userRepository.findById(program.getCoach().getId()).orElse(null);
            }
            if (resolvedCoach == null && program.getCoach() != null && program.getCoach().getUsername() != null) {
                resolvedCoach = userRepository.findByUsername(program.getCoach().getUsername()).orElse(null);
            }
            if (resolvedCoach == null) {
                resolvedCoach = userRepository.findAll().stream()
                        .filter(u -> u.getRole() == com.example.demo.entity.UserRole.NEURO_COACH)
                        .findFirst()
                        .orElseGet(() -> userRepository.findAll().stream().findFirst().orElse(null));
            }
            program.setCoach(resolvedCoach);
        }
        if (exerciseRepository != null && program.getExercises() != null && !program.getExercises().isEmpty()) {
            java.util.List<com.example.demo.entity.CognitiveExercise> valid = new java.util.ArrayList<>();
            for (com.example.demo.entity.CognitiveExercise ex : program.getExercises()) {
                if (ex != null && ex.getId() > 0) {
                    exerciseRepository.findById(ex.getId()).ifPresent(valid::add);
                }
            }
            program.setExercises(valid);
        }
        repository.save(program);
    }

    // UPDATE
    public void updateProgram(Long id, TrainingProgram updatedProgram) {
        TrainingProgram program = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Program not found"));

        program.setName(updatedProgram.getName());
        program.setTargetFocusArea(updatedProgram.getTargetFocusArea());
        program.setDurationWeeks(updatedProgram.getDurationWeeks());
        if (exerciseRepository != null && updatedProgram.getExercises() != null) {
            java.util.List<com.example.demo.entity.CognitiveExercise> valid = new java.util.ArrayList<>();
            for (com.example.demo.entity.CognitiveExercise ex : updatedProgram.getExercises()) {
                if (ex != null && ex.getId() > 0) {
                    exerciseRepository.findById(ex.getId()).ifPresent(valid::add);
                }
            }
            program.setExercises(valid);
        } else if (updatedProgram.getExercises() != null) {
            program.setExercises(updatedProgram.getExercises());
        }

        repository.save(program);
    }

    // DELETE
    public void deleteProgram(Long id) {
        TrainingProgram program = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Program not found"));

        repository.delete(program);
    }
}