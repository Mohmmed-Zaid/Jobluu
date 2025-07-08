import React from "react";
import { IconBell, IconSettings } from "@tabler/icons-react";
import { Avatar, Indicator } from "@mantine/core";
import owlLogo from "../assets/owl.png";
import NavLinks from "./NavLinks";

const Header = () => {
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
        <div className="flex items-center gap-2">
          <div>Mohmmed Zaid</div>
          <Avatar src="/avatar.png" alt="You" />
        </div>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <IconSettings stroke={1.5} />
        </div>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator
            offset={6}
            size={9}
            processing
            withBorder
            styles={{ indicator: { backgroundColor: "#ffbd20" } }}
          >
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </div>
    </div>
  );
};

export default Header;
