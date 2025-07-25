import React from "react";
import Header from "../Header/Header";
import Footer from "../footer/Footer";
import UploadJob from "../UploadJob/UploadJob";

const UploadJobPage: React.FC = () => {
  return (
    <div className="w-full bg-mine-shaft-950 min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Header/>
        <UploadJob />
        <Footer/>
      </div>
    </div>
  );
};

export default UploadJobPage;
