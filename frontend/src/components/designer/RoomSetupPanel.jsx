import { useState } from "react";
import { useRoomStore } from "../../store/useRoomStore";

function RoomSetupPanel() {

  const setRoom = useRoomStore((s) => s.setRoom);

  const [width,setWidth] = useState(400);
  const [height,setHeight] = useState(300);

  const generateRoom = () => {

    setRoom({
      width: Number(width),
      height: Number(height),
      color:"#e5e5e5"
    });

  };

  return (

    <div className="bg-white p-4 rounded-xl shadow w-60">

      <h3 className="font-semibold mb-3">Room Setup</h3>

      <input
        type="number"
        placeholder="Width"
        value={width}
        onChange={(e)=>setWidth(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        type="number"
        placeholder="Height"
        value={height}
        onChange={(e)=>setHeight(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={generateRoom}
        className="bg-green-600 text-white px-3 py-2 rounded w-full"
      >
        Generate Room
      </button>

    </div>

  );
}

export default RoomSetupPanel;