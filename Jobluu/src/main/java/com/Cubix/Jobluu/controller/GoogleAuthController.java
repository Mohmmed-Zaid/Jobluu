package com.Cubix.Jobluu.controller;

import com.Cubix.Jobluu.dto.AccountType;
import com.Cubix.Jobluu.dto.GoogleLoginRequest;
import com.Cubix.Jobluu.dto.UserDto;
import com.Cubix.Jobluu.jwt.JwtHelper;
import com.Cubix.Jobluu.service.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class GoogleAuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtHelper jwtHelper;

    @Value("${google.client-id}")
    private String googleClientId;

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleLoginRequest request) {
        try {
            // Verify Google ID token
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(),
                    GsonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(request.getCredential());

            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");
                String googleId = payload.getSubject();
                String picture = (String) payload.get("picture");

                // Check if user exists
                UserDto existingUser = null;
                try {
                    existingUser = userService.getUserByEmail(email);
                } catch (Exception e) {
                    // User doesn't exist, will create new one
                }

                UserDto user;
                if (existingUser != null) {
                    // Update existing user with Google info if needed
                    if (existingUser.getId() == null) {
                        existingUser.setGoogleId(googleId);
                        if (picture != null) {
                            existingUser.setProfilePicture(picture);
                        }
                        user = userService.updateUser(existingUser);
                    } else {
                        user = existingUser;
                    }
                } else {
                    // Create new user with Google info
                    UserDto newUser = new UserDto();
                    newUser.setName(name);
                    newUser.setEmail(email);
                    newUser.setAccountType(request.getAccountType());
                    newUser.setGoogleId(googleId);
                    newUser.setProfilePicture(picture);
                    newUser.setPassword(""); // No password for Google users

                    user = userService.createGoogleUser(newUser);
                }

                // Generate JWT token
                String jwt = jwtHelper.generateToken(email);

                // Create response
                Map<String, Object> response = new HashMap<>();
                response.put("token", jwt);
                response.put("user", user);
                response.put("message", "Google login successful");

                return ResponseEntity.ok(response);

            } else {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Invalid Google token");
                return ResponseEntity.status(401).body(errorResponse);
            }

        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Google authentication failed: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}