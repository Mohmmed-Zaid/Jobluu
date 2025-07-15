import React, { useState } from "react";
import {
  Menu,
  Avatar,
  Switch,
  rem,
} from "@mantine/core";
import {
  IconSearch,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconUserCircle,
  IconFileText,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Menu shadow="md" width={220} closeOnItemClick>
      <Menu.Target>
        <div className="flex cursor-pointer items-center gap-2">
          <div className="text-white font-medium">Mohmmed Zaid</div>
          <Avatar src="/avatar.png" alt="You" />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        {/* Navigate to profile page with <Link> */}
        <Menu.Item
          leftSection={<IconUserCircle size={16} />}
          component={Link}
          to="/profile"
        >
          Profile
        </Menu.Item>

        <Menu.Item leftSection={<IconMessageCircle size={16} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconFileText size={16} />}>
          Resume
        </Menu.Item>

        {/* Dark Mode Toggle */}
        <Menu.Item
          leftSection={<IconMoon size={16} />}
          rightSection={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode((prev) => !prev)}
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

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item leftSection={<IconArrowsLeftRight size={16} />}>
          Transfer my data
        </Menu.Item>
        <Menu.Item color="red" leftSection={<IconTrash size={16} />}>
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
