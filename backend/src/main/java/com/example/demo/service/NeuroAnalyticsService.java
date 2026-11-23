package com.example.demo.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.NeuroMetric;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.NeuroMetricRepository;

@Service
public class NeuroAnalyticsService {

    @Autowired
    private NeuroMetricRepository repository;

    // ✅ GET METRICS BY USER
    public NeuroMetric getMetricsByTrainee(Long traineeId) {
        return repository.findByTraineeId(traineeId)
                .orElseThrow(() -> new ResourceNotFoundException("Metrics not found"));
    }

    // ✅ CREATE OR UPDATE METRICS
    public NeuroMetric saveOrUpdateMetrics(NeuroMetric metric) {

        metric.setLastUpdated(LocalDateTime.now());

        return repository.save(metric);
    }
}