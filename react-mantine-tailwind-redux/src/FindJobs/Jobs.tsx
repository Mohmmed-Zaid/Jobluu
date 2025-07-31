import React from "react";
import JobCards from "./JobCards";
import Sort from "./Sort";
import { Job, JobFilters } from "../Pages/FindJob";
import { Loader, Text } from "@mantine/core";

interface JobsProps {
  jobs: Job[];
  loading: boolean;
  filters: JobFilters;
  updateFilters: (filters: Partial<JobFilters>) => void;
}

const Jobs: React.FC<JobsProps> = ({ jobs, loading, filters, updateFilters }) => {
  const [sortBy, setSortBy] = React.useState("Relevance");

  // Sort jobs based on selected option
  const sortJobs = (jobs: Job[], sortBy: string) => {
    const sorted = [...jobs];
    
    switch (sortBy) {
      case "Most Recent":
        return sorted.sort((a, b) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime());
      case "Salary (Low to High)":
        return sorted.sort((a, b) => a.packageOffered - b.packageOffered);
      case "Salary (High to Low)":
        return sorted.sort((a, b) => b.packageOffered - a.packageOffered);
      default:
        return sorted; // Relevance - keep original order
    }
  };

  const sortedJobs = sortJobs(jobs, sortBy);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader color="yellow" size="lg" />
        <Text className="ml-4 text-white">Loading jobs...</Text>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      {/* Header with sort */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-2xl font-bold">
          {jobs.length} Jobs Found
        </h2>
        <Sort sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      {/* Job Cards */}
      {sortedJobs.length === 0 ? (
        <div className="text-center py-20">
          <Text className="text-slate-400 text-lg">
            No jobs found matching your criteria
          </Text>
          <Text className="text-slate-500 text-sm mt-2">
            Try adjusting your filters or search terms
          </Text>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedJobs.map((job) => (
            <JobCards key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
