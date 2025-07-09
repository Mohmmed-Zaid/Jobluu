import React, { useState } from "react";
import { Button, MultiSelect } from "@mantine/core";
import { IconBriefcase, IconCode, IconSend } from "@tabler/icons-react";
import { fields, content as defaultContent } from "./Uploadfield";
import TextEditor from "./TextEditor";
import SelectInput from "./SelectInput";

const UploadJob: React.FC = () => {
  const [formState, setFormState] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.label]: "" }), {})
  );
  const [skills, setSkills] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState<string>(defaultContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (label: string, value: string) => {
    setFormState((prev) => ({ ...prev, [label]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const jobData = {
      ...formState,
      skills,
      jobDescription,
    };
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Job Posted:", jobData);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-mine-shaft-950 py-12 px-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {fields.map((field) => (
              <SelectInput
                key={field.label}
                label={field.label}
                data={field.options}
                value={formState[field.label]}
                onChange={(value) => handleChange(field.label, value)}
              />
            ))}
          </div>

          {/* Skills */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-bright-sun-400 mb-2">
              <IconCode className="inline w-4 h-4 mr-2" />
              Skills Required
            </label>
            <MultiSelect
              data={[
                "React", "Vue.js", "Angular", "Node.js", "Spring Boot", "Django",
                "Java", "Python", "Docker", "Kubernetes", "AWS", "MongoDB",
                "PostgreSQL", "GraphQL", "TypeScript", "Redis", "CI/CD", "Git"
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
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <TextEditor content={jobDescription} setContent={setJobDescription} />
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-6">
            <Button
              size="lg"
              radius="xl"
              onClick={handleSubmit}
              loading={isSubmitting}
              className="bg-gradient-to-r from-bright-sun-400 to-yellow-500 hover:from-bright-sun-500 hover:to-yellow-600 text-mine-shaft-900 font-semibold px-8 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
              leftSection={<IconSend size={18} />}
            >
              {isSubmitting ? 'Publishing Job...' : 'Publish Job Post'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadJob;
