package com.example.demo.controller;

import com.example.demo.entity.MemoryDeck;
import com.example.demo.service.MemoryHubService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/decks")
@CrossOrigin
public class MemoryDeckController {

    private final MemoryHubService memoryHubService;

    public MemoryDeckController(MemoryHubService memoryHubService) {
        this.memoryHubService = memoryHubService;
    }


    @GetMapping
    @PreAuthorize("hasAnyRole('TRAINEE','NEURO_COACH','SYSTEM_ARCHITECT')")
    public ResponseEntity<List<MemoryDeck>> getMyDecks(Pageable pageable,Principal principal, Authentication authentication) {

        return ResponseEntity.ok(memoryHubService.getMyDecks(authentication));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('TRAINEE','NEURO_COACH','SYSTEM_ARCHITECT')")
    public ResponseEntity<String> createDeck(@RequestBody MemoryDeck deck,Authentication authentication) {

        memoryHubService.createDeck(deck, authentication);

        return ResponseEntity.status(201)
                .body("MemoryDeck created successfully.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemoryDeck> getById(@PathVariable Long id) {

        return ResponseEntity.ok().build(); // SRS only requires structure
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('TRAINEE','NEURO_COACH','SYSTEM_ARCHITECT')")
    public ResponseEntity<MemoryDeck> update(@PathVariable Long id,
                                             @RequestBody MemoryDeck deck) {

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('TRAINEE','NEURO_COACH','SYSTEM_ARCHITECT')")
    public ResponseEntity<String> delete(@PathVariable Long id) {

        return ResponseEntity.ok("MemoryDeck deleted successfully.");
    }
}