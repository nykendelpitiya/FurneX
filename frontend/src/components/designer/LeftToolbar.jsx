import {
  Move,
  Square,
  Pencil,
  Layers,
  Grid,
  Settings,
  ZoomIn,
  ZoomOut,
  Undo2,
  Redo2
} from "lucide-react";

import { useRoomStore } from "../../store/useRoomStore";
import { useFurnitureStore } from "../../store/useFurnitureStore";
import SettingsPanel from "./SettingsPanel";
import { useState } from "react";

function LeftToolbar() {

  const toggleGrid = useRoomStore((s) => s.toggleGrid);
  const setTool = useRoomStore((s) => s.setTool);
  const currentTool = useRoomStore((s) => s.currentTool);

  const selectedId = useFurnitureStore((s) => s.selectedId);
  const deleteFurniture = useFurnitureStore((s) => s.deleteFurniture);
  const setSelected = useFurnitureStore((s) => s.setSelected);

  const zoomIn = useRoomStore((s) => s.zoomIn);
  const zoomOut = useRoomStore((s) => s.zoomOut);

  const undo = useRoomStore((s) => s.undo);
  const redo = useRoomStore((s) => s.redo);

  const [openSettings, setOpenSettings] = useState(false);

  return (
    <>

      {/* Toolbar */}
      <div className="fixed left-6 top-24 z-50 bg-white rounded-xl shadow-lg p-3 flex flex-col gap-4">

        {/* Move Tool */}
        <button
          className={`tool-btn ${currentTool === "move" ? "bg-gray-200" : ""}`}
          onClick={() => setTool("move")}
        >
          <Move size={20} />
        </button>

        {/* Room Tool */}
        <button className="tool-btn">
          <Square size={20} />
        </button>

        {/* Pen Tool */}
        <button
          className={`tool-btn ${currentTool === "pen" ? "bg-gray-200" : ""}`}
          onClick={() => setTool("pen")}
        >
          <Pencil size={20} />
        </button>

        {/* Structure */}
        <button className="tool-btn">
          <Layers size={20} />
        </button>

        {/* Delete */}
        <button
          className="tool-btn"
          disabled={!selectedId}
          onClick={() => {
            if (!selectedId) return;
            if (selectedId === "room") {
              // delete room: reset to defaults
              useRoomStore.getState().pushSnapshot();
              useRoomStore.getState().setRoom({ width: 0, height: 0, wallColor: "#000000", floorColor: "#ffffff", shape: "rectangle" });
              setSelected(null);
            } else {
              useRoomStore.getState().pushSnapshot();
              deleteFurniture(selectedId);
              setSelected(null);
            }
          }}
        >
          🗑
        </button>

        {/* Undo */}
        <button
          className="tool-btn"
          onClick={undo}
        >
          <Undo2 size={20} />
        </button>

        {/* Redo */}
        <button
          className="tool-btn"
          onClick={redo}
        >
          <Redo2 size={20} />
        </button>

        {/* Grid Toggle */}
        <button
          className="tool-btn"
          onClick={toggleGrid}
        >
          <Grid size={20} />
        </button>

        {/* Zoom In */}
        <button
          className="tool-btn"
          onClick={zoomIn}
        >
          <ZoomIn size={20} />
        </button>

        {/* Zoom Out */}
        <button
          className="tool-btn"
          onClick={zoomOut}
        >
          <ZoomOut size={20} />
        </button>

        {/* Settings */}
        <button
          className="tool-btn"
          onClick={() => setOpenSettings(!openSettings)}
        >
          <Settings size={20} />
        </button>

      </div>

      {/* Settings Panel */}
      <SettingsPanel open={openSettings} />

    </>
  );
}

export default LeftToolbar;