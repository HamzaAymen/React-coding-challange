import { render, screen } from "@testing-library/react";
import PopupPhoto from "../src/app/components/PopupPhoto";
import "@testing-library/jest-dom";

describe("Popup", () => {
  it("Have Images", () => {
    render(<PopupPhoto />);

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
  });

  it("Have button", () => {
    render(<PopupPhoto />);

    const button = screen.queryByRole("button");

    expect(button).toBeInTheDocument();
  });
});
