import React, { useState } from "react";
import {
  IconMapPin,
  IconBriefcase,
  IconCurrencyDollar,
  IconBolt,
  IconMail,
  IconStar,
  IconX, // For closing the modal
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom"; // Assuming you have react-router-dom installed
import Footer from "../footer/Footer"; // Your imported Footer component
import Header from "../Header/Header"; // Your imported Header component


// TalentCard component as provided by you, now with onLike prop
interface TalentProps {
  talent: {
    id: number;
    avatar: string;
    name: string;
    title: string;
    skills: string[];
    description: string;
    expectedSalary: string;
    location: string;
    experienceLevel: string;
  };
  onLike: (talentId: number) => void;
}


const TalentCard: React.FC<TalentProps> = ({ talent, onLike }) => {
  const navigate = useNavigate();

  return (
    <div className="group relative bg-mine-shaft-900 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-white shadow-xl w-[17rem] sm:w-[18rem] h-[16rem] sm:h-[18rem] flex flex-col justify-between transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20 border border-slate-700 hover:border-yellow-400/50 backdrop-blur-sm">

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-yellow-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header Section */}
      <div className="relative z-10 flex justify-between items-start">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <img
              src={talent.avatar}
              alt={talent.name}
              className="w-9 h-9 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-slate-600 group-hover:border-yellow-400 transition-colors duration-300 shadow-lg"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/48x48/4f4f4f/ffffff?text=AV";
              }}
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-mine-shaft-900 animate-pulse" />
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-bold leading-tight text-white group-hover:text-yellow-400 transition-colors duration-300">
              {talent.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
              {talent.title}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <IconStar size={10} className="sm:hidden text-yellow-400" />
              <IconStar size={12} className="hidden sm:block text-yellow-400" />
              <span className="text-xs text-slate-400">{talent.experienceLevel}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <IconMail
            size={18}
            className="sm:hidden text-yellow-400 cursor-pointer hover:text-yellow-300 transition-all duration-300 hover:scale-110 drop-shadow-lg"
          />
          <IconMail
            size={20}
            className="hidden sm:block text-yellow-400 cursor-pointer hover:text-yellow-300 transition-all duration-300 hover:scale-110 drop-shadow-lg"
          />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Skills Section */}
      <div className="relative z-10 flex flex-wrap gap-1 sm:gap-1.5 mt-2 sm:mt-3 min-h-[24px]">
        {talent.skills.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="bg-mine-shaft-800 hover:bg-slate-600/70 px-2 sm:px-2.5 py-1 rounded-full text-xs text-slate-300 hover:text-white transition-all duration-300 backdrop-blur-sm border border-slate-600/50 hover:border-yellow-400/50"
          >
            {skill}
          </span>
        ))}
        {talent.skills.length > 4 && (
          <span className="bg-yellow-400/20 text-yellow-400 px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium border border-yellow-400/30">
            +{talent.skills.length - 4} more
          </span>
        )}
      </div>

      {/* Description */}
      <div className="relative z-10 flex-1 mt-2 sm:mt-3">
        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed overflow-hidden">
          {talent.description}
        </p>
      </div>

      {/* Location and Salary */}
      <div className="relative z-10 flex justify-between items-center mt-2 sm:mt-3 p-2 bg-mine-shaft-800/50 rounded-lg backdrop-blur-sm border border-slate-700/50">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <IconMapPin size={12} className="sm:hidden text-emerald-400" />
          <IconMapPin size={14} className="hidden sm:block text-emerald-400" />
          <span className="text-xs text-emerald-400 font-medium">{talent.location}</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5">
          <IconCurrencyDollar size={12} className="sm:hidden text-yellow-400" />
          <IconCurrencyDollar size={14} className="hidden sm:block text-yellow-400" />
          <span className="text-xs text-yellow-400 font-bold">
            {talent.expectedSalary}
          </span>
        </div>
      </div>

      {/* View Profile and Like Button */}
      <div className="relative z-10 mt-2 sm:mt-3 flex gap-2">
        <button
          onClick={() => navigate("/talent-profile")}
          className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30 active:scale-95 transform"
        >
          View Profile
        </button>
        <button
          onClick={() => onLike(talent.id)}
          className="p-2 bg-slate-700 hover:bg-red-500 rounded-xl transition-colors duration-300"
          title="Like Talent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};


// Sample data for jobs (with added 'status' and 'skills' for functionality)
const postedJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "San Francisco, USA",
    daysAgo: 5,
    status: "active",
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Backend Engineer",
    location: "London, UK",
    daysAgo: 2,
    status: "active",
    skills: ["Node.js", "Python", "MongoDB", "Express", "REST APIs"],
  },
  {
    id: 3,
    title: "Full Stack Developer",
    location: "Sydney, Australia",
    daysAgo: 4,
    status: "active",
    skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
  },
  {
    id: 4,
    title: "UI/UX Designer",
    location: "Toronto, Canada",
    daysAgo: 1,
    status: "draft",
    skills: ["Figma", "Sketch", "Adobe XD", "User Research", "Prototyping"],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    location: "Berlin, Germany",
    daysAgo: 3,
    status: "active",
    skills: ["Docker", "Kubernetes", "CI/CD", "Ansible", "Terraform"],
  },
  {
    id: 6,
    title: "Software Engineer",
    location: "Pune, India",
    daysAgo: 1,
    status: "active",
    skills: ["Java", "Spring Boot", "Microservices", "SQL", "Kafka"],
  },
  {
    id: 7,
    title: "DevOps ",
    location: "Berlin, Germany",
    daysAgo: 8,
    status: "archived", // Example of another status, though not filtered by buttons
    skills: ["Linux", "Bash", "Networking", "Cloud Security"],
  },
  {
    id: 8,
    title: " Java Developer",
    location: "Berlin, Germany",
    daysAgo: 1,
    status: "active",
    skills: ["Java", "Spring", "Hibernate", "JPA"],
  },
  {
    id: 9,
    title: "Java Fresher",
    location: "Pune,India",
    daysAgo: 1,
    status: "draft",
    skills: ["Java", "OOP", "Data Structures", "Algorithms"],
  },
];

// Sample data for applicants
const allApplicants = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Alice Johnson",
    title: "Frontend Developer",
    skills: ["React", "JavaScript", "HTML", "CSS", "Next.js", "Tailwind CSS"],
    description: "Highly motivated frontend developer with 5 years of experience building responsive and user-friendly web applications. Proficient in modern JavaScript frameworks and libraries.",
    expectedSalary: "$90,000",
    location: "San Francisco, USA",
    experienceLevel: "Mid-level",
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Bob Williams",
    title: "Backend Engineer",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs", "AWS Lambda"],
    description: "Experienced backend engineer specializing in scalable API development and database management. Passionate about creating efficient and secure server-side solutions.",
    expectedSalary: "$95,000",
    location: "London, UK",
    experienceLevel: "Senior",
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    name: "Charlie Brown",
    title: "Full Stack Developer",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "Kubernetes"],
    description: "Versatile full stack developer with a strong understanding of both frontend and backend technologies. Enjoys tackling complex problems and delivering end-to-end solutions.",
    expectedSalary: "$100,000",
    location: "Sydney, Australia",
    experienceLevel: "Expert",
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/women/62.jpg",
    name: "Diana Miller",
    title: "UI/UX Designer",
    skills: ["Figma", "Sketch", "User Research", "Wireframing", "Prototyping", "Usability Testing"],
    description: "Creative UI/UX designer focused on crafting intuitive and aesthetically pleasing user experiences. Committed to user-centered design principles.",
    expectedSalary: "$80,000",
    location: "Toronto, Canada",
    experienceLevel: "Mid-level",
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
    name: "Eve Davis",
    title: "DevOps Engineer",
    skills: ["AWS", "Terraform", "Jenkins", "Linux", "Python Scripting"],
    description: "Results-driven DevOps engineer with a knack for automating infrastructure and streamlining deployment pipelines. Strong advocate for continuous integration and delivery.",
    expectedSalary: "$110,000",
    location: "Berlin, Germany",
    experienceLevel: "Senior",
  },
];

// Sample data for invited applicants (subset of allApplicants)
const invitedApplicants = [
  allApplicants[0], // Alice Johnson
  allApplicants[2], // Charlie Brown
];


const PostedJobPage = () => {
  const navigate = useNavigate();
  // State to manage which tab is active (Overview, Applicants, Invited)
  const [activeTab, setActiveTab] = useState("overview");
  // State to manage which job is currently selected in the left sidebar
  // Initialize with the first job from the list
  const [activeJob, setActiveJob] = useState(postedJobs[0]);
  // State to filter jobs by status (Active, Drafts)
  const [filterStatus, setFilterStatus] = useState("active");
  // State to control the visibility of the scheduling modal
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  // States to store selected date and time for scheduling
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  // State to store the applicant for whom the interview is being scheduled
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Filter jobs based on the selected status
  const filteredJobs = postedJobs.filter(job => {
    // Only show 'active' jobs if filterStatus is 'active'
    if (filterStatus === "active") {
      return job.status === "active";
    }
    // Only show 'draft' jobs if filterStatus is 'draft'
    else if (filterStatus === "draft") {
      return job.status === "draft";
    }
    // This case should ideally not be reached with the current button setup
    return true;
  });

  // Handler for the 'Like' button on TalentCard
  const handleLikeTalent = (talentId: number) => {
    console.log(`Liked talent with ID: ${talentId}`);
    // In a real application, you would send this to a backend API
    // or update a global state/context. For this example, we'll use an alert.
    alert(`You liked talent ID: ${talentId}`);
  };

  // Function to open the scheduling modal for a specific applicant
  const openScheduleModal = (applicant: any) => {
    setSelectedApplicant(applicant); // Store the applicant data
    setShowScheduleModal(true); // Show the modal
  };

  // Function to close the scheduling modal and reset its states
  const closeScheduleModal = () => {
    setShowScheduleModal(false);
    setSelectedDate(""); // Clear selected date
    setSelectedTime(""); // Clear selected time
    setSelectedApplicant(null); // Clear selected applicant
  };

  // Handler for submitting the schedule form
  const handleScheduleSubmit = () => {
    if (selectedDate && selectedTime && selectedApplicant) {
      console.log(`Scheduling interview for ${selectedApplicant.name} on ${selectedDate} at ${selectedTime}`);
      // In a real application, you would send this data to your backend
      alert(`Interview scheduled for ${selectedApplicant.name} on ${selectedDate} at ${selectedTime}`);
      closeScheduleModal(); // Close modal after submission
    } else {
      alert("Please select a date and time."); // User feedback for incomplete form
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-mine-shaft-950 text-white">
      {/* Header Component - Placed here as requested */}
      <Header />
      <div className="flex flex-1 p-4 md:p-8 lg:p-10 border-4 border-yellow-500/20 rounded-2xl m-4 md:m-8 lg:m-10 shadow-lg shadow-yellow-500/10">
        {/* Left Job List Sidebar */}
        <aside className="w-72 border-r-2 border-slate-700/50 p-5 overflow-y-auto rounded-l-xl">
          <h2 className="text-lg font-bold text-yellow-400 mb-4">Jobs</h2>
          <div className="flex gap-3 mb-4">
            {/* Button to filter active jobs */}
            <button
              onClick={() => setFilterStatus("active")}
              className={`text-sm font-semibold px-3 py-1.5 rounded-md transition-all duration-300 ${
                filterStatus === "active"
                  ? "text-black bg-yellow-400 shadow-md shadow-yellow-400/30" // Active state styling
                  : "text-slate-400 border border-slate-700 hover:border-yellow-400 hover:text-white" // Inactive state styling
              }`}
            >
              Active [{postedJobs.filter(job => job.status === "active").length}]
            </button>
            {/* Button to filter draft jobs */}
            <button
              onClick={() => setFilterStatus("draft")}
              className={`text-sm font-semibold px-3 py-1.5 rounded-md transition-all duration-300 ${
                filterStatus === "draft"
                  ? "text-black bg-yellow-400 shadow-md shadow-yellow-400/30" // Active state styling
                  : "text-slate-400 border border-slate-700 hover:border-yellow-400 hover:text-white" // Inactive state styling
              }`}
            >
              Drafts [{postedJobs.filter(job => job.status === "draft").length}]
            </button>
          </div>
          <div className="space-y-3">
            {/* Map through filtered jobs to display them */}
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setActiveJob(job)} // Set the active job on click
                className={`bg-mine-shaft-900 hover:border-yellow-400/50 border ${
                  activeJob.id === job.id ? "border-yellow-400 shadow-lg shadow-yellow-400/10" : "border-slate-700" // Highlight active job
                } p-3 rounded-xl cursor-pointer transition-all duration-200`}
              >
                <h3 className="font-semibold text-white text-sm">{job.title}</h3>
                <p className="text-xs text-slate-400">{job.location}</p>
                <p className="text-xs text-slate-500">{job.daysAgo} days ago</p>
              </div>
            ))}
          </div>
        </aside>

        {/* Center Job Detail / Applicants / Invited Section */}
        <main className="flex-1 p-10 overflow-y-auto bg-mine-shaft-950 rounded-r-xl">
          <div className="mb-6 pb-4 border-b-2 border-slate-700/50">
            <h1 className="text-3xl font-bold text-white">
              {activeJob.title}{" "}
              {/* Display job status as a badge */}
              <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded ml-2 shadow-sm">
                {activeJob.status.toUpperCase()}
              </span>
            </h1>
            <p className="text-slate-400 mt-1">{activeJob.location}</p>
          </div>

          {/* Tabs for Overview, Applicants, Invited */}
          <div className="flex gap-6 border-b border-slate-700 mb-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-2 px-1 font-semibold transition-colors duration-300 ${
                activeTab === "overview"
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("applicants")}
              className={`py-2 px-1 font-semibold transition-colors duration-300 ${
                activeTab === "applicants"
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Applicants [{allApplicants.length}]
            </button>
            <button
              onClick={() => setActiveTab("invited")}
              className={`py-2 px-1 font-semibold transition-colors duration-300 ${
                activeTab === "invited"
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Invited [{invitedApplicants.length}]
            </button>
          </div>

          {/* Conditional rendering based on activeTab */}
          {activeTab === "overview" && (
            <div className="bg-mine-shaft-900 border border-slate-700 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-700/50">
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-md">
                  {/* Placeholder for company logo */}
                  <img src="/google.png" alt="Company Logo" className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {activeJob.title}
                  </h3>
                  <p className="text-sm text-slate-400">
                    Google • {activeJob.daysAgo} days ago • 48 Applicants {/* Placeholder values */}
                  </p>
                </div>
                <div className="ml-auto flex gap-2">
                  <button className="px-4 py-1.5 text-sm bg-yellow-400 text-black rounded-md font-semibold hover:bg-yellow-300 transition-colors shadow-md">
                    Edit
                  </button>
                  <button className="px-4 py-1.5 text-sm border border-red-500 text-red-500 rounded-md font-semibold hover:bg-red-500 hover:text-white transition-colors shadow-md">
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                <div className="flex flex-col items-center p-3 bg-mine-shaft-800 rounded-lg border border-slate-700/50 shadow-sm">
                  <IconMapPin size={24} className="text-yellow-400 mb-1" />
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="font-semibold text-white">{activeJob.location}</p>
                </div>
                <div className="flex flex-col items-center p-3 bg-mine-shaft-800 rounded-lg border border-slate-700/50 shadow-sm">
                  <IconBriefcase size={24} className="text-yellow-400 mb-1" />
                  <p className="text-sm text-slate-400">Experience</p>
                  <p className="font-semibold text-white">Expert</p>{" "}
                  {/* Static for now, can be dynamic from activeJob */}
                </div>
                <div className="flex flex-col items-center p-3 bg-mine-shaft-800 rounded-lg border border-slate-700/50 shadow-sm">
                  <IconCurrencyDollar size={24} className="text-yellow-400 mb-1" />
                  <p className="text-sm text-slate-400">Salary</p>
                  <p className="font-semibold text-white">48 LPA</p>{" "}
                  {/* Static for now, can be dynamic from activeJob */}
                </div>
                <div className="flex flex-col items-center p-3 bg-mine-shaft-800 rounded-lg border border-slate-700/50 shadow-sm">
                  <IconBolt size={24} className="text-yellow-400 mb-1" />
                  <p className="text-sm text-slate-400">Job Type</p>
                  <p className="font-semibold text-white">Full Time</p>{" "}
                  {/* Static for now, can be dynamic from activeJob */}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {/* Display skills for the active job */}
                  {activeJob.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-slate-800 px-3 py-1 rounded-full text-sm text-white border border-slate-600 transition-colors duration-200 hover:bg-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "applicants" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Map through all applicants to display their cards */}
              {allApplicants.map((applicant) => (
                <div key={applicant.id} className="bg-mine-shaft-900 border border-slate-700 rounded-xl p-4 shadow-lg">
                  <TalentCard talent={applicant} onLike={handleLikeTalent} />
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => navigate("/talent-profile")} // Navigate to talent profile
                      className="flex-1 px-4 py-2 text-sm bg-yellow-400 text-black rounded-md font-semibold hover:bg-yellow-300 transition-colors shadow-md"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => openScheduleModal(applicant)} // Open schedule modal
                      className="flex-1 px-4 py-2 text-sm border border-slate-500 text-slate-300 rounded-md font-semibold hover:bg-slate-700 hover:text-white transition-colors shadow-md"
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "invited" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Map through invited applicants to display their cards */}
              {invitedApplicants.map((applicant) => (
                <div key={applicant.id} className="bg-mine-shaft-900 border border-slate-700 rounded-xl p-4 shadow-lg">
                  <TalentCard talent={applicant} onLike={handleLikeTalent} />
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => navigate("/talent-profile")} // Navigate to talent profile
                      className="flex-1 px-4 py-2 text-sm bg-yellow-400 text-black rounded-md font-semibold hover:bg-yellow-300 transition-colors shadow-md"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => openScheduleModal(applicant)} // Open schedule modal
                      className="flex-1 px-4 py-2 text-sm border border-slate-500 text-slate-300 rounded-md font-semibold hover:bg-slate-700 hover:text-white transition-colors shadow-md"
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      {/* Footer Component - Placed here as requested */}
      <Footer />

      {/* Schedule Modal - Conditionally rendered */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-mine-shaft-900 p-8 rounded-lg shadow-xl w-96 border border-slate-700 relative">
            <button
              onClick={closeScheduleModal}
              className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors duration-200"
            >
              <IconX size={24} />
            </button>
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Schedule Interview</h2>
            {selectedApplicant && (
              <p className="text-slate-300 mb-4">
                Scheduling for: <span className="font-semibold">{selectedApplicant.name}</span>
              </p>
            )}
            <div className="mb-4">
              <label htmlFor="interview-date" className="block text-slate-400 text-sm font-bold mb-2">
                Date
              </label>
              <input
                type="date"
                id="interview-date"
                className="w-full p-2 rounded-md bg-mine-shaft-800 border border-slate-600 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-200"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="interview-time" className="block text-slate-400 text-sm font-bold mb-2">
                Time
              </label>
              <input
                type="time"
                id="interview-time"
                className="w-full p-2 rounded-md bg-mine-shaft-800 border border-slate-600 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-200"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
            <button
              onClick={handleScheduleSubmit}
              className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-300 transition-colors shadow-md"
            >
              Confirm Schedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostedJobPage;
