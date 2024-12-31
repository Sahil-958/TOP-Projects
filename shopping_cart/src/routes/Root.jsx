import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
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
  Skeleton,
  Flex,
  Avatar,
  Title,
  Stack,
  Autocomplete,
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
              <Search />
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

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchSuggestionLabel, setSearchSuggestionLabel] = useState(
    Array.from({ length: 5 }, (_, i) => `Suggestion ${i + 1}`),
  );
  const [searchSuggestion, setSearchSuggestion] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    console.log("fetching data");
    const fetchData = async () => {
      try {
        await fetch(
          `https://dummyjson.com/products/search?q=${searchValue}&limit=5&delay=2000`,
          { signal: controller.signal },
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setSearchSuggestion({
              ...data,
            });
            setSearchSuggestionLabel([
              {
                group: `${data.total} results found for Term: "${searchValue}"`,
                items: data.products.map((product) => product.description),
              },
            ]);
          });
        console.log("fetched");
      } catch (err) {
        console.log("Aborted");
        return;
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [searchValue]);

  function optionsFilter({ options }) {
    return options; //filtering is happeing via api so just return the original
  }

  function getSerachTermSuggestionCard(res) {
    const product = searchSuggestion?.products?.find(
      (product) => product.description === res.option.value,
    );
    return (
      <>
        <Flex
          className="w-full"
          direction={"row"}
          gap={5}
          justify={"space-between"}
          align={"center"}
        >
          <Skeleton height={70} width={60} radius="sm" visible={isLoading}>
            <Avatar src={product?.images[0]} size={56} radius="xl" />
          </Skeleton>
          <Stack gap={5} className="w-full">
            <Skeleton
              height={20}
              width={"100%"}
              radius="sm"
              visible={isLoading}
            >
              <Title size="md" textWrap="pretty">
                {product?.title}
              </Title>
            </Skeleton>
            <Skeleton
              height={45}
              width={"100%"}
              radius="sm"
              visible={isLoading}
            >
              <Title
                truncate={"end"}
                lineClamp={2}
                size="sm"
                c="dimmed"
                textWrap="pretty"
              >
                {product?.description}
              </Title>
            </Skeleton>
          </Stack>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Autocomplete
        value={searchValue}
        onChange={setSearchValue}
        variant="filled"
        size="sm"
        radius="md"
        maxDropdownHeight={800}
        data={searchSuggestionLabel}
        filter={optionsFilter}
        renderOption={getSerachTermSuggestionCard}
        leftSectionPointerEvents="none"
        leftSection={<FaSearch />}
        placeholder="App search"
      />
    </>
  );
}

function ThemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
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
