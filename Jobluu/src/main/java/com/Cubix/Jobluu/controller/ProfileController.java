package com.Cubix.Jobluu.controller;

import com.Cubix.Jobluu.dto.ProfileDto;
import com.Cubix.Jobluu.exception.JobluuException;
import com.Cubix.Jobluu.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/get/{id}")
    public ResponseEntity<ProfileDto> getProfile(@PathVariable Long id) throws JobluuException {
        ProfileDto profile = profileService.getProfile(id);
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ProfileDto> updateProfile(@RequestBody ProfileDto profileDto) throws JobluuException {
        ProfileDto updatedProfile = profileService.updateProfile(profileDto);
        return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
    }
}
