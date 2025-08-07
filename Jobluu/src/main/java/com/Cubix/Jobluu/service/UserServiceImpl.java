package com.Cubix.Jobluu.service;

import com.Cubix.Jobluu.controller.GoogleAuthController;
import com.Cubix.Jobluu.dto.*;
import com.Cubix.Jobluu.entities.OTP;
import com.Cubix.Jobluu.entities.User;
import com.Cubix.Jobluu.exception.JobluuException;
import com.Cubix.Jobluu.repositories.NotificationRepository;
import com.Cubix.Jobluu.repositories.OTPRepository;
import com.Cubix.Jobluu.repositories.UserRepository;
import com.Cubix.Jobluu.utility.Data;
import com.Cubix.Jobluu.utility.Utilities;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OTPRepository otpRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    @Value("${google.client-id}")
    private String googleClientId;


    @Override
    public UserDto registerUser(UserDto userDto) throws JobluuException {
        Optional<User> optional = userRepository.findByEmail(userDto.getEmail());
        if (optional.isPresent()) {
            throw new JobluuException("USER_FOUND");
        }

        userDto.setProfileId(profileService.createProfile(userDto.getEmail()).toString());
        userDto.setId(Utilities.getNextSequence("users"));
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));

        User user = userDto.toEntity();
        user = userRepository.save(user);
        return user.toDto();
    }

    @Override
    public UserDto getUserByEmail(String email) throws JobluuException {
      return userRepository.findByEmail(email).orElseThrow(()-> new JobluuException("USER_NOT_FOUND")).toDto();
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

    @Override
    public ResponseDto changePassword(LoginDto loginDto) throws JobluuException {
        String email = loginDto.getEmail();
        String newPassword = loginDto.getPassword();

        if (email == null || email.trim().isEmpty()) {
            throw new JobluuException("EMAIL_REQUIRED");
        }
        if (newPassword == null || newPassword.trim().isEmpty()) {
            throw new JobluuException("PASSWORD_REQUIRED");
        }
        if (newPassword.length() < 6) {
            throw new JobluuException("PASSWORD_TOO_SHORT");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new JobluuException("USER_NOT_FOUND"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        NotificationDTO notificication = new NotificationDTO();
        notificication.setId(user.getId());
        notificication.setMessage("Password has Reset Successfully");
        notificication.setAction("Password Reset");
        notificationService.sendNotification(notificication);
        return new ResponseDto("PASSWORD_CHANGED_SUCCESSFULLY", true);
    }

    @Override
    public Boolean sendOTP(String email) throws Exception {
        userRepository.findByEmail(email)
                .orElseThrow(() -> new JobluuException("USER_NOT_FOUND"));

        String genOtp = Utilities.generateOTP();
        OTP otp = new OTP(email, genOtp, LocalDateTime.now());
        otpRepository.save(otp);

        MimeMessage mm = mailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mm, true);
        message.setTo(email);
        message.setSubject("Verify your Jobluu Account");
        message.setText(Data.getMessageBody(email, genOtp), true);

        mailSender.send(mm);
        return true;
    }

    @Override
    public Boolean verifyOTP(String email, String otp) throws JobluuException {
        OTP otpEntity = otpRepository.findById(email)
                .orElseThrow(() -> new JobluuException("OTP_NOT_FOUND"));

        if (!otpEntity.getOtpCode().equals(otp)) {
            throw new JobluuException("OTP_INCORRECT");
        }

        return true;
    }

    @Scheduled(fixedRate = 60000)
    public void removeExpiredOTP() {
        LocalDateTime expiry = LocalDateTime.now().minusMinutes(5);
        List<OTP> expiredOTP = otpRepository.findByCreationTimeBefore(expiry);
        if (!expiredOTP.isEmpty()) {
            otpRepository.deleteAll(expiredOTP);
            System.out.println("Removed " + expiredOTP.size() + " expired OTP(s).");
        }
    }

    @Override
    public UserDto createGoogleUser(UserDto userDto) throws JobluuException {
        // Email unique check
        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new JobluuException("USER_FOUND");
        }

        // Create profile id
        userDto.setProfileId(profileService.createProfile(userDto.getEmail()).toString());
        userDto.setId(Utilities.getNextSequence("users"));

        // No password for Google users
        userDto.setPassword(""); // ensure empty; do not encode

        User saved = userRepository.save(userDto.toEntity());
        return saved.toDto();
    }

    @Override
    public UserDto updateUser(UserDto userDto) throws JobluuException {
        User existing = userRepository.findByEmail(userDto.getEmail())
                .orElseThrow(() -> new JobluuException("USER_NOT_FOUND"));

        // Update only selected fields
        if (userDto.getName() != null) existing.setName(userDto.getName());
        if (userDto.getGoogleId() != null) existing.setGoogleId(userDto.getGoogleId());
        if (userDto.getProfilePicture() != null) existing.setProfilePicture(userDto.getProfilePicture());
        if (userDto.getAccountType() != null) existing.setAccountType(userDto.getAccountType());
        // DO NOT overwrite password here

        User updated = userRepository.save(existing);
        return updated.toDto();
    }
}

