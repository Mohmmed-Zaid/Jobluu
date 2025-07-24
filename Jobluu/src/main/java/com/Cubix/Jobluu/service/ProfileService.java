package com.Cubix.Jobluu.service;

import com.Cubix.Jobluu.dto.ProfileDto;
import com.Cubix.Jobluu.exception.JobluuException;

public interface ProfileService {

    public Long createProfile(String email) throws JobluuException;

    public ProfileDto getProfile(Long id) throws JobluuException;

    public ProfileDto updateProfile(ProfileDto profileDto) throws JobluuException;
}
