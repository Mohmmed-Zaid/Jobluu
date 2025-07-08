import React from "react";
import { IconSearch } from "@tabler/icons-react";
import { Avatar } from "@mantine/core";

const DreamJob = () => {
  return (
    <div className="min-h-screen flex justify-between px-16 bg-mine-shaft-950 text-white">
      {/* Left Content */}
      <div className="w-1/2 pr-16 flex flex-col justify-start pt-24 gap-6">
        <h1 className="text-8xl font-bold leading-[1.1] tracking-tight">
          Discover your <br />
          <span className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">dream career</span> with us.
        </h1>

        <p className="text-2xl sm:text-3xl text-gray-300 font-light leading-relaxed tracking-wide max-w-2xl">
          Your <span className="text-yellow-400 font-bold">perfect life</span> starts with the{" "}
          <span className="text-white font-bold">right opportunity</span>.
          <br className="hidden sm:block" />
          Begin your <span className="text-yellow-400 font-bold">journey</span> through thousands of{" "}
          <span className="text-white font-bold">amazing jobs</span> today.
        </p>

        {/* Search Section */}
        <div className="flex gap-4 mt-4">
          <div className="bg-gradient-to-br from-mine-shaft-900 to-mine-shaft-800 rounded-xl px-6 py-5 w-64 shadow-2xl border border-mine-shaft-600 hover:border-yellow-400 hover:shadow-yellow-400/20 transition-all duration-300 transform hover:scale-105">
            <label className="block text-sm text-yellow-400 mb-2 font-bold uppercase tracking-wider">Dream Role</label>
            <input
              type="text"
              placeholder="Software Engineer"
              className="bg-transparent text-white outline-none w-full text-base font-semibold placeholder-gray-400"
            />
          </div>

          <div className="bg-gradient-to-br from-mine-shaft-900 to-mine-shaft-800 rounded-xl px-6 py-5 w-64 shadow-2xl border border-mine-shaft-600 hover:border-yellow-400 hover:shadow-yellow-400/20 transition-all duration-300 transform hover:scale-105">
            <label className="block text-sm text-yellow-400 mb-2 font-bold uppercase tracking-wider">Work Style</label>
            <input
              type="text"
              placeholder="Full Time"
              className="bg-transparent text-white outline-none w-full text-base font-semibold placeholder-gray-400"
            />
          </div>

          <div className="flex items-center justify-center h-full w-16 bg-gradient-to-br from-yellow-400 to-orange-500 text-black rounded-xl p-3 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 cursor-pointer shadow-2xl hover:shadow-yellow-400/30 transform hover:scale-110">
            <IconSearch className="w-6 h-6 font-bold" />
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-1/2 relative">
        <div className="absolute top-16 right-0 w-full h-[750px] flex flex-col items-end pr-10">
          {/* Character Image */}
          <img
            src="/Boy.png"
            alt="Boy working on laptop"
            className="w-full h-full object-contain object-right scale-110"
          />

          {/* 10K+ Got Job Box */}
          <div className="absolute top-12 right-6">
            <div className="border border-yellow-400 rounded-xl px-4 py-3 bg-mine-shaft-900/80 backdrop-blur-sm flex flex-col items-center w-fit shadow-lg">
              <div className="text-sm text-white font-semibold mb-3">10K+ got job</div>
              <div className="flex -space-x-3">
                <Avatar src="avatar.png" radius="xl" size={36} />
                <Avatar src="avatar1.png" radius="xl" size={36} />
                <Avatar src="avatar2.png" radius="xl" size={36} />
                <Avatar
                  radius="xl"
                  size={36}
                  className="bg-gray-700 text-white font-semibold text-xs flex items-center justify-center"
                >
                  +9k
                </Avatar>
              </div>
            </div>
          </div>

          {/* Google Offer Box */}
          <div className="absolute top-72 left-16">
            <div className="border border-yellow-400 rounded-xl px-4 py-3 bg-mine-shaft-900/80 backdrop-blur-sm flex flex-col items-start w-52 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <img src="google.png" alt="Google" className="w-8 h-7 object-contain" />
                <div className="text-white font-medium text-sm">Google Offer</div>
              </div>
              <div className="text-white text-sm mb-1">Software Engineer</div>
              <div className="text-gray-400 text-xs">Pune,Maharashtra</div>
              <div className="text-xs text-gray-500 mt-1">1 day ago • 120 Applicants</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamJob;