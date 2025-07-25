package com.Cubix.Jobluu.service;

import com.Cubix.Jobluu.dto.LoginDto;
import com.Cubix.Jobluu.dto.ResponseDto;
import com.Cubix.Jobluu.dto.UserDto;
import com.Cubix.Jobluu.entities.OTP;
import com.Cubix.Jobluu.entities.User;
import com.Cubix.Jobluu.exception.JobluuException;
import com.Cubix.Jobluu.repositories.OTPRepository;
import com.Cubix.Jobluu.repositories.UserRepository;
import com.Cubix.Jobluu.utility.Data;
import com.Cubix.Jobluu.utility.Utilities;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
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
}
