import { Outlet, useNavigate } from "react-router";
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
  AppShell,
  Burger,
  Group,
  Skeleton,
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
  let color = window.localStorage.getItem("accentColor");
  const [accentColor, setAccentColor] = useState(
    color || "rgba(47, 119, 150, 0.7)",
  );
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
                  onChange={updateAccentColor}
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
  let navigate = useNavigate();
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchSuggestionLabel, setSearchSuggestionLabel] = useState([
    {
      group: null,
      items: Array.from({ length: 5 }, (_, i) => `Suggestion ${i + 1}`),
    },
  ]);
  const [searchSuggestion, setSearchSuggestion] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setSearchSuggestionLabel((prev) => [
      {
        ...prev[0],
        items:
          prev[0].items.length === 0
            ? Array.from({ length: 5 }, (_, i) => `Suggestion ${i + 1}`)
            : prev[0].items,
        group:
          searchValue.length > 0
            ? `Searching for Term: "${searchValue}"`
            : "Getting Suggestions",
      },
    ]);
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchValue}&limit=5&delay=5000`,
          { signal: controller.signal },
        );
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setSearchSuggestion({ ...data });
        setSearchSuggestionLabel([
          {
            group:
              searchValue.length > 0
                ? `${data.total} results found for Term: "${searchValue}"`
                : `Top 5 from ${data.total} Suggestions`,
            items: data.products.map((product) => product.title),
          },
        ]);
        setIsLoading(false);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted.");
        } else {
          console.error("Error during fetch:", error);
        }
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
      (product) => product.title === res.option.value,
    );
    return (
      <>
        <Group w={"100%"} gap={5} wrap="nowrap">
          <Skeleton height={70} width={60} radius="sm" visible={isLoading}>
            <Avatar src={product?.images[0]} size={56} radius="xl" />
          </Skeleton>
          <Stack gap={5} w={"100%"}>
            <Skeleton height={20} radius="sm" visible={isLoading}>
              <Title size="md" lineClamp={1} textWrap="pretty">
                {product?.title}
              </Title>
            </Skeleton>
            <Skeleton height={45} radius="sm" visible={isLoading}>
              <Title className="text-nowrap" lineClamp={2} size="sm" c="dimmed">
                {product?.description}
              </Title>
            </Skeleton>
          </Stack>
        </Group>
      </>
    );
  }

  function handleOptionSubmit(option) {
    navigate(`/search?q=${option}`);
  }

  return (
    <>
      <Autocomplete
        value={searchValue}
        dropdownOpened={dropdownOpened}
        onClickCapture={setDropdownOpened}
        onFocusCapture={setDropdownOpened}
        onChange={(val) => {
          setSearchValue(val);
        }}
        onOptionSubmit={(val) => {
          //handleOptionSubmit(val);
          setDropdownOpened(false);
        }}
        onBlur={() => setDropdownOpened(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleOptionSubmit(searchValue);
            setDropdownOpened(false);
          } else if (e.key === "Escape") {
            setDropdownOpened(false);
          }
        }}
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
