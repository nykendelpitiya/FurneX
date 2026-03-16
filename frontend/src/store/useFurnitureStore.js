import { create } from "zustand";
import { v4 as uuid } from "uuid";

export const useFurnitureStore = create((set) => ({

  furniture: [],
  selectedId: null,

  setSelected: (id) => set({ selectedId: id }),

  /* =========================
     ADD FURNITURE
  ========================= */

  // now takes (model, src, opts)
  addFurniture: (model, src, opts = {}) =>
    set((state) => ({

      furniture: [
        ...state.furniture,
        {
          id: uuid(),

          // store exact model filename (e.g. "dining chair.glb")
          model,
          src,

          x: typeof opts.x === "number" ? opts.x : 300,
          y: typeof opts.y === "number" ? opts.y : 200,

          width: typeof opts.width === "number" ? opts.width : 90,
          height: typeof opts.height === "number" ? opts.height : 90,

          rotation: typeof opts.rotation === "number" ? opts.rotation : 0,

          seatColor: opts.seatColor || "#4A90E2",
          frameColor: opts.frameColor || "#cccccc"
        }
      ]

    })),

  /* =========================
     UPDATE FURNITURE
  ========================= */

  updateFurniture: (id, updates) =>
    set((state) => ({

      furniture: state.furniture.map((item) =>
        item.id === id
          ? { ...item, ...updates }
          : item
      )

    })),

  /* =========================
     DELETE FURNITURE
  ========================= */

  deleteFurniture: (id) =>
    set((state) => ({

      furniture: state.furniture.filter(
        (item) => item.id !== id
      )

    })),

}));