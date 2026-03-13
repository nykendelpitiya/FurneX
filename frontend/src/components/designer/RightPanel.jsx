import { useState } from "react";
import { useRoomStore } from "../../store/useRoomStore";

function RightPanel() {

  const [tab, setTab] = useState("room");

  const room = useRoomStore((s) => s.room);
  const setRoom = useRoomStore((s) => s.setRoom);
  const setRoomShape = useRoomStore((s) => s.setRoomShape);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRoom({
      ...room,
      [name]: Number(value)
    });
  };

  const handleWallColor = (e) => {
    setRoom({
      ...room,
      wallColor: e.target.value
    });
  };

  const handleFloorColor = (e) => {
    setRoom({
      ...room,
      floorColor: e.target.value
    });
  };

  return (

    <div className="fixed right-6 top-24 w-72 bg-white rounded-xl shadow-xl p-4 z-40">

      {/* Tabs */}
      <div className="flex gap-2 mb-4">

        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => setTab("room")}
        >
          Room
        </button>

        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => setTab("structure")}
        >
          Structure
        </button>

        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => setTab("furniture")}
        >
          Furniture
        </button>

        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => setTab("deco")}
        >
          Deco
        </button>

      </div>

      {/* ROOM TAB */}
      {tab === "room" && (
        <div>

          {/* ROOM WIDTH */}
          <label className="text-sm block mb-1">
            Room Width
          </label>

          <input
            name="width"
            value={room.width}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
            placeholder="Room Width"
          />

          {/* ROOM HEIGHT */}
          <label className="text-sm block mb-1">
            Room Height
          </label>

          <input
            name="height"
            value={room.height}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
            placeholder="Room Height"
          />

          {/* ROOM SHAPE */}
          <label className="text-sm block mb-1">
            Room Shape
          </label>

          <select
            value={room.shape}
            onChange={(e) => setRoomShape(e.target.value)}
            className="border p-2 w-full mb-3"
          >

            <option value="rectangle">
              Rectangle
            </option>

            <option value="square">
              Square
            </option>

            <option value="lshape">
              L Shape
            </option>

          </select>

          {/* WALL COLOR */}
          <label className="text-sm block mb-1">
            Wall Color
          </label>

          <input
            type="color"
            value={room.wallColor}
            onChange={handleWallColor}
            className="w-full h-10 mb-3 cursor-pointer"
          />

          {/* FLOOR COLOR */}
          <label className="text-sm block mb-1">
            Floor Color
          </label>

          <input
            type="color"
            value={room.floorColor}
            onChange={handleFloorColor}
            className="w-full h-10 cursor-pointer"
          />

        </div>
      )}

      {tab === "structure" && (
        <p>
          Structure tools
        </p>
      )}

      {tab === "furniture" && (
        <p>
          Furniture tools
        </p>
      )}

      {tab === "deco" && (
        <p>
          Decoration tools
        </p>
      )}

    </div>
  );
}

export default RightPanel;