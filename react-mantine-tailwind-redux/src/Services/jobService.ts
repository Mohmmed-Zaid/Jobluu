// Updated jobService.ts with proper field mapping

export interface FrontendJobDTO {
  id?: number;
  title: string;
  description: string;
  location: string;
  companyName: string;
  salary?: string;
  jobType: string;
  experienceLevel: string;
  skills: string[];
  status: 'active' | 'draft';
  logoUrl?: string;
  daysAgo?: number;
}

export interface BackendJobDTO {
  id?: number;
  jobTitle: string;
  description: string;
  location: string;
  company: string;
  packageOffered?: string;
  jobType: string;
  exprience: string; // Note: typo in backend
  skillsRequired: string[];
  companyLogo?: string;
  postTime?: string;
}

// Helper functions for field mapping
const mapToBackend = (frontendJob: FrontendJobDTO): BackendJobDTO => {
  return {
    id: frontendJob.id,
    jobTitle: frontendJob.title,
    description: frontendJob.description,
    location: frontendJob.location,
    company: frontendJob.companyName,
    packageOffered: frontendJob.salary,
    jobType: frontendJob.jobType,
    exprience: frontendJob.experienceLevel,
    skillsRequired: frontendJob.skills,
    companyLogo: frontendJob.logoUrl,
  };
};

const mapToFrontend = (backendJob: BackendJobDTO): FrontendJobDTO => {
  return {
    id: backendJob.id,
    title: backendJob.jobTitle,
    description: backendJob.description,
    location: backendJob.location,
    companyName: backendJob.company,
    salary: backendJob.packageOffered,
    jobType: backendJob.jobType,
    experienceLevel: backendJob.exprience,
    skills: backendJob.skillsRequired || [],
    status: 'active', // Default since backend doesn't have this
    logoUrl: backendJob.companyLogo,
    daysAgo: backendJob.daysAgo,
  };
};

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined' && (window as any).REACT_APP_API_BASE_URL) {
    return (window as any).REACT_APP_API_BASE_URL;
  }
  return 'http://localhost:8080';
};

class JobService {
  private baseUrl = `${getApiBaseUrl()}/jobs`;

  async getAllJobs(): Promise<FrontendJobDTO[]> {
    try {
      const response = await fetch(`${this.baseUrl}/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText}`);
      }

      const backendJobs: BackendJobDTO[] = await response.json();
      return backendJobs.map(mapToFrontend);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw new Error('Failed to fetch jobs. Please try again.');
    }
  }

  async postJob(jobData: FrontendJobDTO): Promise<FrontendJobDTO> {
    try {
      const backendJobData = mapToBackend(jobData);
      
      const response = await fetch(`${this.baseUrl}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendJobData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to create job: ${response.status} ${response.statusText}`);
      }

      const createdBackendJob: BackendJobDTO = await response.json();
      return mapToFrontend(createdBackendJob);
    } catch (error) {
      console.error('Error creating job:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to create job. Please try again.');
    }
  }

  async updateJob(jobId: number, jobData: FrontendJobDTO, logoFile?: File): Promise<FrontendJobDTO> {
    try {
      const backendJobData = mapToBackend(jobData);
      
      // For now, just use the basic update endpoint
      const response = await fetch(`${this.baseUrl}/update/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendJobData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to update job: ${response.status} ${response.statusText}`);
      }

      const updatedBackendJob: BackendJobDTO = await response.json();
      return mapToFrontend(updatedBackendJob);
    } catch (error) {
      console.error('Error updating job:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to update job. Please try again.');
    }
  }

  async deleteJob(jobId: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/delete/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to delete job: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to delete job. Please try again.');
    }
  }

  async getJobById(jobId: number): Promise<FrontendJobDTO> {
    try {
      const response = await fetch(`${this.baseUrl}/${jobId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch job: ${response.status} ${response.statusText}`);
      }

      const backendJob: BackendJobDTO = await response.json();
      return mapToFrontend(backendJob);
    } catch (error) {
      console.error('Error fetching job by ID:', error);
      throw new Error('Failed to fetch job. Please try again.');
    }
  }

  // Mock implementations for missing endpoints (until you add them to backend)
  async getJobsByStatus(status: string): Promise<FrontendJobDTO[]> {
    const allJobs = await this.getAllJobs();
    return allJobs.filter(job => job.status === status);
  }

  async searchJobs(query: string): Promise<FrontendJobDTO[]> {
    const allJobs = await this.getAllJobs();
    return allJobs.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.companyName.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase())
    );
  }

  async postJobWithLogo(jobData: FrontendJobDTO, logoFile?: File): Promise<FrontendJobDTO> {
    // For now, just post without logo until you implement the backend endpoint
    console.warn('Logo upload not implemented in backend yet');
    return this.postJob(jobData);
  }
}

export const jobService = new JobService();
export type JobDTO = FrontendJobDTO; // For backward compatibility