// TalentData.ts
// This file contains mock data for talent profiles.

const TalentData = [
  {
    id: 1,
    avatar: "https://placehold.co/100x100/FFD700/000000?text=JS", // Placeholder for JavaScript Developer
    name: "Lal Singh",
    title: "Senior Full-stack Developer",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS", "Docker", "Kubernetes"],
    description: "Experienced full-stack developer with a passion for building scalable web applications. Strong in both front-end and back-end technologies.",
    expectedSalary: "20 - 25 LPA",
    location: "Noida, India",
    experienceLevel: "Senior",
  },
  {
    id: 2,
    avatar: "https://placehold.co/100x100/ADD8E6/000000?text=UX", // Placeholder for UX Designer
    name: "Bob Williams",
    title: "Lead UX/UI Designer",
    skills: ["Figma", "Sketch", "User Research", "Prototyping", "Wireframing", "Usability Testing"],
    description: "Creative and user-centric designer with 8+ years of experience crafting intuitive digital experiences. Specializes in mobile-first design.",
    expectedSalary: "30 - 35 LPA",
    location: "Mumbai,India ",
    experienceLevel: "Lead",
  },
  {
    id: 3,
    avatar: "https://placehold.co/100x100/90EE90/000000?text=PM", // Placeholder for Product Manager
    name: "Shanawaz Peshwar",
    title: "Senior Product Manager",
    skills: ["Product Strategy", "Agile", "Roadmapping", "Market Analysis", "Scrum", "Jira"],
    description: "Results-driven product manager focused on delivering impactful products. Expertise in SaaS and B2B solutions.",
    expectedSalary: "55 - 65 LPA",
    location: "Bengaluru, India",
    experienceLevel: "Senior",
  },
  {
    id: 4,
    avatar: "https://placehold.co/100x100/FFB6C1/000000?text=DA", // Placeholder for Data Analyst
    name: "Diana Miller",
    title: "Data Analyst",
    skills: ["Python", "SQL", "Tableau", "Power BI", "Excel", "Statistical Analysis"],
    description: "Detail-oriented data analyst skilled in transforming raw data into actionable insights. Proficient in data visualization and reporting.",
    expectedSalary: "15 - 25 LPA",
    location: "Delhi, India",
    experienceLevel: "Mid-level",
  },
  {
    id: 5,
    avatar: "https://placehold.co/100x100/DDA0DD/000000?text=QA", // Placeholder for QA Engineer
    name: "Eve Davis",
    title: "QA Engineer",
    skills: ["Manual Testing", "Automation Testing", "Selenium", "Jira", "TestRail", "API Testing"],
    description: "Thorough QA engineer ensuring high-quality software releases. Experienced in both manual and automated testing methodologies.",
    expectedSalary: "25 -  30 LPA",
    location: "Noida, India",
    experienceLevel: "Junior",
  },
  {
    id: 6,
    avatar: "https://placehold.co/100x100/87CEEB/000000?text=ML", // Placeholder for Machine Learning Engineer
    name: "Frank White",
    title: "Machine Learning Engineer",
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "NLP", "Computer Vision"],
    description: "ML engineer passionate about developing and deploying intelligent systems. Strong background in deep learning and data science.",
    expectedSalary: "40 - 60 LPA",
    location: "Chennai, Indai",
    experienceLevel: "Senior",
  },
  {
    id: 7,
    avatar: "https://placehold.co/100x100/F0E68C/000000?text=BD", // Placeholder for Business Development
    name: "Grace Taylor",
    title: "Business Development Manager",
    skills: ["Sales Strategy", "Client Relations", "Negotiation", "Market Research", "CRM"],
    description: "Dynamic business development professional with a proven track record of driving growth and forging strong client relationships.",
    expectedSalary: "40 - 45 LPA",
    location: "Sydney, Australia",
    experienceLevel: "Mid-level",
  },
  {
    id: 8,
    avatar: "https://placehold.co/100x100/B0C4DE/000000?text=CS", // Placeholder for Cybersecurity Specialist
    name: "Henry Moore",
    title: "Cybersecurity Specialist",
    skills: ["Network Security", "Penetration Testing", "Incident Response", "Compliance", "Firewalls"],
    description: "Dedicated cybersecurity expert protecting digital assets and ensuring robust security postures for organizations.",
    expectedSalary: "55 - 65 LPA",
    location: "Pune ,India",
    experienceLevel: "Senior",
  },
  {
    id: 9,
    avatar: "https://placehold.co/100x100/FFC0CB/000000?text=DM", // Placeholder for Digital Marketing
    name: "Ivy King",
    title: "Digital Marketing Specialist",
    skills: ["SEO", "SEM", "Content Marketing", "Social Media", "Email Marketing", "Google Analytics"],
    description: "Creative digital marketer driving online visibility and engagement. Proficient in various digital channels and analytics.",
    expectedSalary: "20 - 30 LPA",
    location: "Dublin, Ireland",
    experienceLevel: "Mid-level",
  },
  {
    id: 10,
    avatar: "https://placehold.co/100x100/D8BFD8/000000?text=SA", // Placeholder for Solutions Architect
    name: "Jack Hall",
    title: "Solutions Architect",
    skills: ["Cloud Architecture", "System Design", "Microservices", "Azure", "GCP", "Enterprise Solutions"],
    description: "Strategic solutions architect designing scalable and resilient cloud-native applications. Bridging technical and business requirements.",
    expectedSalary: "65 -75 LPA",
    location: "Bengaluru India",
    experienceLevel: "Lead",
  },
  {
    id: 11,
    avatar: "https://placehold.co/100x100/F4A460/000000?text=FN", // Placeholder for Financial Analyst
    name: "Karen Young",
    title: "Financial Analyst",
    skills: ["Financial Modeling", "Valuation", "Budgeting", "Forecasting", "Excel", "SQL"],
    description: "Analytical financial professional providing insights for strategic decision-making. Experienced in corporate finance and investment analysis.",
    expectedSalary: "35 -45 LPA",
    location: "Delhi ,India",
    experienceLevel: "Mid-level",
  },
  {
    id: 12,
    avatar: "https://placehold.co/100x100/C0C0C0/000000?text=HR", // Placeholder for HR Manager
    name: "Liam Scott",
    title: "HR Manager",
    skills: ["Recruitment", "Employee Relations", "Talent Management", "HR Policies", "Compensation & Benefits"],
    description: "Compassionate HR leader fostering positive work environments and driving talent acquisition and retention strategies.",
    expectedSalary: "20 - 30 LPA",
    location: "Manchester, UK",
    experienceLevel: "Senior",
  },
  {
  id: 13,
  avatar: "https://placehold.co/100x100/4682B4/ffffff?text=DS", // Data Scientist
  name: "Aanya Kapoor",
  title: "Senior Data Scientist",
  skills: ["Machine Learning", "Deep Learning", "Python", "NLP", "AWS SageMaker", "Data Strategy"],
  description: "Experienced data scientist specializing in predictive modeling and business intelligence. Proven impact in fintech and healthtech domains.",
  expectedSalary: "38 - 45 LPA",
  location: "Bangalore, India",
  experienceLevel: "Senior",
},
{
  id: 14,
  avatar: "https://placehold.co/100x100/FFA07A/000000?text=FE", // Frontend Engineer
  name: "Rahul Mehta",
  title: "Frontend Engineer",
  skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "UX/UI", "Web Accessibility"],
  description: "Creative frontend engineer delivering high-performance and pixel-perfect web apps with a strong focus on user experience.",
  expectedSalary: "18 - 24 LPA",
  location: "Remote (India)",
  experienceLevel: "Mid-Level",
},
{
  id: 15,
  avatar: "https://placehold.co/100x100/32CD32/ffffff?text=SE", // Software Engineer
  name: "Sneha Reddy",
  title: "Software Engineer",
  skills: ["Java", "Spring Boot", "REST APIs", "Docker", "Kubernetes", "SQL"],
  description: "Backend engineer with solid experience in building scalable microservices. Passionate about clean code and automation.",
  expectedSalary: "35 - 45 LPA",
  location: "Hyderabad, India",
  experienceLevel: "Mid-Level",
}

];

export default TalentData;

