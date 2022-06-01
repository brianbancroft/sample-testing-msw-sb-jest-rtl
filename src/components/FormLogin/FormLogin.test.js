import { screen, fireEvent, waitFor } from "@testing-library/react";

import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";

import * as stories from "./FormLogin.stories";

const { Primary } = composeStories(stories);

it("Renders without error", () => {
  render(<Primary />);
});

const setup = async () => {
  const handleClose = jest.fn();
  const utils = await render(<Primary handleClose={handleClose} />);
  const usernameField = screen.getByLabelText(/Username/);
  const passwordField = screen.getByLabelText(/Password/);
  const submitButton = screen.getByRole("button", {
    name: /Sign In/i,
  });

  return {
    usernameField,
    passwordField,
    submitButton,
    handleClose,
    ...utils,
  };
};

describe("form elements", () => {
  it("Contains all form elements", async () => {
    const { usernameField, passwordField, submitButton } = await setup();

    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});

describe("With a correct username and password", () => {
  test("The handleClose function prop is triggered", async () => {
    const { usernameField, passwordField, submitButton, handleClose } =
      await setup();

    fireEvent.change(usernameField, { target: { value: faker.lorem.word() } });
    fireEvent.change(passwordField, { target: { value: faker.lorem.word() } });

    await fireEvent.click(submitButton);

    await waitFor(() => expect(handleClose).toHaveBeenCalled());
  });
});

describe("With an incorrect password that returns a 401 response", () => {
  test("An error appears", async () => {
    const { usernameField, passwordField, submitButton, handleClose } =
      await setup();

    fireEvent.change(usernameField, { target: { value: faker.lorem.word() } });
    // This password triggers a bad password response
    fireEvent.change(passwordField, { target: { value: "badpassword" } });

    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/Invalid username or password/)
    ).toBeInTheDocument();
    expect(handleClose).not.toHaveBeenCalled();
  });
});
