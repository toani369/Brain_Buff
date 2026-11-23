package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "neuro_metrics")
public class NeuroMetric {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "trainee_id",nullable = false)
    private SystemUser trainee;

    @Column(nullable = false)
    private Double focusScore;

    @Column(nullable = false)
    private Double memoryIndex;

    @Column(nullable = false)
    private Double processingSpeed;

    @Column(nullable = false)
    private LocalDateTime lastUpdated;

    // Default no-arg constructor required by JPA and Jackson
    public NeuroMetric() {
    }

    public NeuroMetric(Long id, SystemUser trainee, Double focusScore, Double memoryIndex, Double processingSpeed,
            LocalDateTime lastUpdated) {
        this.id = id;
        this.trainee = trainee;
        this.focusScore = focusScore;
        this.memoryIndex = memoryIndex;
        this.processingSpeed = processingSpeed;
        this.lastUpdated = lastUpdated;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SystemUser getTrainee() {
        return trainee;
    }

    public void setTrainee(SystemUser trainee) {
        this.trainee = trainee;
    }

    public Double getFocusScore() {
        return focusScore;
    }

    public void setFocusScore(Double focusScore) {
        this.focusScore = focusScore;
    }

    public Double getMemoryIndex() {
        return memoryIndex;
    }

    public void setMemoryIndex(Double memoryIndex) {
        this.memoryIndex = memoryIndex;
    }

    public Double getProcessingSpeed() {
        return processingSpeed;
    }

    public void setProcessingSpeed(Double processingSpeed) {
        this.processingSpeed = processingSpeed;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    
}
