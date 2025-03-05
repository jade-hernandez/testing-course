import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

describe("UserForm", () => {
  test("it renders", () => {
    render(<UserForm />);
  });

  test("it shows two inputs and a button", () => {
    // render the component
    render(<UserForm />);

    // Manipulate the component or find an element in it
    const inputs = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    // Assertion - make sure the component is doing
    // what we expect it to do
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
  });

  test("it shows a name input and an email input", () => {
    // render the component
    render(<UserForm />);

    // Manipulate the component or find an element in it
    const inputs = screen.getAllByRole("textbox");
    // Input are "name" and "email"
    const nameInput = screen.getByRole("textbox", { name: /^Name$/ });
    const emailInput = screen.getByRole("textbox", { name: /^Email$/ });

    // Assertion - make sure the component is doing
    // what we expect it to do
    expect(inputs).toHaveLength(2);
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  test("it calls onUserAdd when the form is submitted", async () => {
    const mockOnUserAdd = jest.fn();
    // Try to render my component
    render(<UserForm onUserAdd={mockOnUserAdd} />);

    // Find the two inputs
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });

    // Simulate typing in a name
    await user.click(nameInput);
    await user.keyboard("jane");

    // Simulate typing in an email
    await user.click(emailInput);
    await user.keyboard("jane@jane.com");

    // Find the button
    const button = screen.getByRole("button");

    // Simulate clicking the button
    await user.click(button);

    // Assertion to make sure 'onUserAdd' gets called with email/name
    expect(mockOnUserAdd).toHaveBeenCalled();
    expect(mockOnUserAdd).toHaveBeenCalledWith({
      name: "jane",
      email: "jane@jane.com",
    });
  });

  test("it empties the two inputs when form is submitted", () => {
    render(<UserForm onUserAdd={() => {}} />);

    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const button = screen.getByRole("button");

    user.click(nameInput);
    user.keyboard("jane");
    user.click(emailInput);
    user.keyboard("jane@jane.com");

    user.click(button);

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
  });
});
