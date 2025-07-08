import React from "react";
import Header from "../Header/Header";
import Footer from "../footer/Footer";
import SearchBar from "../FindJobs/SearchBar";
import Jobs from "../FindJobs/Jobs";

const FindJob = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-poppins">
      <Header />
      <SearchBar />
      <Jobs />
      <Footer />
    </div>
  );
};

export default FindJob;
