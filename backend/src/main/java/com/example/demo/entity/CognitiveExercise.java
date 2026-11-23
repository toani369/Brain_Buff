package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;





@Entity
@Table(name = "cognitive_exercises")
public class CognitiveExercise {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String exerciseType;

    @Column(nullable = false)
    private Integer difficultyLevel;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    // Default no-arg constructor required by JPA and Jackson
    public CognitiveExercise() {
    }

    public CognitiveExercise(long id, String title, String description, String exerciseType, Integer difficultyLevel,
            String instructions) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.exerciseType = exerciseType;
        this.difficultyLevel = difficultyLevel;
        this.instructions = instructions;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExerciseType() {
        return exerciseType;
    }

    public void setExerciseType(String exerciseType) {
        this.exerciseType = exerciseType;
    }

    public Integer getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(Integer difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }
    
}
