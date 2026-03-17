import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RoomSetupPanel from "../components/designer/RoomSetupPanel";

// Mock Zustand store
jest.mock("../store/useRoomStore", () => ({
  useRoomStore: () => ({
    setRoom: jest.fn()
  })
}));

test("renders Room Setup Panel", () => {
  render(<RoomSetupPanel />);

  const text = screen.getByText("Room Setup");

  expect(text).toBeInTheDocument();
});