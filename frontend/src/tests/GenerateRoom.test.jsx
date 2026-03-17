import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RoomSetupPanel from "../components/designer/RoomSetupPanel";

test("generate room button exists", () => {
  render(<RoomSetupPanel />);
  const button = screen.getByText(/generate room/i);
  expect(button).toBeInTheDocument();
});