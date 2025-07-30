// services/jobService.ts
export interface JobDTO {
  id?: number;
  title: string;
  location: string;
  status: 'active' | 'draft' | 'archived';
  skills: string[];
  description?: string;
  experienceLevel?: string;
  salary?: string;
  jobType?: string;
  companyName?: string;
  daysAgo?: number;
}

const API_BASE_URL = 'http://localhost:8080'; // Adjust this to your backend URL

class JobService {
  private getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      // Add authorization headers if needed
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
  }

  async postJob(jobData: JobDTO): Promise<JobDTO> {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/post`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error posting job:', error);
      throw new Error('Failed to post job. Please try again.');
    }
  }

  async getAllJobs(): Promise<JobDTO[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/getAll`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw new Error('Failed to fetch jobs. Please try again.');
    }
  }

  async getJobById(id: number): Promise<JobDTO> {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching job:', error);
      throw new Error('Failed to fetch job details. Please try again.');
    }
  }

  // Additional utility methods for frontend
  async updateJob(id: number, jobData: JobDTO): Promise<JobDTO> {
    // For now, we'll simulate an update since your backend doesn't have PUT endpoint
    // You can add PUT endpoint to your backend later
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return { ...jobData, id };
    } catch (error) {
      console.error('Error updating job:', error);
      throw new Error('Failed to update job. Please try again.');
    }
  }

  async deleteJob(id: number): Promise<void> {
    // For now, we'll simulate a delete since your backend doesn't have DELETE endpoint
    // You can add DELETE endpoint to your backend later
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`Job ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting job:', error);
      throw new Error('Failed to delete job. Please try again.');
    }
  }
}

export const jobService = new JobService();