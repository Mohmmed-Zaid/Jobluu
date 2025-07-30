package com.Cubix.Jobluu.dto;

import com.Cubix.Jobluu.entities.Job;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobDTO {

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
    private String description;
    private List<String> skillsRequired;
    private JobStatus jobStatus;

    public Job toEntity() {
        return new Job(
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
                this.description,
                this.skillsRequired,
                this.jobStatus
        );
    }
}
