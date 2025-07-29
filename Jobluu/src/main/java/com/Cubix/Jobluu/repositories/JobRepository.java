package com.Cubix.Jobluu.repositories;

import com.Cubix.Jobluu.entities.Job;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JobRepository extends MongoRepository<Job,Long> {
}
