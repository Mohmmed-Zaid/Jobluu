import React from "react";
import { IconBookmark } from "@tabler/icons-react";

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
    <div className="bg-mine-shaft-900 p-3 rounded-xl text-white shadow-sm w-[17rem] h-[16rem] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:border border-yellow-400">
      {/* Header: Logo + Info + Bookmark */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <img
            src={job.logo}
            alt={job.company}
            className="w-7 h-7 object-contain"
          />
          <div>
            <h3 className="text-[13px] font-semibold leading-none">
              {job.title}
            </h3>
            <p className="text-[10px] text-gray-400">
              {job.company} • {job.level}
            </p>
          </div>
        </div>
        <IconBookmark size={16} className="text-yellow-400 cursor-pointer" />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-gray-300">
        <span className="bg-mine-shaft-800 px-2 py-[1px] rounded-full">
          {job.type}
        </span>
        <span className="bg-mine-shaft-800 px-2 py-[1px] rounded-full">
          {job.location}
        </span>
        <span className="bg-mine-shaft-800 px-2 py-[1px] rounded-full">
          {job.experience}
        </span>
      </div>

      {/* Description */}
      <p className="text-[10px] text-gray-400 mt-1 line-clamp-2 leading-tight">
        {job.description}
      </p>

      {/* Applicants & Posted Info */}
      <div className="flex justify-between text-[10px] text-gray-400 mt-1">
        <span className="text-green-400">{job.applicants} applicants</span>
        <span>{job.postedDaysAgo}d ago</span>
      </div>

      {/* Salary & Apply Button */}
      <div className="flex justify-between items-center mt-1">
        <span className="text-yellow-400 font-medium text-[11px]">
          {job.salary}
        </span>
        <button className="bg-yellow-400 text-black text-[10px] font-semibold px-2 py-[2px] rounded-full hover:bg-yellow-300 transition duration-200">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCards;















// import React from "react";
// import { IconBookmark } from "@tabler/icons-react";

// interface JobProps {
//   job: {
//     title: string;
//     company: string;
//     logo: string;
//     level: string;
//     location: string;
//     type: string;
//     experience: string;
//     salary: string;
//     description: string;
//     applicants: number;
//     postedDaysAgo: number;
//   };
// }

// const JobCards: React.FC<JobProps> = ({ job }) => {
//   return (
//     <div className="bg-mine-shaft-900 p-2 rounded-xl text-white shadow-sm w-[17rem] h-[16rem] hover:shadow-md transition flex flex-col justify-between">
//       {/* Header: Logo + Info + Bookmark */}
//       <div className="flex justify-between items-start">
//         <div className="flex items-center gap-2">
//           <img
//             src={job.logo}
//             alt={job.company}
//             className="w-7 h-7 object-contain"
//           />
//           <div>
//             <h3 className="text-[13px] font-semibold leading-none">{job.title}</h3>
//             <p className="text-[10px] text-gray-400">{job.company} • {job.level}</p>
//           </div>
//         </div>
//         <IconBookmark size={16} className="text-yellow-400 cursor-pointer" />
//       </div>

//       {/* Tags */}
//       <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-gray-300">
//         <span className="bg-mine-shaft-800 px-2 py-[1px] rounded-full">{job.type}</span>
//         <span className="bg-mine-shaft-800 px-2 py-[1px] rounded-full">{job.location}</span>
//         <span className="bg-mine-shaft-800 px-2 py-[1px] rounded-full">{job.experience}</span>
//       </div>

//       {/* Description */}
//       <p className="text-[10px] text-gray-400 mt-1 line-clamp-2 leading-tight">
//         {job.description}
//       </p>

//       {/* Applicants & Posted Info */}
//       <div className="flex justify-between text-[10px] text-gray-400 mt-1">
//         <span className="text-green-400">{job.applicants} applicants</span>
//         <span>{job.postedDaysAgo}d ago</span>
//       </div>

//       {/* Salary & Apply Button */}
//       <div className="flex justify-between items-center mt-1">
//         <span className="text-yellow-400 font-medium text-[11px]">{job.salary}</span>
//         <button className="bg-yellow-400 text-black text-[10px] font-semibold px-2 py-[2px] rounded-full hover:bg-yellow-300 transition">
//           Apply Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobCards;
