import React from "react";
import UploadJob from "../UploadJob/UploadJob";

const UploadJobPage: React.FC = () => {
  return (
    <div className="w-full bg-mine-shaft-950 min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        
        <UploadJob />
      </div>
    </div>
  );
};

export default UploadJobPage;
