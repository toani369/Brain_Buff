package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.ActivitySession;
import com.example.demo.entity.SessionStatus;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.ActivitySessionRepository;

@Service
public class TrainingExecutionService {

    @Autowired
    private ActivitySessionRepository repository;

    // ✅ SUBMIT SESSION
    public void submitSession(ActivitySession session) {

        // set default values
        session.setTimestamp(LocalDateTime.now());
        session.setStatus(SessionStatus.COMPLETED);

        repository.save(session);
    }

    // ✅ GET HISTORY BY USER
    public List<ActivitySession> getSessionsByTrainee(Long traineeId) {
        return repository.findByTraineeId(traineeId);
    }

    // ✅ GET BY ID (optional)
    public ActivitySession getSessionById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found"));
    }
}