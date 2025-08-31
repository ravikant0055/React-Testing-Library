import Login, { validateEmail } from "../Login";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Test the Login Component", () => {
  test("render the all buttons on login form", async () => {
    render(<Login />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(2);
  });

  test("should be failed on email validation ", () => {
    const testEmail = "ravikant.com";
    expect(validateEmail(testEmail)).not.toBe(true);
  });

  test("email input field should accept email ", () => {
    render(<Login />);
    const email = screen.getByPlaceholderText("Email");
    userEvent.type(email, "ravi");
    expect((email as HTMLInputElement).value).not.toMatch("ravikant@gmail.com");
  });

  test("passport input should have type password ", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("Password");
    expect(password).toHaveAttribute("type", "password");
  });

  test("should display alert if error", async () => {
    render(<Login />);
    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");
    const buttonList = screen.getAllByRole("button");

    await userEvent.type(email, "ravi");
    await userEvent.type(password, "123456");
    await userEvent.click(buttonList[0]);
    const error = await screen.findByText("Failed: Invalid Email");
    expect(error).toBeInTheDocument();
  });

  test("should be able to reset the form ", () => {
    const { getByPlaceholderText, getByTestId } = render(<Login />);
    const resetBtn = getByTestId("reset");
    const emailInputNode = getByPlaceholderText("Email");
    const passwordInputNode = getByPlaceholderText("Password");
    userEvent.click(resetBtn); // we cn use fireEvent also fireEvent.click(resetBtn);
    expect((emailInputNode as HTMLInputElement).value).toMatch("");
    expect((passwordInputNode as HTMLInputElement).value).toMatch("");
  });

  test("should be able to submit the form", async () => {
    render(<Login />);
    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");
    const buttonList = screen.getAllByRole("button");

    await userEvent.type(email, "ravikant@gmail.com");
    await userEvent.type(password, "123456");
    await userEvent.click(buttonList[0]);

    const user = screen.getByText("Success");
    expect(user).toBeInTheDocument();
  });
});