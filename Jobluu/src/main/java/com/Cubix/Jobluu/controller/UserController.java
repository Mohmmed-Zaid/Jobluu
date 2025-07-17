package com.Cubix.Jobluu.controller;

import com.Cubix.Jobluu.dto.UserDto;
import com.Cubix.Jobluu.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@Validated
@RequestMapping("api/users") //can handle all the request like get,post etc
public class UserController {

    @Autowired
    public UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody @Valid UserDto userDto){
        userDto = userService.registerUser(userDto);
        return new ResponseEntity<>(userDto, HttpStatus.CREATED);

    }
}
