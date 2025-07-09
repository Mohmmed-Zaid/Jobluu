import React from "react";
import Header from "../Header/Header"; 
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Profile from "../TalentProfile/Profile"; 

const TalentProfilePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-poppins">
      <Header /> 
      <Link className="my-4 inline-block" to="/find-talent">
       <Button
  leftSection={<IconArrowLeft size={18} className="text-yellow-400" />}
  variant="light"
  color="brightSun.4"
  className="rounded-full bg-mine-shaft-800 hover:bg-mine-shaft-700 text-white border border-yellow-400 px-5 py-2 text-sm font-medium transition duration-200"
>
  Back
</Button>

      </Link>
      <div>
        <Profile />
      </div>
      <Footer /> 
    </div>
  );
};

export default TalentProfilePage;
