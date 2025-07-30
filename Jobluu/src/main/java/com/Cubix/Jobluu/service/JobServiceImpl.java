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
import java.util.Optional;
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

    @Override
    public JobDTO updateJob(Long id, JobDTO updatedJob) throws JobluuException {
        Optional<Job> existingJobOptional = jobRepository.findById(id);
        if (existingJobOptional.isEmpty()) {
            throw new JobluuException("Job not found with id: " + id);
        }

        Job existingJob = (existingJobOptional).get();

        existingJob.setJobTitle(updatedJob.getJobTitle());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setCompany(updatedJob.getCompany());
        existingJob.setCompanyLogo(updatedJob.getCompanyLogo());
        existingJob.setExprience(updatedJob.getExprience());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setPackageOffered(updatedJob.getPackageOffered());
        existingJob.setJobType(updatedJob.getJobType());
        existingJob.setSkillsRequired(updatedJob.getSkillsRequired());
        existingJob.setPostTime(LocalDateTime.now());

        return jobRepository.save(existingJob).toDTO();
    }

    @Override
    public void deleteJobById(Long id) throws JobluuException {
        if (!jobRepository.existsById(id)) {
            throw new JobluuException("Job not found with ID: " + id);
        }
        jobRepository.deleteById(id);
    }

    @Override
    public List<JobDTO> getJobsByStatus(String status) {
        // You'll need to add this method to your repository
        return jobRepository.findByStatus(status)
                .stream()
                .map(Job::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobDTO> searchJobs(String query) {
        // You'll need to add this method to your repository
        return jobRepository.findByJobTitleContainingIgnoreCaseOrCompanyContainingIgnoreCase(query, query)
                .stream()
                .map(Job::toDTO)
                .collect(Collectors.toList());
    }
}
