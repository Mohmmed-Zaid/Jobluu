// components/JobFormModal.tsx
import React, { useState, useEffect } from 'react';
import { IconX, IconPlus, IconTrash } from '@tabler/icons-react';
import { JobDTO } from '../Services/jobService';

interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: JobDTO) => Promise<void>;
  editJob?: JobDTO | null;
  isLoading?: boolean;
}

const JobFormModal: React.FC<JobFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editJob,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<JobDTO>({
    title: '',
    location: '',
    status: 'draft',
    skills: [],
    description: '',
    experienceLevel: 'Mid-level',
    salary: '',
    jobType: 'Full Time',
    companyName: ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editJob) {
      setFormData({
        ...editJob,
        skills: editJob.skills || []
      });
    } else {
      setFormData({
        title: '',
        location: '',
        status: 'draft',
        skills: [],
        description: '',
        experienceLevel: 'Mid-level',
        salary: '',
        jobType: 'Full Time',
        companyName: ''
      });
    }
    setErrors({});
  }, [editJob, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.description?.trim()) {
      newErrors.description = 'Job description is required';
    }
    if (formData.skills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting job:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
      
      // Clear skills error if it exists
      if (errors.skills) {
        setErrors(prev => ({
          ...prev,
          skills: ''
        }));
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-mine-shaft-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700">
        <div className="sticky top-0 bg-mine-shaft-900 border-b border-slate-700 p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-yellow-400">
              {editJob ? 'Edit Job' : 'Post New Job'}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors duration-200 p-1"
              disabled={isLoading}
            >
              <IconX size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-lg bg-mine-shaft-800 border ${
                errors.title ? 'border-red-500' : 'border-slate-600'
              } text-white focus:outline-none focus:border-yellow-400 transition-colors duration-200`}
              placeholder="e.g., Senior Frontend Developer"
              disabled={isLoading}
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Company Name & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-mine-shaft-800 border border-slate-600 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-200"
                placeholder="e.g., Google"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg bg-mine-shaft-800 border ${
                  errors.location ? 'border-red-500' : 'border-slate-600'
                } text-white focus:outline-none focus:border-yellow-400 transition-colors duration-200`}
                placeholder="e.g., San Francisco, USA"
                disabled={isLoading}
              />
              {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
            </div>
          </div>

          {/* Job Type, Experience Level, Salary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">
                Job Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-mine-shaft-800 border border-slate-600 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-200"
                disabled={isLoading}
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">
                Experience Level
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-mine-shaft-800 border border-slate-600 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-200"
                disabled={isLoading}
              >
                <option value="Entry">Entry Level</option>
                <option value="Mid-level">Mid Level</option>
                <option value="Senior">Senior</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-mine-shaft-800 border border-slate-600 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-200"
                placeholder="e.g., $90,000 or 48 LPA"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Required Skills *
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-3 rounded-lg bg-mine-shaft-800 border border-slate-600 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-200"
                placeholder="Add a skill (press Enter)"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={addSkill}
                className="p-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors duration-200 disabled:opacity-50"
                disabled={isLoading}
              >
                <IconPlus size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-slate-600"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    disabled={isLoading}
                  >
                    <IconTrash size={14} />
                  </button>
                </span>
              ))}
            </div>
            {errors.skills && <p className="text-red-400 text-sm mt-1">{errors.skills}</p>}
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Job Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full p-3 rounded-lg bg-mine-shaft-800 border ${
                errors.description ? 'border-red-500' : 'border-slate-600'
              } text-white focus:outline-none focus:border-yellow-400 transition-colors duration-200 resize-vertical`}
              placeholder="Describe the job role, responsibilities, and requirements..."
              disabled={isLoading}
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-mine-shaft-800 border border-slate-600 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-200"
              disabled={isLoading}
            >
              <option value="draft">Save as Draft</option>
              <option value="active">Publish Job</option>
            </select>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-600 text-slate-300 rounded-lg font-semibold hover:bg-slate-700 hover:text-white transition-all duration-200 disabled:opacity-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading 
                ? (editJob ? 'Updating...' : 'Posting...') 
                : (editJob ? 'Update Job' : 'Post Job')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobFormModal;