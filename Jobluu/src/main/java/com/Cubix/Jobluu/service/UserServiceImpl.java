package com.Cubix.Jobluu.service;

import com.Cubix.Jobluu.dto.LoginDto;
import com.Cubix.Jobluu.dto.UserDto;
import com.Cubix.Jobluu.entities.User;
import com.Cubix.Jobluu.exception.JobluuException;
import com.Cubix.Jobluu.repositories.UserRepository;
import com.Cubix.Jobluu.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto registerUser(UserDto userDto) throws JobluuException {
        // Check if user already exists by email (not password!)
        Optional<User> optional = userRepository.findByEmail(userDto.getEmail());
        if (optional.isPresent()) {
            throw new JobluuException("USER_FOUND");
        }

        // Set ID using utility method
        userDto.setId(Utilities.getNextSequence("users"));

        // Encode password
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));

        // Convert to entity and save
        User user = userDto.toEntity();
        user = userRepository.save(user);

        return user.toDto();
    }

    @Override
    public UserDto loginUser(LoginDto loginDto) throws JobluuException {
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new JobluuException("USER_NOT_FOUND"));

        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new JobluuException("INVALID_CREDENTIAL");
        }

        return user.toDto();
    }

}
