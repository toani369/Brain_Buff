package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.NeuroMetric;
import com.example.demo.service.NeuroAnalyticsService;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private NeuroAnalyticsService service;

    // ✅ GET /api/analytics/{traineeId}
    @GetMapping("/{traineeId}")
    public ResponseEntity<NeuroMetric> getMetrics(@PathVariable Long traineeId) {
        return ResponseEntity.ok(service.getMetricsByTrainee(traineeId));
    }

    // ✅ POST /api/analytics
    @PostMapping
    public ResponseEntity<NeuroMetric> saveMetrics(@RequestBody NeuroMetric metric) {
        return ResponseEntity.ok(service.saveOrUpdateMetrics(metric));
    }
}