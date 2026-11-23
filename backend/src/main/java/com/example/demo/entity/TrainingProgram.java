package com.example.demo.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "training_programs")
public class TrainingProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "coach_id", nullable = false)
    private SystemUser coach;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String targetFocusArea;

    @Column(nullable = false)
    private Integer durationWeeks;

    @ManyToMany
    @JoinTable(
        name = "program_exercises",
        joinColumns = @JoinColumn(name="program_id"),
        inverseJoinColumns = @JoinColumn(name="exercise_id")
    )
    private List<CognitiveExercise>exercises;

    // Default no-arg constructor required by JPA and Jackson
    public TrainingProgram() {
    }

    public TrainingProgram(long id, SystemUser coach, String name, String targetFocusArea, Integer durationWeeks,
            List<CognitiveExercise> exercises) {
        this.id = id;
        this.coach = coach;
        this.name = name;
        this.targetFocusArea = targetFocusArea;
        this.durationWeeks = durationWeeks;
        this.exercises = exercises;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public SystemUser getCoach() {
        return coach;
    }

    public void setCoach(SystemUser coach) {
        this.coach = coach;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTargetFocusArea() {
        return targetFocusArea;
    }

    public void setTargetFocusArea(String targetFocusArea) {
        this.targetFocusArea = targetFocusArea;
    }

    public Integer getDurationWeeks() {
        return durationWeeks;
    }

    public void setDurationWeeks(Integer durationWeeks) {
        this.durationWeeks = durationWeeks;
    }

    public List<CognitiveExercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<CognitiveExercise> exercises) {
        this.exercises = exercises;
    }

    

}
