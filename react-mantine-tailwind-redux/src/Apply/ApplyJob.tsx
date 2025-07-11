// import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft, IconUpload, IconCheck } from "@tabler/icons-react";
import { RingLoader } from "react-spinners";
import React, { useEffect, useState } from "react";

const ApplyJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    website: "",
    cv: null,
    coverLetter: "",
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = () => {
    setLoading(true);
  };

  useEffect(() => {
    if (loading && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (loading && countdown === 0) {
      navigate("/find-jobs");
    }
  }, [loading, countdown, navigate]);

  return (
    <div className="bg-mine-shaft-950 text-white min-h-screen">
      {/* Container with max width and centering */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/jobs")}
          className="flex items-center gap-3 text-sm font-medium text-bright-sun-400 bg-gradient-to-r from-mine-shaft-800 to-mine-shaft-700 px-6 py-3 rounded-xl hover:from-mine-shaft-700 hover:to-mine-shaft-600 transition-all duration-300 border border-mine-shaft-600 shadow-lg hover:shadow-bright-sun-400/20 mb-8 group"
        >
          <IconArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Jobs
        </button>

        {/* Job Info Card */}
        <div className="bg-gradient-to-br from-mine-shaft-800 to-mine-shaft-900 p-8 rounded-2xl shadow-2xl mb-10 border border-mine-shaft-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-16 h-16 bg-mine-shaft-700 rounded-2xl flex items-center justify-center p-2 shadow-lg">
              <img
                src="/google.png"
                alt="Google"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-bright-sun-400 mb-2">
                Senior Frontend Developer
              </h1>
              <p className="text-lg text-gray-300 font-medium">Google</p>
              <p className="text-sm text-gray-400 mt-1 bg-mine-shaft-700/50 px-3 py-1 rounded-full inline-block">
                Posted 5 days ago
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-mine-shaft-700 mb-10 opacity-50" />

        {/* Application Form */}
        <div className="bg-gradient-to-br from-mine-shaft-900 to-mine-shaft-950 p-8 rounded-2xl shadow-2xl border border-mine-shaft-700">
          <h2 className="text-2xl font-bold text-bright-sun-400 mb-8 flex items-center gap-3">
            Submit Your Application
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center gap-6 py-16">
              <RingLoader color="#facc15" size={100} />
              <div className="text-center">
                <p className="text-bright-sun-400 font-bold text-lg mb-2">
                  Sending Application...
                </p>
                <p className="text-gray-300 text-sm">
                  Redirecting in {countdown} seconds
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-bright-sun-400 mb-6">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Full Name", name: "name", type: "text", required: true },
                    { label: "Phone Number", name: "phone", type: "tel", required: true },
                    { label: "Email Address", name: "email", type: "email", required: true },
                    { label: "Personal Website", name: "website", type: "url", required: false },
                  ].map((input) => (
                    <div className="flex flex-col gap-2" key={input.name}>
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        {input.label}
                        {input.required && <span className="text-red-400">*</span>}
                      </label>
                      <input
                        name={input.name}
                        type={input.type}
                        value={(form as any)[input.name]}
                        onChange={handleChange}
                        placeholder={`Enter your ${input.label.toLowerCase()}`}
                        className="bg-mine-shaft-800 px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 border border-mine-shaft-600 focus:outline-none focus:ring-2 focus:ring-bright-sun-400 focus:border-bright-sun-400 transition-all duration-200"
                        required={input.required}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <h3 className="text-lg font-semibold text-bright-sun-400 mb-6">
                  Resume/CV
                </h3>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    Attach Your CV (PDF only)
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      name="cv"
                      type="file"
                      accept=".pdf"
                      onChange={handleChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                    <div className="bg-mine-shaft-800 border-2 border-dashed border-mine-shaft-600 hover:border-bright-sun-400 px-6 py-8 rounded-xl transition-all duration-200 flex flex-col items-center gap-4 hover:bg-mine-shaft-700/50">
                      <IconUpload size={32} className="text-bright-sun-400" />
                      <div className="text-center">
                        <p className="text-gray-300 font-medium">
                          {form.cv ? (form.cv as any).name : "Choose file or drag and drop"}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          PDF files only, max 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h3 className="text-lg font-semibold text-bright-sun-400 mb-6">
                  Cover Letter
                </h3>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-300">
                    Tell us why you're perfect for this role
                  </label>
                  <textarea
                    name="coverLetter"
                    rows={8}
                    value={form.coverLetter}
                    onChange={handleChange}
                    placeholder="Share your passion, relevant experience, and what makes you the ideal candidate for this position..."
                    className="bg-mine-shaft-800 px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 border border-mine-shaft-600 resize-none focus:outline-none focus:ring-2 focus:ring-bright-sun-400 focus:border-bright-sun-400 transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {form.coverLetter.length} characters
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-mine-shaft-700">
                <p className="text-sm text-gray-400">
                  <span className="text-red-400">*</span> Required fields
                </p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="bg-transparent border-2 border-bright-sun-400 text-bright-sun-400 hover:bg-bright-sun-400 hover:text-black px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    Review Application
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-bright-sun-400 to-yellow-500 text-black px-8 py-3 rounded-xl text-sm font-bold hover:from-yellow-300 hover:to-yellow-400 transition-all duration-200 shadow-lg hover:shadow-bright-sun-400/30 transform hover:scale-105 flex items-center gap-2"
                  >
                    <IconCheck size={16} />
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;