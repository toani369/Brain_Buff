package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.entity.CognitiveExercise;
import com.example.demo.entity.SystemUser;
import com.example.demo.entity.UserRole;
import com.example.demo.repository.CognitiveExerciseRepository;
import com.example.demo.repository.SystemUserRepository;

import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private CognitiveExerciseRepository exerciseRepository;

    @Autowired
    private SystemUserRepository userRepository;

    @Override
    public void run(String... args) {
        try {
            // Seed initial cognitive exercises if empty
            if (exerciseRepository.count() == 0) {
                exerciseRepository.save(new CognitiveExercise(
                        0,
                        "Dual-N-Back Working Memory",
                        "Strengthen continuous working memory update buffers and executive control.",
                        "MEMORY",
                        2,
                        "Track auditory and spatial stimuli simultaneously. Press match when current stimulus matches N steps back."
                ));

                exerciseRepository.save(new CognitiveExercise(
                        0,
                        "Selective Stroop Attention",
                        "Train inhibitory neural control and cognitive flexibility under interference.",
                        "ATTENTION",
                        1,
                        "Identify the ink color of the word while suppressing the semantic meaning."
                ));

                exerciseRepository.save(new CognitiveExercise(
                        0,
                        "Matrix Syllogism Deductions",
                        "Exercise fluid inductive and deductive relational reasoning.",
                        "LOGIC",
                        3,
                        "Analyze symbolic premise rules and determine valid conclusions before the timer runs out."
                ));
            }

            // Seed initial users if empty
            if (userRepository.count() == 0) {
                userRepository.save(new SystemUser(
                        null,
                        "admin",
                        "admin",
                        "admin@brainbuff.io",
                        UserRole.SYSTEM_ARCHITECT,
                        LocalDateTime.now()
                ));

                userRepository.save(new SystemUser(
                        null,
                        "coach",
                        "coach",
                        "coach@brainbuff.io",
                        UserRole.NEURO_COACH,
                        LocalDateTime.now()
                ));

                userRepository.save(new SystemUser(
                        null,
                        "trainee",
                        "trainee",
                        "trainee@brainbuff.io",
                        UserRole.TRAINEE,
                        LocalDateTime.now()
                ));
            }
        } catch (Exception e) {
            // Seeder fallback silently
        }
    }
}
