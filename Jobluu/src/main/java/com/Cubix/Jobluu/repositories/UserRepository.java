package com.Cubix.Jobluu.repositories;

import com.Cubix.Jobluu.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String> {

}
