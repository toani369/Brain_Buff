package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.demo.entity.SystemUser;
import com.example.demo.exception.JwtUtil;
import com.example.demo.exception.UnauthorizedException;
import com.example.demo.repository.SystemUserRepository;

@Service
public class AuthService {

    @Autowired
    private SystemUserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil; // 1. Inject your JwtUtil component

    public SystemUser register(SystemUser user) {
        if (user.getUsername() != null && userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("username already exist");
        }
        if (user.getEmail() != null && userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("email already exist");
        }
        if (user.getCreatedAt() == null) {
            user.setCreatedAt(LocalDateTime.now());
        }
        if (user.getRole() == null) {
            user.setRole(com.example.demo.entity.UserRole.TRAINEE);
        }
        return userRepository.save(user);
    }

    public Map<String, Object> login(String username, String password) {

        // Your original user lookup logic
        SystemUser user = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        // Your original password check
        if (!user.getPassword().equals(password)) {
            throw new UnauthorizedException("Invalid password");
        }

        // 2. Build UserDetails on the fly for JwtUtil
        UserDetails userDetails = User.withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities("ROLE_" + user.getRole().name())
                .build();

        // 3. GENERATE TOKEN HERE
        String token = jwtUtil.generateToken(userDetails);

        // 4. Return token response
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);

        return response;
    }
}










// package com.example.demo.service;

// import java.time.LocalDateTime;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.example.demo.entity.SystemUser;
// import com.example.demo.repository.SystemUserRepository;

// @Service
// public class AuthService {

//     @Autowired
//     private SystemUserRepository userRepository;

//     public SystemUser register(SystemUser user) {
//         user.setCreatedAt(LocalDateTime.now());
//         return userRepository.save(user);
//     }

//     public SystemUser login(String username, String password) {

//         SystemUser user = userRepository
//                 .findByUsername(username)
//                 .orElseThrow(() -> new RuntimeException("User not found"));

//         if (!user.getPassword().equals(password)) {
//             throw new RuntimeException("Invalid password");
//         }

//         return user;
//     }
// }
