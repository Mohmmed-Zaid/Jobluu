import React from "react";
import { IconBookmark } from "@tabler/icons-react";
import { Link } from "react-router-dom";

interface JobProps {
  job: {
    title: string;
    company: string;
    logo: string;
    level: string;
    location: string;
    type: string;
    experience: string;
    salary: string;
    description: string;
    applicants: number;
    postedDaysAgo: number;
  };
}

const JobCards: React.FC<JobProps> = ({ job }) => {
  return (
    <Link to="/jobs" className="block">
      <div className="bg-gradient-to-br bg-mine-shaft-950 to-slate-800 p-4 rounded-2xl text-white shadow-lg w-80 h-72 flex flex-col justify-between transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-yellow-400/20 border border-slate-700 hover:border-yellow-400/50 group">
        
        {/* Header: Logo + Info + Bookmark */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center p-1 group-hover:bg-slate-600 transition-colors">
              <img
                src={job.logo}
                alt={job.company}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-tight text-white group-hover:text-yellow-400 transition-colors">
                {job.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {job.company} • {job.level}
              </p>
            </div>
          </div>
          <IconBookmark 
            size={18} 
            className="text-slate-400 hover:text-yellow-400 cursor-pointer transition-colors duration-200 hover:scale-110" 
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-slate-700/60 text-slate-300 px-2.5 py-1 rounded-full text-xs font-medium border border-slate-600">
            {job.type}
          </span>
          <span className="bg-slate-700/60 text-slate-300 px-2.5 py-1 rounded-full text-xs font-medium border border-slate-600">
            {job.location}
          </span>
          <span className="bg-slate-700/60 text-slate-300 px-2.5 py-1 rounded-full text-xs font-medium border border-slate-600">
            {job.experience}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 mb-3 line-clamp-3 leading-relaxed flex-grow">
          {job.description}
        </p>

        {/* Applicants & Posted Info */}
        <div className="flex justify-between items-center text-xs mb-3 pb-3 border-b border-slate-700">
          <span className="text-emerald-400 font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
            {job.applicants} applicants
          </span>
          <span className="text-slate-400">
            {job.postedDaysAgo}d ago
          </span>
        </div>

        {/* Salary & Apply Button */}
        <div className="flex justify-between items-center">
          <span className="text-yellow-400 font-bold text-sm bg-yellow-400/10 px-3 py-1.5 rounded-full">
            {job.salary}
          </span>
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-bold px-4 py-2 rounded-full hover:from-yellow-300 hover:to-yellow-400 transition-all duration-200 shadow-lg hover:shadow-yellow-400/30 transform hover:scale-105">
            Apply Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default JobCards;






















