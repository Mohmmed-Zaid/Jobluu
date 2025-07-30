import React, { useState } from "react";
import { Button, MultiSelect } from "@mantine/core";
import { IconBriefcase, IconCode, IconSend, IconCheck, IconX } from "@tabler/icons-react";
import TextEditor from "./TextEditor";
import SelectInput from "./SelectInput";
import { jobService } from "../Services/jobService";
import { convertToBackendFormat, FrontendJobDTO } from "../types/JobDTO";

// Define the fields structure (you can replace this with your actual Uploadfield import)
const fields = [
  {
    label: "Job Title",
    options: [] // For text input, we'll handle this differently
  },
  {
    label: "Company",
    options: [] // For text input
  },
  {
    label: "Location",
    options: [
      "Remote",
      "New York, NY",
      "San Francisco, CA",
      "Los Angeles, CA",
      "Chicago, IL",
      "Austin, TX",
      "Seattle, WA",
      "Boston, MA",
      "Denver, CO",
      "Atlanta, GA",
      "Miami, FL",
      "London, UK",
      "Berlin, Germany",
      "Toronto, Canada",
      "Sydney, Australia",
      "Mumbai, India",
      "Bangalore, India",
      "Pune, India"
    ]
  },
  {
    label: "Job Type",
    options: ["Full Time", "Part Time", "Contract", "Freelance", "Internship"]
  },
  {
    label: "Experience Level",
    options: ["Entry-level", "Mid-level", "Senior", "Expert", "Lead"]
  },
  {
    label: "Salary Range",
    options: [
      "$40,000 - $60,000",
      "$60,000 - $80,000",
      "$80,000 - $100,000",
      "$100,000 - $120,000",
      "$120,000 - $150,000",
      "$150,000 - $200,000",
      "$200,000+",
      "Negotiable"
    ]
  }
];

const defaultContent = `
<h2>Job Overview</h2>
<p>We are looking for a talented professional to join our team...</p>

<h3>Key Responsibilities</h3>
<ul>
<li>Develop and maintain high-quality applications</li>
<li>Collaborate with cross-functional teams</li>
<li>Write clean, maintainable code</li>
<li>Participate in code reviews</li>
</ul>

<h3>Requirements</h3>
<ul>
<li>Bachelor's degree in Computer Science or related field</li>
<li>Strong problem-solving skills</li>
<li>Excellent communication skills</li>
<li>Experience with modern development practices</li>
</ul>

<h3>What We Offer</h3>
<ul>
<li>Competitive salary and benefits</li>
<li>Flexible working arrangements</li>
<li>Professional development opportunities</li>
<li>Collaborative work environment</li>
</ul>
`;

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ type, message, onClose }) => (
  <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border ${
    type === 'success' 
      ? 'bg-green-900 border-green-500 text-green-100' 
      : 'bg-red-900 border-red-500 text-red-100'
  } transition-all duration-300`}>
    <div className="flex items-center gap-3">
      {type === 'success' ? (
        <IconCheck size={20} className="text-green-400" />
      ) : (
        <IconX size={20} className="text-red-400" />
      )}
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <IconX size={16} />
      </button>
    </div>
  </div>
);

const UploadJob: React.FC = () => {
  const [formState, setFormState] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.label]: "" }), {})
  );
  const [skills, setSkills] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState<string>(defaultContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const handleChange = (label: string, value: string) => {
    setFormState((prev) => ({ ...prev, [label]: value }));
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const validateForm = (): string | null => {
    if (!formState["Job Title"]?.trim()) {
      return "Job Title is required";
    }
    if (!formState["Company"]?.trim()) {
      return "Company name is required";
    }
    if (!formState["Location"]) {
      return "Location is required";
    }
    if (!formState["Job Type"]) {
      return "Job Type is required";
    }
    if (!formState["Experience Level"]) {
      return "Experience Level is required";
    }
    if (!jobDescription?.trim() || jobDescription === defaultContent) {
      return "Job Description is required";
    }
    return null;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate form
      const validationError = validateForm();
      if (validationError) {
        showNotification('error', validationError);
        setIsSubmitting(false);
        return;
      }

      // Prepare job data in frontend format
      const frontendJobData: FrontendJobDTO = {
        title: formState["Job Title"],
        companyName: formState["Company"],
        location: formState["Location"],
        jobType: formState["Job Type"],
        experienceLevel: formState["Experience Level"],
        salary: formState["Salary Range"] || "",
        description: jobDescription,
        skills: skills,
        status: 'active'
      };

      // Submit to backend
      const result = await jobService.postJob(frontendJobData);
      
      console.log("Job Posted Successfully:", result);
      showNotification('success', 'Job posted successfully! 🎉');
      
      // Reset form
      setFormState(fields.reduce((acc, field) => ({ ...acc, [field.label]: "" }), {}));
      setSkills([]);
      setJobDescription(defaultContent);
      
    } catch (error) {
      console.error("Error posting job:", error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to post job. Please try again.';
      showNotification('error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputComponent = (field: any) => {
    // For Job Title and Company, use text input
    if (field.label === "Job Title" || field.label === "Company") {
      return (
        <div key={field.label}>
          <label className="block text-sm font-medium text-bright-sun-400 mb-2">
            {field.label} *
          </label>
          <input
            type="text"
            value={formState[field.label]}
            onChange={(e) => handleChange(field.label, e.target.value)}
            className="w-full p-3 rounded-lg bg-mine-shaft-900 border border-mine-shaft-600 text-white focus:outline-none focus:border-bright-sun-400 transition-colors duration-200"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            required
          />
        </div>
      );
    }

    // For other fields, use SelectInput
    return (
      <SelectInput
        key={field.label}
        label={field.label}
        data={field.options}
        value={formState[field.label]}
        onChange={(value) => handleChange(field.label, value)}
        required={!field.label.includes("Salary")}
      />
    );
  };

  return (
    <div className="min-h-screen bg-mine-shaft-950 py-12 px-4">
      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-bright-sun-400 to-yellow-500 rounded-full mb-6 shadow-lg">
            <IconBriefcase className="w-10 h-10 text-mine-shaft-900" />
          </div>
          <h1 className="text-5xl font-bold text-bright-sun-400 mb-3">Post a Job</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find the perfect candidate for your team by creating a compelling job posting.
          </p>
        </div>

        {/* Job Form */}
        <div className="bg-mine-shaft-800 rounded-3xl shadow-2xl p-10 border border-mine-shaft-700">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {fields.map((field) => getInputComponent(field))}
            </div>

            {/* Skills */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-bright-sun-400 mb-2">
                <IconCode className="inline w-4 h-4 mr-2" />
                Skills Required *
              </label>
              <MultiSelect
                data={[
                  "React", "Vue.js", "Angular", "Node.js", "Spring Boot", "Django",
                  "Java", "Python", "JavaScript", "TypeScript", "Docker", "Kubernetes", 
                  "AWS", "MongoDB", "PostgreSQL", "MySQL", "GraphQL", "Redis", 
                  "CI/CD", "Git", "HTML", "CSS", "Sass", "Tailwind CSS", "Bootstrap",
                  "Express.js", "Flask", "Laravel", "PHP", "C#", ".NET", "Ruby on Rails",
                  "Go", "Rust", "Swift", "Kotlin", "Flutter", "React Native", "Next.js",
                  "Nuxt.js", "Svelte", "Firebase", "Azure", "Google Cloud", "Terraform"
                ]}
                value={skills}
                onChange={setSkills}
                placeholder="Search or add skills"
                searchable
                creatable
                clearable
                maxSelectedValues={15}
                radius="md"
                size="md"
                getCreateLabel={(query) => `+ Add "${query}"`}
                styles={{
                  input: {
                    backgroundColor: '#1c1c1c',
                    border: '1px solid #374151',
                    color: '#facc15',
                    fontSize: '14px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                  },
                  dropdown: {
                    backgroundColor: '#1c1c1c',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  },
                  pill: {
                    backgroundColor: '#facc15',
                    color: '#1c1c1c',
                    fontWeight: 600,
                  },
                  item: {
                    color: '#facc15',
                    padding: '8px 12px',
                    fontSize: '14px',
                    borderRadius: '6px',
                    '&[data-selected]': {
                      backgroundColor: '#facc15',
                      color: '#1c1c1c',
                    },
                    '&[data-hovered]': {
                      backgroundColor: '#374151',
                    },
                  },
                }}
              />
              <p className="text-xs text-gray-500 mt-1">
                Select relevant skills for this position (maximum 15)
              </p>
            </div>

            {/* Job Description */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-bright-sun-400 mb-2">
              </label>
              <TextEditor content={jobDescription} setContent={setJobDescription} />
              <p className="text-xs text-gray-500 mt-1">
                Provide a detailed description of the role, responsibilities, and requirements
              </p>
            </div>

            {/* Submit */}
            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                size="lg"
                radius="xl"
                loading={isSubmitting}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-bright-sun-400 to-yellow-500 hover:from-bright-sun-500 hover:to-yellow-600 text-mine-shaft-900 font-semibold px-8 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                leftSection={<IconSend size={18} />}
              >
                {isSubmitting ? 'Publishing Job...' : 'Publish Job Post'}
              </Button>
            </div>
          </form>

          {/* Form Requirements */}
          <div className="mt-6 p-4 bg-mine-shaft-900 rounded-lg border border-mine-shaft-600">
            <h3 className="text-sm font-semibold text-bright-sun-400 mb-2">Required Fields:</h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Job Title</li>
              <li>• Company Name</li>
              <li>• Location</li>
              <li>• Job Type</li>
              <li>• Experience Level</li>
              <li>• Skills Required</li>
              <li>• Job Description</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadJob;