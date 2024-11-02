import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { expect } from "vitest";

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("App", () => {
  it("renders headline", () => {
    render(<App />);

    screen.debug();
    const msg = screen.getByRole("heading", { name: /Vite \+ React/i });
    expect(msg).toBeVisible();
    // check if App components renders headline
  });

  it("renders button", async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole("button", { name: /count is \d/i });
    expect(button).toBeVisible();
    await user.click(button);
    expect(button).toHaveTextContent("count is 1");
    console.log(button.textContent);
  });
});

