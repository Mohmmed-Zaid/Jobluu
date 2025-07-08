import React from "react";
import Sort from "./Sort";
import JobCards from "./JobCards";
import JobData from "../Landingpage/Data/JobData"; // adjust path if different

const Jobs = () => {
  return (
    <div className="px-6 py-8 text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recommended Jobs</h2>
        <Sort />
      </div>

      <div className="flex flex-wrap gap-4 justify-start">
        {JobData.map((job) => (
          <JobCards key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
