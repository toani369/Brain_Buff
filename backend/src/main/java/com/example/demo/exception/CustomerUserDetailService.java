package com.example.demo.exception;

import com.example.demo.entity.SystemUser;
import com.example.demo.repository.SystemUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomerUserDetailService implements UserDetailsService {

    @Autowired
    private SystemUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SystemUser user = userRepository.findByUsername(username)
                .or(() -> userRepository.findByEmail(username))
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        String role = user.getRole() != null ? user.getRole().name() : "TRAINEE";
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword() != null ? user.getPassword() : "",
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role))
        );
    }
}
