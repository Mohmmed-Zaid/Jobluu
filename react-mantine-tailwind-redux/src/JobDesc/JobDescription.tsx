import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IconMapPin,
  IconClock,
  IconCurrencyDollar,
  IconUsers,
  IconBookmark,
  IconArrowLeft,
} from "@tabler/icons-react";
import Header from "../Header/Header";
import Footer from "../footer/Footer";

const JobDescription = () => {
  const navigate = useNavigate();

  const handleApply = () => navigate("/apply-job");
  const handleBack = () => navigate("/find-jobs");

  const job = {
    title: "Senior Frontend Developer",
    company: "Google",
    logo: "/google.png",
    location: "Mountain View, CA",
    experience: "5+ years",
    salary: "$150k/year",
    type: "Full-Time",
    postedDaysAgo: 5,
    applicants: 128,
    skills: ["React", "TypeScript", "Next.js", "TailwindCSS"],
    responsibilities: [
      "Develop and maintain UI components",
      "Collaborate with design and backend teams",
      "Ensure performance and responsiveness",
    ],
    qualifications: [
      "Bachelor's degree in Computer Science",
      "Strong understanding of modern frontend frameworks",
      "Excellent debugging and optimization skills",
    ],
    about: `Google is a multinational technology company specializing in Internet-related services 
    and products, including online advertising, search engine, cloud computing, and more.`,
  };

  const recommendedJobs = [
    {
      title: "UI Engineer",
      company: "Facebook",
      logo: "Companies/facebook.png",
      location: "California",
      level: "Mid-level",
    },
    {
      title: "Backend Developer",
      company: "Apple",
      logo: "Companies/apple.png",
      location: "Texas",
      level: "Senior",
    },
    {
      title: "Product Manager",
      company: "Adobe",
      logo: "Companies/adobe.png",
      location: "Remote",
      level: "Mid-level",
    },
  ];

  return (
    <div className="bg-mine-shaft-950 text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-3 text-sm font-medium text-bright-sun-400 bg-gradient-to-r from-mine-shaft-800 to-mine-shaft-700 px-6 py-3 rounded-xl hover:from-mine-shaft-700 hover:to-mine-shaft-600 transition-all duration-300 border border-mine-shaft-600 shadow-lg hover:shadow-bright-sun-400/20 mb-8 group"
        >
          <IconArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Jobs
        </button>

        {/* Main Job Info Card */}
        <div className="bg-gradient-to-br from-mine-shaft-800 to-mine-shaft-900 rounded-2xl border border-mine-shaft-700 p-8 mb-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-mine-shaft-700 rounded-2xl flex items-center justify-center p-2 shadow-lg">
                <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-bright-sun-400 mb-2 leading-tight">
                  {job.title}
                </h1>
                <p className="text-lg text-gray-300 font-medium">{job.company}</p>
              </div>
            </div>
            <IconBookmark 
              className="text-bright-sun-400 cursor-pointer hover:text-yellow-300 transition-colors hover:scale-110" 
              size={26} 
            />
          </div>

          {/* Job Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div className="flex items-center gap-3 text-gray-300 bg-mine-shaft-700/50 p-4 rounded-xl border border-mine-shaft-600">
              <IconMapPin size={20} className="text-bright-sun-400" />
              <span className="font-medium">{job.location}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 bg-mine-shaft-700/50 p-4 rounded-xl border border-mine-shaft-600">
              <IconClock size={20} className="text-bright-sun-400" />
              <span className="font-medium">{job.experience}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 bg-mine-shaft-700/50 p-4 rounded-xl border border-mine-shaft-600">
              <IconCurrencyDollar size={20} className="text-bright-sun-400" />
              <span className="font-medium">{job.salary}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 bg-mine-shaft-700/50 p-4 rounded-xl border border-mine-shaft-600">
              <IconUsers size={20} className="text-bright-sun-400" />
              <span className="font-medium">{job.type}</span>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-mine-shaft-600">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="bg-mine-shaft-700/60 px-3 py-1.5 rounded-full">
                Posted {job.postedDaysAgo} days ago
              </span>
              <span className="bg-emerald-400/10 text-emerald-400 px-3 py-1.5 rounded-full font-medium">
                {job.applicants} applicants
              </span>
            </div>
            <button
              onClick={handleApply}
              className="bg-gradient-to-r from-bright-sun-400 to-yellow-500 text-black px-8 py-3 rounded-xl text-sm font-bold hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-bright-sun-400/30 transform hover:scale-105"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-bright-sun-400 mb-6 flex items-center gap-2">
            Required Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-mine-shaft-700 to-mine-shaft-800 border border-mine-shaft-600 px-4 py-2 text-sm rounded-xl text-bright-sun-400 font-medium hover:from-mine-shaft-600 hover:to-mine-shaft-700 transition-all duration-200 shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-bright-sun-400 mb-6">
            Recommended Jobs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedJobs.map((job, idx) => (
              <div
                key={idx}
                onClick={() => navigate("/jobs")}
                className="bg-gradient-to-br from-mine-shaft-800 to-mine-shaft-900 hover:from-mine-shaft-700 hover:to-mine-shaft-800 p-6 rounded-2xl cursor-pointer transition-all duration-300 border border-mine-shaft-600 hover:border-bright-sun-400/50 shadow-lg hover:shadow-bright-sun-400/20 transform hover:scale-105 group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-mine-shaft-700 rounded-xl flex items-center justify-center p-1 group-hover:bg-mine-shaft-600 transition-colors">
                    <img src={`/${job.logo}`} alt={job.company} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-bright-sun-400 group-hover:text-yellow-300 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {job.company} • {job.level}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 bg-mine-shaft-700/50 px-3 py-1 rounded-lg inline-block">
                  {job.location}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Information */}
        <div className="bg-gradient-to-br from-mine-shaft-900 to-mine-shaft-950 p-8 rounded-2xl border border-mine-shaft-700 shadow-2xl space-y-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-bright-sun-400 mb-4 flex items-center gap-2">
              Key Responsibilities
            </h3>
            <ul className="space-y-3">
              {job.responsibilities.map((res, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <span className="w-2 h-2 bg-bright-sun-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-base leading-relaxed">{res}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-bright-sun-400 mb-4 flex items-center gap-2">
              Qualifications & Skill Sets
            </h3>
            <ul className="space-y-3">
              {job.qualifications.map((qual, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <span className="w-2 h-2 bg-bright-sun-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-base leading-relaxed">{qual}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-bright-sun-400 mb-4 flex items-center gap-2">
              About the Company
            </h3>
            <p className="text-base text-gray-300 leading-relaxed bg-mine-shaft-800/50 p-6 rounded-xl border border-mine-shaft-600 mb-4">
              {job.about}
            </p>
            <button
              onClick={() => navigate("/company")}
              className="bg-gradient-to-r from-bright-sun-400 to-yellow-400 text-black font-semibold px-6 py-2 rounded-xl text-sm hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-bright-sun-400/30 transform hover:scale-105"
            >
              Visit Company Page
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDescription;
