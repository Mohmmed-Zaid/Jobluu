package com.Cubix.Jobluu.service;

import com.Cubix.Jobluu.dto.ProfileDto;
import com.Cubix.Jobluu.entities.Profile;
import com.Cubix.Jobluu.exception.JobluuException;
import com.Cubix.Jobluu.repositories.ProfileRepository;
import com.Cubix.Jobluu.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public Long createProfile(String email) throws JobluuException {
        Profile profile = new Profile();
        profile.setId(Utilities.getNextSequence("profile"));
        profile.setEmail(email);
        profile.setSkills(new ArrayList<>());
        profile.setExperiences(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());
        profile.setJobTitle("");
        profile.setCompany("");
        profile.setLocation("");
        profile.setAbout("");
        profileRepository.save(profile);
        return profile.getId();
    }

    @Override
    public ProfileDto getProfile(Long id) throws JobluuException {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new JobluuException("PROFILE_NOT_FOUND"));
        return profile.toDTO();
    }

    @Override
    public ProfileDto updateProfile(ProfileDto profileDto) throws JobluuException {
        profileRepository.findById(profileDto.getId())
                .orElseThrow(() -> new JobluuException("PROFILE_NOT_FOUND"));
        profileRepository.save(profileDto.toEntity());
        return profileDto;
    }
}
