package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.SystemUser;
import com.example.demo.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<SystemUser> register(@RequestBody SystemUser user) {
        return ResponseEntity.ok(authService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody(required = false) java.util.Map<String, String> body,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String password) {

        if (body != null) {
            if (body.get("username") != null) {
                username = body.get("username");
            }
            if (body.get("password") != null) {
                password = body.get("password");
            }
        }

        return ResponseEntity.ok(authService.login(username, password));
    }
}









// package com.example.demo.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import com.example.demo.entity.SystemUser;
// import com.example.demo.service.AuthService;

// @RestController
// @RequestMapping("/api/auth")
// @CrossOrigin(origins = "*")
// public class AuthController {

//     @Autowired
//     private AuthService authService;

//     @PostMapping("/register")
//     public ResponseEntity<SystemUser> register(@RequestBody SystemUser user) {
//         return ResponseEntity.ok(authService.register(user));
//     }

//     @PostMapping("/login")
//     public ResponseEntity<SystemUser> login(
//             @RequestParam String username,
//             @RequestParam String password) {

//         return ResponseEntity.ok(authService.login(username, password));
//     }
// }