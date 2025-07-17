package com.Cubix.Jobluu.service;

import com.Cubix.Jobluu.dto.UserDto;
import com.Cubix.Jobluu.entities.User;
import com.Cubix.Jobluu.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDto registerUser(UserDto userDto) {
        User user = userDto.toEntity();
        user = userRepository.save(user);
        return user.toDto();
    }
}
