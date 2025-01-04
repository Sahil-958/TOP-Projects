import { Outlet, useNavigate } from "react-router";
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
  Text,
  NavLink,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SiFdroid } from "react-icons/si";
import { TbCategory } from "react-icons/tb";
import "@mantine/core/styles.css";
import Search from "../components/Search.jsx";
import ThemeSwitcher from "../components/ThemeSwitcher.jsx";

function Root() {
  let color = window.localStorage.getItem("accentColor");
  const [accentColor, setAccentColor] = useState(color || "#397e9eff");
  function updateAccentColor(color) {
    setAccentColor(color);
    //also updaate in local storage
    window.localStorage.setItem("accentColor", color);
  }
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
              <Search />
            </Group>
          </AppShell.Header>
          <AppShell.Navbar p="md">
            <Paper p="md" withBorder shadow="xl" radius="md">
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
            <Categories />
          </AppShell.Navbar>
          <AppShell.Main>
            <Outlet />
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </>
  );
}

function Categories() {
  let navigate = useNavigate();
  let categories = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];

  return (
    <NavLink
      variant="light"
      active={true}
      href="#"
      key="categories"
      label="Categories"
      leftSection={<TbCategory />}
      childrenOffset={28}
    >
      {categories.map((category) => (
        <NavLink
          key={category}
          style={{
            borderLeft: "2px solid var(--mantine-color-default-border)",
          }}
          onClick={() => {
            navigate(`/search?q=${category}`);
          }}
          href="#"
          label={<Text tt={"capitalize"}>{category}</Text>}
        ></NavLink>
      ))}
    </NavLink>
  );
}

export default Root;
