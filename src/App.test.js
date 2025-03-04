import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("renders", () => {
    render(<App />);
  });

  it("can receive a new user and show it on a list", async () => {
    render(<App />);
    // screen.debug();
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const button = screen.getByRole("button");

    await user.click(nameInput);
    await user.keyboard("john");

    await user.click(nameInput); // We focus and activate the input
    // await user.keyboard("jane"); // We fill in the input with the value "jane"
    await user.clear(nameInput); // We clear the input
    await user.keyboard("jane");
    await user.click(emailInput);
    await user.keyboard("jane@jane.com");

    await user.click(button);

    const name = screen.getByRole("cell", { name: "jane" });
    const email = screen.getByRole("cell", { name: "jane@jane.com" });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();

    // Example of negative assertion
    const wrongName = screen.queryByRole("cell", { name: "john" });
    expect(wrongName).not.toBeInTheDocument();
  });
});
