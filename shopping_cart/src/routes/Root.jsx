import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { generateColors } from "@mantine/colors-generator";
import {
  MantineProvider,
  ColorPicker,
  Popover,
  ActionIcon,
  Select,
  Space,
  useMantineColorScheme,
  useMantineTheme,
  AppShell,
  Burger,
  Group,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoMdColorPalette } from "react-icons/io";
import { SiFdroid } from "react-icons/si";
import { FaSun, FaMoon, FaAdjust, FaSearch } from "react-icons/fa";
import "@mantine/core/styles.css";

function Root() {
  const [accentColor, setAccentColor] = useState("rgba(47, 119, 150, 0.7)");
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <MantineProvider
        theme={{
          primaryColor: "custom",
          colors: { custom: generateColors(accentColor) },
        }}
      >
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Header>
            <Group grow h="100%" px="md">
              <Group>
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="sm"
                  size="sm"
                />
                <SiFdroid size={20} />
              </Group>
              <TextInput
                variant="filled"
                size="xs"
                radius="md"
                leftSectionPointerEvents="none"
                leftSection={<FaSearch />}
                placeholder="App search"
              />
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="md">
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
                <Space h="xs" />
                <ThemeToggle />
              </Popover.Dropdown>
            </Popover>
          </AppShell.Navbar>
          <AppShell.Main>
            <Outlet />
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </>
  );
}

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
