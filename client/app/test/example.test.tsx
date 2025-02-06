import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
function TestComponent() {
  return <h1>Hello, Remix!</h1>;
}

test("renders Hello, Remix!", () => {
  render(<TestComponent />);
  expect(screen.getByText("Hello, Remix!")).toBeInTheDocument();
});
