package com.Cubix.Jobluu.repositories;

import com.Cubix.Jobluu.entities.OTP;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OTPRepository extends MongoRepository<OTP,String> {
}
