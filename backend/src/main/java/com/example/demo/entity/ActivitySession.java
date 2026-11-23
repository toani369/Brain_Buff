 package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;

//import org.springframework.web.bind.support.SessionStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "activity_sessions")
public class ActivitySession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "trainee_id", nullable = false)
    private SystemUser trainee;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private CognitiveExercise exercise;

    @Column(nullable = false)
    private Integer rawScore;

    @Column(nullable = false)
    private long completionTimeMs;

    @Column(nullable = false)
    private Double accuracyRate;

    @Enumerated(EnumType.STRING)
    private SessionStatus status;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    // Default no-arg constructor required by JPA and Jackson
    public ActivitySession() {
    }

    public ActivitySession(long id, SystemUser trainee, CognitiveExercise exercise, Integer rawScore,
            long completionTimeMs, Double accuracyRate, SessionStatus status, LocalDateTime timestamp) {
        this.id = id;
        this.trainee = trainee;
        this.exercise = exercise;
        this.rawScore = rawScore;
        this.completionTimeMs = completionTimeMs;
        this.accuracyRate = accuracyRate;
        this.status = status;
        this.timestamp = timestamp;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public SystemUser getTrainee() {
        return trainee;
    }

    public void setTrainee(SystemUser trainee) {
        this.trainee = trainee;
    }

    public CognitiveExercise getExercise() {
        return exercise;
    }

    public void setExercise(CognitiveExercise exercise) {
        this.exercise = exercise;
    }

    public Integer getRawScore() {
        return rawScore;
    }

    public void setRawScore(Integer rawScore) {
        this.rawScore = rawScore;
    }

    public long getCompletionTimeMs() {
        return completionTimeMs;
    }

    public void setCompletionTimeMs(long completionTimeMs) {
        this.completionTimeMs = completionTimeMs;
    }

    public Double getAccuracyRate() {
        return accuracyRate;
    }

    public void setAccuracyRate(Double accuracyRate) {
        this.accuracyRate = accuracyRate;
    }

    public SessionStatus getStatus() {
        return status;
    }

    public void setStatus(SessionStatus status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

   
}
