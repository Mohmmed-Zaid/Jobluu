package com.Cubix.Jobluu.utility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Random;

@Component
public class Utilities {

    private static MongoOperations mongoOperations;
    private static final String OTP_CHARACTERS = "0123456789";
    private static final int OTP_LENGTH = 6;
    private static final Random random = new SecureRandom();

    @Autowired
    public void setMongoOperations(MongoOperations mongoOperations) {
        Utilities.mongoOperations = mongoOperations;
    }

    public static Long getNextSequence(String collectionName) {
        Query query = new Query(Criteria.where("_id").is(collectionName));
        Update update = new Update().inc("sequence", 1);

        Counter counter = mongoOperations.findAndModify(
                query,
                update,
                Counter.class
        );

        if (counter == null) {
            counter = new Counter();
            counter.setId(collectionName);
            counter.setSequence(1L);
            mongoOperations.save(counter);
            return 1L;
        }

        return counter.getSequence();
    }

    /**
     * Generates a random OTP (One Time Password) of specified length
     * @return String OTP
     */
    public static String generateOTP() {
        StringBuilder otp = new StringBuilder(OTP_LENGTH);
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(OTP_CHARACTERS.charAt(random.nextInt(OTP_CHARACTERS.length())));
        }
        return otp.toString();
    }

    /**
     * Generates OTP with custom length
     * @param length desired length of OTP
     * @return String OTP
     */
    public static String generateOTP(int length) {
        StringBuilder otp = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            otp.append(OTP_CHARACTERS.charAt(random.nextInt(OTP_CHARACTERS.length())));
        }
        return otp.toString();
    }

    /**
     * Generates alphanumeric OTP
     * @return String alphanumeric OTP
     */
    public static String generateAlphanumericOTP() {
        String alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder otp = new StringBuilder(OTP_LENGTH);
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(alphanumeric.charAt(random.nextInt(alphanumeric.length())));
        }
        return otp.toString();
    }

    /**
     * Validates email format
     * @param email email to validate
     * @return boolean true if valid
     */
    public static boolean isValidEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email.matches(emailRegex);
    }

    /**
     * Validates phone number format
     * @param phoneNumber phone number to validate
     * @return boolean true if valid
     */
    public static boolean isValidPhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.trim().isEmpty()) {
            return false;
        }
        // Indian phone number format: 10 digits starting with 6-9
        String phoneRegex = "^[6-9]\\d{9}$";
        return phoneNumber.replaceAll("\\s+", "").matches(phoneRegex);
    }

    /**
     * Generates a random string for various purposes
     * @param length desired length
     * @return random string
     */
    public static String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder result = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            result.append(characters.charAt(random.nextInt(characters.length())));
        }
        return result.toString();
    }

    // Counter class for sequence generation
    public static class Counter {
        private String id;
        private Long sequence;

        // Getters and setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public Long getSequence() { return sequence; }
        public void setSequence(Long sequence) { this.sequence = sequence; }
    }
}