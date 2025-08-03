// src/components/Header.tsx
import React from "react";
import { IconSettings } from "@tabler/icons-react";
import { Avatar } from "@mantine/core";
import owlLogo from "../assets/owl.png";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";
import NotificationBell from "../notifications/NotificationBell";

const Header: React.FC = () => {
  return (
    <div className="w-full h-20 bg-mine-shaft-950 text-white flex justify-between items-center px-6 font-poppins">
      {/* Logo + Brand */}
      <div className="flex gap-2 items-center text-yellow-400">
        <img src={owlLogo} alt="Jobluu logo" className="h-14 w-14" />
        <div className="text-3xl font-semibold">Jobluu</div>
      </div>

      {/* Navigation Links */}
      <NavLinks />

      {/* Icons + User */}
      <div className="flex gap-5 items-center font-roboto">
        <ProfileMenu/>
        
        <div className="bg-mine-shaft-900 p-1.5 rounded-full hover:bg-mine-shaft-800 transition-colors">
          <IconSettings stroke={1.5} className="cursor-pointer" />
        </div>
        
        {/* Enhanced Notification Bell */}
        <NotificationBell />
      </div>
    </div>
  );
};

export default Header;
