import { create } from "zustand";
import { useFurnitureStore } from "./useFurnitureStore";

export const useRoomStore = create((set, get) => ({

  // Room settings
  room: {
    width: 400,
    height: 300,
    wallColor: "#000000",
    floorColor: "#f0f0f0",
    shape: "rectangle"
  },

  // Points for pen-drawn polygon
  roomPoints: [],

  // Grid visibility
  showGrid: true,

  // Snap to grid
  snapToGrid: false,

  // Walls (legacy)
  walls: [],

  // History stacks (Undo / Redo) store snapshots: { room, furniture, roomPoints }
  history: [],
  redoStack: [],

  // Current tool
  currentTool: "move",

  // Zoom level
  zoom: 1,

  // Toggle Grid
  toggleGrid: () =>
    set((state) => ({ showGrid: !state.showGrid })),

  // Toggle Snap to Grid
  toggleSnap: () =>
    set((state) => ({ snapToGrid: !state.snapToGrid })),

  // Internal: create snapshot of current state (room + furniture + roomPoints)
  _createSnapshot: () => {
    const room = get().room;
    const roomPoints = get().roomPoints || [];
    const furniture = useFurnitureStore.getState().furniture || [];
    return { room: JSON.parse(JSON.stringify(room)), furniture: JSON.parse(JSON.stringify(furniture)), roomPoints: JSON.parse(JSON.stringify(roomPoints)) };
  },

  // Push snapshot into history if changed
  pushSnapshot: () =>
    set((state) => {
      const snapshot = get()._createSnapshot();
      const last = state.history.length > 0 ? state.history[state.history.length - 1] : null;
      const lastStr = last ? JSON.stringify(last) : null;
      const newStr = JSON.stringify(snapshot);
      if (lastStr === newStr) return {};
      return { history: [...state.history, snapshot], redoStack: [] };
    }),

  // Change tool
  setTool: (tool) => set({ currentTool: tool }),

  // Update room settings (push snapshot first)
  setRoom: (room) =>
    set((state) => {
      get().pushSnapshot();
      return { room };
    }),

  // Change Room Shape
  setRoomShape: (shape) =>
    set((state) => {
      get().pushSnapshot();
      return { room: { ...state.room, shape: shape } };
    }),

  // Set roomPoints (pen tool)
  setRoomPoints: (points) =>
    set((state) => {
      get().pushSnapshot();
      return { roomPoints: points };
    }),

  // Zoom In
  zoomIn: () => set((state) => ({ zoom: state.zoom + 0.1 })),

  // Zoom Out
  zoomOut: () => set((state) => ({ zoom: state.zoom > 0.2 ? state.zoom - 0.1 : state.zoom })),

  // Reset Zoom
  resetZoom: () => set({ zoom: 1 }),

  // View mode for canvas: "2D" or "3D"
  viewMode: "2D",
  setViewMode: (mode) => set({ viewMode: mode }),

  // Undo: restore last snapshot
  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state;
      const previous = state.history[state.history.length - 1];
      // push current to redo
      const currentSnap = get()._createSnapshot();
      // restore room + roomPoints + furniture
      useFurnitureStore.setState({ furniture: previous.furniture });
      return {
        room: previous.room,
        roomPoints: previous.roomPoints || [],
        history: state.history.slice(0, -1),
        redoStack: [...state.redoStack, currentSnap]
      };
    }),

  // Redo: restore from redoStack
  redo: () =>
    set((state) => {
      if (state.redoStack.length === 0) return state;
      const next = state.redoStack[state.redoStack.length - 1];
      const currentSnap = get()._createSnapshot();
      useFurnitureStore.setState({ furniture: next.furniture });
      return {
        room: next.room,
        roomPoints: next.roomPoints || [],
        redoStack: state.redoStack.slice(0, -1),
        history: [...state.history, currentSnap]
      };
    }),

  // Legacy wall operations (preserve behavior but also snapshot)
  addWall: (wall) =>
    set((state) => {
      get().pushSnapshot();
      return { walls: [...state.walls, wall], redoStack: [] };
    }),

  deleteWall: (index) =>
    set((state) => {
      get().pushSnapshot();
      return { walls: state.walls.filter((_, i) => i !== index), redoStack: [] };
    })

}));