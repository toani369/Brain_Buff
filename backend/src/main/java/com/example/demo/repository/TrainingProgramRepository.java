package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.TrainingProgram;

public interface TrainingProgramRepository extends JpaRepository<TrainingProgram, Long> {

    List<TrainingProgram> findByCoachId(Long coachId);
}