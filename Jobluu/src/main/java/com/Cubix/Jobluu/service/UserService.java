package com.Cubix.Jobluu.service;

import com.Cubix.Jobluu.dto.LoginDto;
import com.Cubix.Jobluu.dto.ResponseDto;
import com.Cubix.Jobluu.dto.UserDto;
import com.Cubix.Jobluu.exception.JobluuException;
import jakarta.validation.Valid;

public interface UserService {

    UserDto registerUser(UserDto userDto) throws JobluuException;

    UserDto loginUser(LoginDto loginDto) throws JobluuException;

    Boolean sendOTP(String email) throws Exception;

    Boolean verifyOTP(String email, String otp) throws JobluuException;

    ResponseDto changePassword(@Valid LoginDto loginDto) throws JobluuException;


}
