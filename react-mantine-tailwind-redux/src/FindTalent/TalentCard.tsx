import React from "react";
import { IconUserScan, IconMail } from "@tabler/icons-react"; // Using user and mail icons

// Interface to define the structure of a single talent profile.
interface TalentProps {
  talent: {
    id: number; // Unique identifier for the talent
    avatar: string; // URL for the talent's avatar image
    name: string; // Name of the talent
    title: string; // Professional title or role of the talent
    skills: string[]; // Array of main skills
    description: string; // Short description or bio
    expectedSalary: string; // Expected salary range
    location: string; // Talent's location
    experienceLevel: string; // Experience level (e.g., "Mid-level", "Senior")
  };
}

/**
 * TalentCard component: Displays a single talent profile in a card format.
 * It's designed to be visually similar to JobCards but adapted for talent information.
 */
const TalentCard: React.FC<TalentProps> = ({ talent }) => {
  return (
    // Card container with dark background, padding, rounded corners, and shadow.
    // Adds hover effects for scale, shadow, and border to make it interactive.
    <div className="bg-mine-shaft-900 p-3 rounded-xl text-white shadow-sm w-[17rem] h-[16rem] flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:border border-yellow-400">
      {/* Header section: Avatar + Name/Title + Connect Icon */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {/* Talent Avatar */}
          <img
            src={talent.avatar}
            alt={talent.name}
            className="w-9 h-9 rounded-full object-cover border border-gray-600" // Larger, rounded avatar
            // Fallback for broken image or if avatar is not available
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/36x36/4f4f4f/ffffff?text=AV";
            }}
          />
          <div>
            {/* Talent Name */}
            <h3 className="text-[14px] font-semibold leading-none">
              {talent.name}
            </h3>
            {/* Talent Title and Experience Level */}
            <p className="text-[11px] text-gray-400">
              {talent.title} • {talent.experienceLevel}
            </p>
          </div>
        </div>
        {/* Icon to indicate connection or favorite (e.g., a "connect" or "message" icon) */}
        <IconMail size={18} className="text-yellow-400 cursor-pointer" />
      </div>

      {/* Skills Tags */}
      <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-gray-300">
        {/* Map through the first 4 skills to display them as tags. */}
        {talent.skills.slice(0, 4).map((skill, index) => (
          <span key={index} className="bg-mine-shaft-800 px-2 py-[1px] rounded-full">
            {skill}
          </span>
        ))}
        {/* If there are more than 4 skills, indicate with "+X more" */}
        {talent.skills.length > 4 && (
          <span className="bg-mine-shaft-800 px-2 py-[1px] rounded-full">
            +{talent.skills.length - 4} more
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-[10px] text-gray-400 mt-1 line-clamp-3 leading-tight">
        {talent.description}
      </p>

      {/* Location & Expected Salary */}
      <div className="flex justify-between text-[10px] text-gray-400 mt-1">
        <span className="text-green-400">{talent.location}</span>
        <span className="text-yellow-400 font-medium text-[11px]">
          {talent.expectedSalary}
        </span>
      </div>

      {/* View Profile Button */}
      <div className="flex justify-center items-center mt-2">
        <button className="bg-yellow-400 text-black text-[10px] font-semibold px-3 py-[4px] rounded-full hover:bg-yellow-300 transition duration-200 w-full">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default TalentCard;

