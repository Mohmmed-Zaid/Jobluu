package com.Cubix.Jobluu.service;

import com.Cubix.Jobluu.dto.JobDTO;
import com.Cubix.Jobluu.entities.Job;
import com.Cubix.Jobluu.exception.JobluuException;
import com.Cubix.Jobluu.repositories.JobRepository;
import com.Cubix.Jobluu.utility.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobServiceImpl implements JobService{

    @Autowired
    private JobRepository jobRepository;


    @Override
    public JobDTO postJob(JobDTO jobDTO) throws JobluuException {
        jobDTO.setId(Utilities.getNextSequence("jobs"));
        jobDTO.setPostTime(LocalDateTime.now());
        return jobRepository.save(jobDTO.toEntity()).toDTO();
    }

    @Override
    public List<JobDTO> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(Job::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public JobDTO getJobById(Long id) throws JobluuException {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new JobluuException("JOB_NOT_FOUND"));
        return job.toDTO();
    }



}
