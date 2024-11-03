import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { generateColors } from "@mantine/colors-generator";
import {
  MantineProvider,
  ColorPicker,
  Popover,
  ActionIcon,
  Select,
  useMantineColorScheme,
} from "@mantine/core";
import { IoMdColorPalette } from "react-icons/io";
import { FaSun, FaMoon, FaAdjust } from "react-icons/fa";

function Root() {
  const [accentColor, setAccentColor] = useState("rgba(47, 119, 150, 0.7)");
  return (
    <>
      <MantineProvider
        theme={{
          primaryColor: "custom",
          colors: { custom: generateColors(accentColor) },
        }}
      >
        <div className="flex flex-col">
          <Popover width={300} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <ActionIcon>
                <IoMdColorPalette />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <ColorPicker
                format="rgba"
                fullWidth
                value={accentColor}
                onChange={setAccentColor}
              />
              <ThemeToggle />
            </Popover.Dropdown>
          </Popover>
          <Outlet />
        </div>
      </MantineProvider>
    </>
  );
}

import React from "react";

function ThemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  console.log(colorScheme);
  const getIcon = (scheme) => {
    switch (scheme) {
      case "auto":
        return <FaAdjust />;
      case "dark":
        return <FaMoon />;
      case "light":
        return <FaSun />;
      default:
        return <FaAdjust />;
    }
  };
  return (
    <Select
      leftSection={getIcon(colorScheme)}
      leftSectionPointerEvents="none"
      defaultValue={colorScheme}
      data={["auto", "dark", "light"]}
      onChange={(val) => {
        if (val) setColorScheme(val);
      }}
    />
  );
}

export default Root;
