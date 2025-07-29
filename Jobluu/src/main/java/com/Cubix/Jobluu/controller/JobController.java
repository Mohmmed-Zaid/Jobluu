package com.Cubix.Jobluu.controller;

import com.Cubix.Jobluu.dto.JobDTO;
import com.Cubix.Jobluu.exception.JobluuException;
import com.Cubix.Jobluu.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping("/post")
    public ResponseEntity<JobDTO> postDTO(@RequestBody @Valid JobDTO jobDTO) throws JobluuException{
        return new ResponseEntity<>(jobService.postJob(jobDTO), HttpStatus.CREATED);
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<JobDTO>> getAllJobs() {
        List<JobDTO> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }
    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJobById(@PathVariable Long id) throws JobluuException {
        JobDTO job = jobService.getJobById(id);
        return ResponseEntity.ok(job);
    }


}
