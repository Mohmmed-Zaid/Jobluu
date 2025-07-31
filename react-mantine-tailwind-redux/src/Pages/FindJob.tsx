import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../footer/Footer";
import SearchBar from "../FindJobs/SearchBar";
import Jobs from "../FindJobs/Jobs";

export interface JobFilters {
  searchQuery: string;
  location: string;
  jobType: string;
  experience: string;
  salaryRange: [number, number];
  company: string;
  skills: string[];
}

export interface Job {
  id: number;
  jobTitle: string;
  company: string;
  companyLogo: string;
  location: string;
  jobType: string;
  experience: string;
  packageOffered: number;
  description: string;
  skillsRequired: string[];
  applicants: number;
  postTime: string;
  jobStatus: string;
}

const FindJob = () => {
  // API Configuration - Update this with your backend URL
  const API_BASE_URL = 'http://localhost:8080'; // Change this to your backend URL
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<JobFilters>({
    searchQuery: "",
    location: "",
    jobType: "",
    experience: "",
    salaryRange: [0, 100],
    company: "",
    skills: []
  });

  // Fetch jobs from API
  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Try different possible API endpoints
      const possibleUrls = [
        `${API_BASE_URL}/jobs/getAll`,
        '/api/jobs/getAll',
        '/jobs/getAll',
        `${API_BASE_URL}/api/jobs/getAll`
      ];

      let response;
      let success = false;

      for (const url of possibleUrls) {
        try {
          response = await fetch(url);
          if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const data = await response.json();
              setJobs(data);
              setFilteredJobs(data);
              success = true;
              console.log(`Successfully fetched ${data.length} jobs from ${url}`);
              break;
            }
          }
        } catch (err) {
          console.log(`Failed to fetch from ${url}:`, err.message);
          continue;
        }
      }

      if (!success) {
        console.warn('Could not fetch jobs from any endpoint. Using mock data.');
        // Use mock data for development
        const mockJobs = generateMockJobs();
        setJobs(mockJobs);
        setFilteredJobs(mockJobs);
      }

    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Fallback to mock data
      const mockJobs = generateMockJobs();
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
    } finally {
      setLoading(false);
    }
  };

  // Generate mock jobs for development/testing
  const generateMockJobs = (): Job[] => {
    return [
      {
        id: 1,
        jobTitle: "Frontend Developer",
        company: "TechCorp",
        companyLogo: "https://via.placeholder.com/40x40/facc15/000000?text=TC",
        location: "Mumbai, Maharashtra",
        jobType: "Full-time",
        experience: "2-4 years",
        packageOffered: 800000,
        description: "We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for building user-friendly web applications using modern technologies.",
        skillsRequired: ["React", "JavaScript", "TypeScript", "CSS"],
        applicants: 25,
        postTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        jobStatus: "ACTIVE"
      },
      {
        id: 2,
        jobTitle: "Backend Developer",
        company: "DataSoft",
        companyLogo: "https://via.placeholder.com/40x40/facc15/000000?text=DS",
        location: "Pune, Maharashtra",
        jobType: "Full-time",
        experience: "3-5 years",
        packageOffered: 1200000,
        description: "Join our backend team to build scalable APIs and microservices. Experience with Java and Spring Boot required.",
        skillsRequired: ["Java", "Spring Boot", "MongoDB", "REST API"],
        applicants: 18,
        postTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        jobStatus: "ACTIVE"
      },
      {
        id: 3,
        jobTitle: "Full Stack Developer",
        company: "Innovation Labs",
        companyLogo: "https://via.placeholder.com/40x40/facc15/000000?text=IL",
        location: "Bangalore, Karnataka",
        jobType: "Full-time",
        experience: "1-3 years",
        packageOffered: 900000,
        description: "Looking for a full-stack developer to work on cutting-edge projects. Must have experience with both frontend and backend technologies.",
        skillsRequired: ["React", "Node.js", "MongoDB", "Express"],
        applicants: 42,
        postTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        jobStatus: "ACTIVE"
      },
      {
        id: 4,
        jobTitle: "DevOps Engineer",
        company: "CloudTech",
        companyLogo: "https://via.placeholder.com/40x40/facc15/000000?text=CT",
        location: "Hyderabad, Telangana",
        jobType: "Full-time",
        experience: "2-5 years",
        packageOffered: 1500000,
        description: "We need a DevOps engineer to manage our cloud infrastructure and CI/CD pipelines. AWS experience preferred.",
        skillsRequired: ["AWS", "Docker", "Kubernetes", "Jenkins"],
        applicants: 12,
        postTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        jobStatus: "ACTIVE"
      },
      {
        id: 5,
        jobTitle: "UI/UX Designer",
        company: "DesignStudio",
        companyLogo: "https://via.placeholder.com/40x40/facc15/000000?text=DS",
        location: "Delhi, NCR",
        jobType: "Contract",
        experience: "1-2 years",
        packageOffered: 600000,
        description: "Creative UI/UX designer needed to create beautiful and intuitive user interfaces. Portfolio review required.",
        skillsRequired: ["Figma", "Adobe XD", "Photoshop", "User Research"],
        applicants: 35,
        postTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        jobStatus: "ACTIVE"
      },
      {
        id: 6,
        jobTitle: "Data Scientist",
        company: "AI Solutions",
        companyLogo: "https://via.placeholder.com/40x40/facc15/000000?text=AI",
        location: "Chennai, Tamil Nadu",
        jobType: "Full-time",
        experience: "3-6 years",
        packageOffered: 1800000,
        description: "Data scientist role focusing on machine learning and predictive analytics. PhD preferred but not required.",
        skillsRequired: ["Python", "Machine Learning", "TensorFlow", "SQL"],
        applicants: 8,
        postTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        jobStatus: "ACTIVE"
      }
    ];
  };

  // Filter jobs based on current filters
  const filterJobs = () => {
    let filtered = [...jobs];

    // Search query filter
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(job =>
        job.jobTitle.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.skillsRequired.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Job type filter
    if (filters.jobType) {
      filtered = filtered.filter(job =>
        job.jobType.toLowerCase() === filters.jobType.toLowerCase()
      );
    }

    // Experience filter
    if (filters.experience) {
      filtered = filtered.filter(job =>
        job.experience.toLowerCase().includes(filters.experience.toLowerCase())
      );
    }

    // Company filter
    if (filters.company) {
      filtered = filtered.filter(job =>
        job.company.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    // Salary range filter
    filtered = filtered.filter(job => {
      const salary = job.packageOffered / 100000; // Convert to lakhs
      return salary >= filters.salaryRange[0] && salary <= filters.salaryRange[1];
    });

    // Skills filter
    if (filters.skills.length > 0) {
      filtered = filtered.filter(job =>
        filters.skills.some(skill =>
          job.skillsRequired.some(jobSkill =>
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    setFilteredJobs(filtered);
  };

  // Update filters
  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      location: "",
      jobType: "",
      experience: "",
      salaryRange: [0, 100],
      company: "",
      skills: []
    });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [filters, jobs]);

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-poppins">
      <Header />
      <SearchBar 
        filters={filters}
        updateFilters={updateFilters}
        clearFilters={clearFilters}
        jobCount={filteredJobs.length}
      />
      <Jobs 
        jobs={filteredJobs}
        loading={loading}  
        filters={filters}
        updateFilters={updateFilters}
      />
      <Footer />
    </div>
  );
};

export default FindJob;
