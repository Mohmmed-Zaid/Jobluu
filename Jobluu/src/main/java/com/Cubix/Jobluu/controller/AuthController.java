package com.Cubix.Jobluu.controller;

import com.Cubix.Jobluu.jwt.AuthenticationResponse;
import com.Cubix.Jobluu.jwt.JwtHelper;
import com.Cubix.Jobluu.jwt.MyUserDetailsService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JwtHelper jwtHelper;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            // Load user details
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());

            // Generate JWT token
            String jwt = jwtHelper.generateToken(userDetails.getUsername());

            return ResponseEntity.ok(new AuthenticationResponse(jwt));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid email or password");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Authentication failed: " + e.getMessage());
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String username = jwtHelper.getUsernameFromToken(token);

                if (username != null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    if (jwtHelper.isTokenValid(token, userDetails.getUsername())) {
                        return ResponseEntity.ok("Token is valid");
                    }
                }
            }
            return ResponseEntity.status(401).body("Invalid token");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Token validation failed");
        }
    }

    // Inner class for login request
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LoginRequest {
        private String email;
        private String password;
    }
}