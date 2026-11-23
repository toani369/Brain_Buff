package com.example.demo.exception;

import com.example.demo.entity.SystemUser;
import com.example.demo.repository.SystemUserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private SystemUserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                String username = jwtUtil.extractUsername(token);
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    Optional<SystemUser> userOpt = userRepository.findByUsername(username)
                            .or(() -> userRepository.findByEmail(username));
                    if (userOpt.isPresent()) {
                        SystemUser user = userOpt.get();
                        String role = user.getRole() != null ? user.getRole().name() : "TRAINEE";
                        org.springframework.security.core.userdetails.UserDetails userDetails =
                                org.springframework.security.core.userdetails.User.withUsername(user.getUsername())
                                        .password(user.getPassword() != null ? user.getPassword() : "")
                                        .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role)))
                                        .build();

                        if (jwtUtil.isTokenValid(token, userDetails)) {
                            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                    user.getUsername(), null, userDetails.getAuthorities()
                            );
                            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(authToken);
                        }
                    }
                }
            } catch (Exception e) {
                // Ignore invalid token
            }
        }
        filterChain.doFilter(request, response);
    }
}
