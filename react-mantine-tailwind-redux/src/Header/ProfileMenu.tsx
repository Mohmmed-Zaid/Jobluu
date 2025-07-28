import React, { useState } from "react";
import {
  Menu,
  Avatar,
  Switch,
  rem,
  Divider,
} from "@mantine/core";
import {
  IconUserCircle,
  IconMessageCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconArrowsLeftRight,
  IconTrash,
  IconLogout2,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // 🔁 Toggle site-wide dark mode logic (example)
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  // 🔒 Log out functionality (you can update as per your auth logic)
  const handleLogout = () => {
    localStorage.clear(); // or remove token
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      // Call delete API
      console.log("Deleting account...");
    }
  };

  return (
    <Menu shadow="md" width={220} position="bottom-end">
      <Menu.Target>
        <div className="flex cursor-pointer items-center gap-2">
          <div className="text-white font-medium">Mohammed Zaid</div>
          <Avatar src="/avatar.png" alt="You" />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        {/* 👤 Profile link */}
        <Menu.Item
          leftSection={<IconUserCircle size={16} />}
          component={Link}
          to="/profile"
        >
          Profile
        </Menu.Item>

        {/* 💬 Messages */}
        <Menu.Item
          leftSection={<IconMessageCircle size={16} />}
          component={Link}
          to="/messages"
        >
          Messages
        </Menu.Item>

        {/* 📄 Resume */}
        <Menu.Item
          leftSection={<IconFileText size={16} />}
          component={Link}
          to="/resume"
        >
          Resume
        </Menu.Item>

        <Divider my="xs" />

        {/* 🌙 Dark Mode Toggle */}
        <Menu.Item
          leftSection={<IconMoon size={16} />}
          rightSection={
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              size="md"
              color="yellow"
              onLabel={
                <IconSun
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={2.5}
                />
              }
              offLabel={
                <IconMoon
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={2.5}
                />
              }
            />
          }
        >
          Dark Mode
        </Menu.Item>

        <Divider my="xs" />
        <Menu.Label>Account</Menu.Label>

        {/* 🔁 Transfer Data */}
        <Menu.Item leftSection={<IconArrowsLeftRight size={16} />}>
          Transfer my data
        </Menu.Item>

        {/* 🗑️ Delete Account */}
        <Menu.Item
          color="red"
          leftSection={<IconTrash size={16} />}
          onClick={handleDeleteAccount}
        >
          Delete my account
        </Menu.Item>

        {/* 🚪 Logout */}
        <Menu.Item
          leftSection={<IconLogout2 size={16} />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
