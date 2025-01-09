import "./App.css";

import { Outlet, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { generateColors } from "@mantine/colors-generator";
import {
  MantineProvider,
  ColorInput,
  Space,
  Paper,
  AppShell,
  Burger,
  Group,
  Slider,
  NavLink,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SiFdroid } from "react-icons/si";
import { GoHome } from "react-icons/go";
import "@mantine/core/styles.css";
import Search from "./components/Search.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher.jsx";
import CategoriesButton from "./components/CategoriesButton.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);
  let color = window.localStorage.getItem("accentColor");
  const [accentColor, setAccentColor] = useState(color || "#397e9eff");
  const [primaryShade, setPrimaryShade] = useState(7);
  function updateAccentColor(color) {
    setAccentColor(color);
    //also updaate in local storage
    window.localStorage.setItem("accentColor", color);
  }
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <MantineProvider
        defaultColorScheme="auto"
        theme={{
          primaryColor: "custom",
          primaryShade: primaryShade,
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
              <Search />
            </Group>
          </AppShell.Header>
          <AppShell.Navbar>
            <Paper p="md" m={"sm"} withBorder shadow="xl" radius="md">
              <Slider
                value={primaryShade}
                min={0}
                max={9}
                step={1}
                onChange={setPrimaryShade}
              />
              <Space h="xs" />
              <ColorInput
                variant="filled"
                disallowInput
                onChange={updateAccentColor}
                defaultValue={accentColor}
                format="hexa"
              />
              <Space h="xs" />
              <ThemeSwitcher />
            </Paper>
            <Space h="xs" />
            <NavLink
              variant="light"
              active={location.pathname === "/app"}
              href="#"
              key="home"
              label="Home"
              leftSection={<GoHome />}
              onClick={() => navigate("/app")}
            ></NavLink>
            <CategoriesButton />
          </AppShell.Navbar>
          <AppShell.Main>
            <Outlet />
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </>
  );
}

export default App;
