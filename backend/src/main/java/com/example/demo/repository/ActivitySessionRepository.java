package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ActivitySession;

public interface ActivitySessionRepository extends JpaRepository<ActivitySession, Long> {

    List<ActivitySession> findByTraineeId(Long traineeId);
}