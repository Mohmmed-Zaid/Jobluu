package com.Cubix.Jobluu.entities;

import com.Cubix.Jobluu.dto.Applicant;
import com.Cubix.Jobluu.dto.JobDTO;
import com.Cubix.Jobluu.dto.JobStatus;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "jobs")
public class Job {
    private Long id;
    private String jobTitle;
    private String company;
    private String companyLogo;
    private List<Applicant> applicant;
    private String about;
    private String exprience;
    private String jobType;
    private String location;
    private Long packageOffered;
    private LocalDateTime postTime;
    private String Description;
    private List<String> skillsRequired;
    private JobStatus jobStatus;

    public JobDTO toDTO() {
        return new JobDTO(
                this.id,
                this.jobTitle,
                this.company,
                this.companyLogo,
                this.applicant,
                this.about,
                this.exprience,
                this.jobType,
                this.location,
                this.packageOffered,
                this.postTime,
                this.Description,
                this.skillsRequired,
                this.jobStatus
        );
    }
}
