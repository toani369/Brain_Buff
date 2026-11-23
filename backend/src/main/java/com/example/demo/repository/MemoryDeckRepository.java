package com.example.demo.repository;

import com.example.demo.entity.MemoryDeck;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemoryDeckRepository extends JpaRepository<MemoryDeck, Long> {

    List<MemoryDeck> findByOwnerId(Long ownerId);

}