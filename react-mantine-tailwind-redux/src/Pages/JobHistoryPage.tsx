import React from "react";
import {
  IconBuildingFactory2,
  IconCalendar,
  IconMapPin,
  IconAward,
  IconCode,
  IconBriefcase,
  IconTrendingUp,
  IconUsers,
  IconRocket,
  IconStar,
  IconCertificate,
  IconTarget
} from "@tabler/icons-react";

// Define the interface for a single job history entry
interface JobHistoryEntry {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
  companyLogo?: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary?: string;
}

// Enhanced sample data with 9 job entries - All Indian locations and INR salaries
const jobHistoryData: JobHistoryEntry[] = [
  {
    id: 1,
    title: "Senior Full Stack Engineer",
    company: "TechCorp Solutions",
    location: "Bangalore, Karnataka",
    startDate: "Jan 2023",
    endDate: "Present",
    jobType: "Full-time",
    salary: "₹28L - ₹35L",
    description: "Leading development of enterprise-scale applications serving 2M+ users. Architecting microservices and mentoring a team of 8 engineers across multiple time zones.",
    achievements: [
      "Reduced system latency by 45% through advanced caching strategies",
      "Led migration to cloud-native architecture saving ₹1.6Cr annually",
      "Implemented CI/CD pipelines improving deployment frequency by 300%",
      "Mentored 12 junior developers with 95% retention rate"
    ],
    technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker", "Kubernetes", "PostgreSQL", "Redis", "GraphQL"]
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "InnovateTech Pvt Ltd",
    location: "Pune, Maharashtra",
    startDate: "Mar 2021",
    endDate: "Dec 2022",
    jobType: "Full-time",
    salary: "₹18L - ₹24L",
    description: "Developed scalable web applications using modern frameworks. Collaborated with UX/UI teams to create exceptional user experiences for fintech products.",
    achievements: [
      "Built payment processing system handling ₹400Cr+ transactions",
      "Improved application performance by 60% through code optimization",
      "Developed real-time dashboard serving 10K+ concurrent users",
      "Reduced bug reports by 40% through comprehensive testing"
    ],
    technologies: ["React", "Python", "Django", "MongoDB", "AWS", "Docker", "Jest", "Cypress"]
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "DigitalCraft Studio",
    location: "Hyderabad, Telangana",
    startDate: "Aug 2019",
    endDate: "Feb 2021",
    jobType: "Full-time",
    salary: "₹12L - ₹16L",
    description: "Specialized in creating responsive, accessible web interfaces. Worked closely with designers to implement pixel-perfect designs and smooth animations.",
    achievements: [
      "Increased mobile user engagement by 35% through responsive design",
      "Achieved 98% accessibility compliance across all projects",
      "Reduced page load times by 50% through optimization techniques",
      "Built reusable component library used across 15+ projects"
    ],
    technologies: ["React", "Vue.js", "Sass", "TypeScript", "Webpack", "Figma", "Storybook"]
  },
  {
    id: 4,
    title: "Junior Software Engineer",
    company: "StartupHub Ventures",
    location: "Gurgaon, Haryana",
    startDate: "Jun 2018",
    endDate: "Jul 2019",
    jobType: "Full-time",
    salary: "₹8L - ₹12L",
    description: "Contributed to MVP development for multiple startup projects. Gained experience in agile methodologies and rapid prototyping in fast-paced environment.",
    achievements: [
      "Developed 5 MVPs that secured ₹16Cr+ in seed funding",
      "Implemented authentication system used by 25K+ users",
      "Created automated testing suite reducing QA time by 30%",
      "Contributed to open-source projects with 1K+ stars"
    ],
    technologies: ["JavaScript", "Node.js", "MongoDB", "Express", "React", "Git", "Heroku"]
  },
  {
    id: 5,
    title: "Software Development Intern",
    company: "TechGiant India",
    location: "Mumbai, Maharashtra",
    startDate: "May 2017",
    endDate: "Aug 2017",
    jobType: "Internship",
    salary: "₹35K/month",
    description: "Summer internship focusing on backend development and API design. Worked with senior engineers on high-traffic systems serving millions of requests daily.",
    achievements: [
      "Optimized database queries improving response time by 25%",
      "Built internal tools used by 100+ engineers daily",
      "Presented project to executive team receiving outstanding rating",
      "Received return offer with 20% salary increase"
    ],
    technologies: ["Java", "Spring Boot", "MySQL", "Redis", "Docker", "Jenkins"]
  },
  {
    id: 6,
    title: "Mobile App Developer",
    company: "AppVentures India",
    location: "Chennai, Tamil Nadu",
    startDate: "Sep 2016",
    endDate: "Apr 2017",
    jobType: "Contract",
    salary: "₹2,500/day",
    description: "Developed cross-platform mobile applications for e-commerce clients. Focused on performance optimization and user experience across iOS and Android platforms.",
    achievements: [
      "Built 3 apps with 50K+ downloads and 4.8+ star ratings",
      "Reduced app crash rate by 70% through robust error handling",
      "Implemented offline functionality increasing user retention by 40%",
      "Delivered projects 2 weeks ahead of schedule consistently"
    ],
    technologies: ["React Native", "Swift", "Kotlin", "Firebase", "Redux", "Expo"]
  },
  {
    id: 7,
    title: "Web Developer",
    company: "CreativeWeb Agency",
    location: "Jaipur, Rajasthan",
    startDate: "Jan 2016",
    endDate: "Aug 2016",
    jobType: "Part-time",
    salary: "₹6L",
    description: "Part-time role while completing degree. Developed custom websites for small businesses and handled client communications for project requirements.",
    achievements: [
      "Delivered 15+ client websites with 100% satisfaction rate",
      "Increased client website traffic by average of 60%",
      "Built custom CMS solution reducing client update time by 80%",
      "Mentored 2 junior developers in modern web practices"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "WordPress", "MySQL", "jQuery"]
  },
  {
    id: 8,
    title: "Computer Science Tutor",
    company: "University Tech Center",
    location: "Delhi, NCR",
    startDate: "Sep 2025",
    endDate: "Dec 2027",
    jobType: "Part-time",
    salary: "₹500/hour",
    description: "Provided tutoring services for computer science students. Helped with programming assignments, algorithm understanding, and exam preparation.",
    achievements: [
      "Helped 30+ students improve grades by average of 1.5 GPA points",
      "Created study materials used by 200+ students",
      "Achieved 95% student satisfaction rating",
      "Developed interactive coding exercises for complex algorithms"
    ],
    technologies: ["Python", "Java", "C++", "Data Structures", "Algorithms", "Git"]
  },
  {
    id: 9,
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Remote (India)",
    startDate: "Feb 2025",
    endDate: "Nov 2025",
    jobType: "Contract",
    salary: "₹3,000/day",
    description: "Specialized in cloud infrastructure automation and CI/CD pipeline optimization. Worked with multiple clients to modernize their deployment processes and improve system reliability.",
    achievements: [
      "Reduced deployment time by 80% through automated CI/CD pipelines",
      "Saved clients ₹2.4Cr annually by optimizing cloud infrastructure costs",
      "Achieved 99.9% uptime across 15+ production environments",
      "Implemented monitoring solutions reducing incident response time by 60%",
      "Led cloud migration for 3 enterprise clients with zero downtime"
    ],
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Prometheus", "Grafana", "Ansible", "Python"]
  }
];

const JobHistoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-500/10 via-yellow-400/5 to-yellow-500/10 border-b border-yellow-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-2xl mb-6">
            <IconBriefcase size={32} className="text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-4">
            My Professional Journey
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A comprehensive timeline of my career growth, achievements, and the technologies that shaped my expertise
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 text-center">
            <IconTrendingUp size={32} className="text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">9</div>
            <div className="text-sm text-slate-400">Positions</div>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 text-center">
            <IconUsers size={32} className="text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">7+</div>
            <div className="text-sm text-slate-400">Years Exp</div>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 text-center">
            <IconRocket size={32} className="text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">25+</div>
            <div className="text-sm text-slate-400">Projects</div>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 text-center">
            <IconCode size={32} className="text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">30+</div>
            <div className="text-sm text-slate-400">Technologies</div>
          </div>
        </div>

        {/* Job cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {jobHistoryData.map((job, index) => (
            <div
              key={job.id}
              className="group relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-yellow-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/20 overflow-hidden"
            >
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Job type badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  job.jobType === 'Full-time' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  job.jobType === 'Contract' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  job.jobType === 'Part-time' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                  'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                }`}>
                  {job.jobType}
                </span>
              </div>

              {/* Header */}
              <div className="relative mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconBuildingFactory2 size={28} className="text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                      {job.title}
                    </h2>
                    <p className="text-yellow-400 font-medium">{job.company}</p>
                    {job.salary && (
                      <p className="text-green-400 text-sm font-medium mt-1">{job.salary}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location and dates */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-300">
                  <IconMapPin size={18} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <IconCalendar size={18} className="text-blue-400 flex-shrink-0" />
                  <span className="text-sm">{job.startDate} - {job.endDate}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                  {job.description}
                </p>
              </div>

              {/* Key achievements */}
              <div className="mb-6">
                <h3 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <IconTarget size={18} />
                  Key Achievements
                </h3>
                <ul className="space-y-2">
                  {job.achievements.slice(0, 2).map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                      <IconStar size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{achievement}</span>
                    </li>
                  ))}
                  {job.achievements.length > 2 && (
                    <li className="text-yellow-400 text-sm font-medium">
                      +{job.achievements.length - 2} more achievements
                    </li>
                  )}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <IconCode size={18} />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.technologies.slice(0, 6).map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-700/60 hover:bg-slate-600/60 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 border border-slate-600 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {job.technologies.length > 6 && (
                    <span className="bg-yellow-500/20 px-3 py-1.5 rounded-lg text-xs font-medium text-yellow-400 border border-yellow-500/30">
                      +{job.technologies.length - 6}
                    </span>
                  )}
                </div>
              </div>

              {/* Timeline connector for non-grid layout */}
              {index < jobHistoryData.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 w-8 h-0.5 bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-500/10 via-yellow-400/10 to-yellow-500/10 rounded-3xl p-8 border border-yellow-500/20">
            <IconCertificate size={48} className="text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Ready for New Challenges</h2>
            <p className="text-slate-300 mb-6">
              Always excited to take on innovative projects and collaborate with amazing teams
            </p>
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-slate-900 font-bold py-3 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25">
              Let's Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobHistoryPage;