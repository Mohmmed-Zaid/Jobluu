package com.Cubix.Jobluu.service;

import com.Cubix.Jobluu.dto.LoginDto;
import com.Cubix.Jobluu.dto.UserDto;
import com.Cubix.Jobluu.exception.JobluuException;
import jakarta.validation.Valid;

public interface UserService {
    UserDto registerUser(UserDto userDto) throws JobluuException;

    public UserDto loginUser( LoginDto loginDto)throws JobluuException;
}

