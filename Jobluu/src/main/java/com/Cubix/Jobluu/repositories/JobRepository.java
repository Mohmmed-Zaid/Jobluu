package com.Cubix.Jobluu.repositories;

import com.Cubix.Jobluu.entities.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobRepository extends MongoRepository<Job,Long> {

    List<Job> findByStatus(String status);

    List<Job> findByJobTitleContainingIgnoreCaseOrCompanyContainingIgnoreCase(String jobTitle, String company);

    @Query("SELECT j FROM Job j WHERE LOWER(j.jobTitle) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(j.company) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Job> searchJobs(@Param("query") String query);
}
