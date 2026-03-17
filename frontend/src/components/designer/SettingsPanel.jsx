import { useRoomStore } from "../../store/useRoomStore";

function SettingsPanel({ open }) {

  const showGrid = useRoomStore((s) => s.showGrid);
  const toggleGrid = useRoomStore((s) => s.toggleGrid);

  if (!open) return null;

  return (
    <div className="fixed left-24 top-24 bg-white rounded-xl shadow-xl p-4 w-56 z-50">

      <h3 className="font-semibold mb-3">
        Settings
      </h3>

      {/* Grid toggle */}
      <div className="flex justify-between items-center mb-3">
        <span>Show Grid</span>

        <input
          type="checkbox"
          checked={showGrid}
          onChange={toggleGrid}
        />
      </div>

      {/* Canvas color */}
      <div className="mb-3">

        <label className="text-sm">
          Canvas Color
        </label>

        <input
          type="color"
          className="w-full mt-1 cursor-pointer"
        />

      </div>

      {/* Snap to grid */}
      <div className="flex justify-between items-center">

        <span>Snap to Grid</span>

        <input
          type="checkbox"
        />

      </div>

    </div>
  );
}

export default SettingsPanel;