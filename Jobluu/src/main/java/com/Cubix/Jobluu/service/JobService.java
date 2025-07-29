package com.Cubix.Jobluu.service;

import com.Cubix.Jobluu.dto.JobDTO;
import com.Cubix.Jobluu.exception.JobluuException;
import jakarta.validation.Valid;

import java.util.List;

public interface JobService {

   public JobDTO postJob(@Valid JobDTO jobDTO) throws JobluuException;

   List<JobDTO> getAllJobs();

   JobDTO getJobById(Long id) throws JobluuException;

}
