package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "system_users")
public class SystemUser {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false, unique = true)
        private String username;

        @Column(nullable = false)
        private String password;

        @Column(nullable = false, unique = true)
        private String email;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private UserRole role;

        @Column(nullable = false)
        private LocalDateTime createdAt;

        // ✅ ADDED: Default no-arg constructor required by JPA
        public SystemUser() {
        }

        // Your existing parameterized constructor (Preserved for tests)
        public SystemUser(Long id, String username, String password, String email, UserRole role,
                        LocalDateTime createdAt) {
                this.id = id;
                this.username = username;
                this.password = password;
                this.email = email;
                this.role = role;
                this.createdAt = createdAt;
        }

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public String getUsername() {
                return username;
        }

        public void setUsername(String username) {
                this.username = username;
        }

        public String getPassword() {
                return password;
        }

        public void setPassword(String password) {
                this.password = password;
        }

        public String getEmail() {
                return email;
        }

        public void setEmail(String email) {
                this.email = email;
        }

        public UserRole getRole() {
                return role;
        }

        public void setRole(UserRole role) {
                this.role = role;
        }

        public LocalDateTime getCreatedAt() {
                return createdAt;
        }

        public void setCreatedAt(LocalDateTime createdAt) {
                this.createdAt = createdAt;
        }
}









// package com.example.demo.entity;

// import java.time.LocalDateTime;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.EnumType;
// import jakarta.persistence.Enumerated;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;

// @Entity
// @Table(name = "system_users")
// public class SystemUser {

//         @Id
//         @GeneratedValue(strategy = GenerationType.IDENTITY)
//         private Long id;

//         @Column(nullable = false)
//         private String username;

//         @Column(nullable = false)
//         private String password;

//         @Column(nullable = false)
//         private String email;

//        @Enumerated(EnumType.STRING)
//        @Column(nullable = false)
//        private UserRole role;

//         @Column(nullable = false)
//         private LocalDateTime createdAt;

//         public SystemUser(Long id, String username, String password, String email, UserRole role,
//                         LocalDateTime createdAt) {
//                 this.id = id;
//                 this.username = username;
//                 this.password = password;
//                 this.email = email;
//                 this.role = role;
//                 this.createdAt = createdAt;
//         }

//         public Long getId() {
//                 return id;
//         }

//         public void setId(Long id) {
//                 this.id = id;
//         }

//         public String getUsername() {
//                 return username;
//         }

//         public void setUsername(String username) {
//                 this.username = username;
//         }

//         public String getPassword() {
//                 return password;
//         }

//         public void setPassword(String password) {
//                 this.password = password;
//         }

//         public String getEmail() {
//                 return email;
//         }

//         public void setEmail(String email) {
//                 this.email = email;
//         }

//         public UserRole getRole() {
//                 return role;
//         }

//         public void setRole(UserRole role) {
//                 this.role = role;
//         }

//         public LocalDateTime getCreatedAt() {
//                 return createdAt;
//         }

//         public void setCreatedAt(LocalDateTime createdAt) {
//                 this.createdAt = createdAt;
//         }

        
        
// }
 
