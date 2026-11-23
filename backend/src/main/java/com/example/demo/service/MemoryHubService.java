package com.example.demo.service;

import com.example.demo.entity.MemoryDeck;
import com.example.demo.entity.SystemUser;
import com.example.demo.repository.MemoryDeckRepository;
import com.example.demo.repository.SystemUserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemoryHubService {

    private final MemoryDeckRepository memoryDeckRepository;
    private final SystemUserRepository systemUserRepository;

    public MemoryHubService(MemoryDeckRepository memoryDeckRepository,
                            SystemUserRepository systemUserRepository) {
        this.memoryDeckRepository = memoryDeckRepository;
        this.systemUserRepository = systemUserRepository;
    }

    private SystemUser resolveUser(Authentication authentication) {
        String username = (authentication != null && authentication.isAuthenticated() && !"anonymousUser".equals(authentication.getName()))
                ? authentication.getName()
                : null;

        SystemUser user = null;
        if (username != null) {
            user = systemUserRepository.findByUsername(username)
                    .or(() -> systemUserRepository.findByEmail(username))
                    .orElse(null);
        }

        if (user == null) {
            user = systemUserRepository.findAll().stream().findFirst().orElse(null);
        }

        return user;
    }

    public void createDeck(MemoryDeck deck, Authentication authentication) {
        SystemUser user = resolveUser(authentication);
        if (user != null) {
            deck.setOwner(user);
        }
        memoryDeckRepository.save(deck);
    }

    public List<MemoryDeck> getMyDecks(Authentication authentication) {
        SystemUser user = resolveUser(authentication);
        if (user != null) {
            return memoryDeckRepository.findByOwnerId(user.getId());
        }
        return memoryDeckRepository.findAll();
    }
}