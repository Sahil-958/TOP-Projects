import {
  useMantineColorScheme,
  useMantineTheme,
  SegmentedControl,
  Center,
} from "@mantine/core";
import { FaSun, FaMoon, FaAdjust } from "react-icons/fa";
import "@mantine/core/styles.css";

export default function ThemeSwitcher() {
  const theme = useMantineTheme();
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  return (
    <SegmentedControl
      fullWidth
      defaultValue={colorScheme}
      color={theme.primaryColor}
      onChange={(val) => {
        val && setColorScheme(val);
      }}
      data={[
        {
          value: "light",
          label: (
            <Center style={{ gap: 10 }}>
              <FaSun />
              <span>Light</span>
            </Center>
          ),
        },
        {
          value: "auto",
          label: (
            <Center style={{ gap: 10 }}>
              {/* <IconCode style={{ width: rem(16), height: rem(16) }} /> */}
              <FaAdjust />
              <span>Auto</span>
            </Center>
          ),
        },
        {
          value: "dark",
          label: (
            <Center style={{ gap: 10 }}>
              <FaMoon />
              <span>Dark</span>
            </Center>
          ),
        },
      ]}
    />
  );
}
