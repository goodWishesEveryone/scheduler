import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Button from "components/Button";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Button />);
});
// 1
it("renders its `children` prop as text", () => {
  const { getByText } = render(<Button>Default</Button>);
  expect(getByText("Default")).toBeInTheDocument();
});
// 2
it("renders a default button style", () => {
  const { getByText } = render(<Button>Default</Button>);
  expect(getByText("Default")).toHaveClass("button");
});
// 3
it("renders a confirm button", () => {
  const { getByText } = render(<Button confirm>Confirm</Button>);
  expect(getByText("Confirm")).toHaveClass("button--confirm");
});
// 4
it("renders a danger button", () => {
  const { getByText } = render(<Button danger>Danger</Button>);
  expect(getByText("Danger")).toHaveClass("button--danger");
});
// 5
it("renders a clickable button", () => {

  const handleClick = jest.fn();
  const { getByText } = render(
    <Button onClick={handleClick}>Clickable</Button>
  );

  const button = getByText("Clickable");

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
// 6
it("renders a disabled button", () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <Button disabled onClick={handleClick}>
      Disabled
    </Button>
  );

  const button = getByText("Disabled");

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(0);
});
// 7
it("renders without crashing", () => {
  render(<Button />);
});
// 8
it("renders its `children` prop as text", () => {
  const { getByText } = render(<Button>Default</Button>);
  expect(getByText("Default")).toBeInTheDocument();
});
