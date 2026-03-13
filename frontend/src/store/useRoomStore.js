import { create } from "zustand";

export const useRoomStore = create((set) => ({

  // Room settings
  room: {
    width: 400,
    height: 300,
    wallColor: "#000000",
    floorColor: "#f0f0f0",
    shape: "rectangle"
  },

  // Grid visibility
  showGrid: true,

  // Snap to grid
  snapToGrid: false,

  // Walls
  walls: [],

  // History stacks (Undo / Redo)
  history: [],
  redoStack: [],

  // Current tool
  currentTool: "move",

  // Zoom level
  zoom: 1,

  // Toggle Grid
  toggleGrid: () =>
    set((state) => ({
      showGrid: !state.showGrid
    })),

  // Toggle Snap to Grid
  toggleSnap: () =>
    set((state) => ({
      snapToGrid: !state.snapToGrid
    })),

  // Add new wall
  addWall: (wall) =>
    set((state) => ({
      history: [...state.history, state.walls],
      walls: [...state.walls, wall],
      redoStack: []
    })),

  // Delete wall
  deleteWall: (index) =>
    set((state) => ({
      history: [...state.history, state.walls],
      walls: state.walls.filter((_, i) => i !== index),
      redoStack: []
    })),

  // Change tool
  setTool: (tool) =>
    set({
      currentTool: tool
    }),

  // Update room settings
  setRoom: (room) =>
    set({
      room
    }),

  // Change Room Shape
  setRoomShape: (shape) =>
    set((state) => ({
      room: {
        ...state.room,
        shape: shape
      }
    })),

  // Zoom In
  zoomIn: () =>
    set((state) => ({
      zoom: state.zoom + 0.1
    })),

  // Zoom Out
  zoomOut: () =>
    set((state) => ({
      zoom: state.zoom > 0.2 ? state.zoom - 0.1 : state.zoom
    })),

  // Reset Zoom
  resetZoom: () =>
    set({
      zoom: 1
    }),

  // Undo
  undo: () =>
    set((state) => {

      if (state.history.length === 0) return state;

      const previous = state.history[state.history.length - 1];

      return {
        walls: previous,
        history: state.history.slice(0, -1),
        redoStack: [...state.redoStack, state.walls]
      };
    }),

  // Redo
  redo: () =>
    set((state) => {

      if (state.redoStack.length === 0) return state;

      const next = state.redoStack[state.redoStack.length - 1];

      return {
        walls: next,
        redoStack: state.redoStack.slice(0, -1),
        history: [...state.history, state.walls]
      };
    })

}));