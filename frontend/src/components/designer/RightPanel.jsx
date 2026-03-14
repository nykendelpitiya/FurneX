import { useState } from "react";
import { useRoomStore } from "../../store/useRoomStore";
import { useFurnitureStore } from "../../store/useFurnitureStore";

// CHAIRS
import accentChair from "../../assets/furniture/chairs/accent-chair.svg";
import armChair from "../../assets/furniture/chairs/armchair.svg";
import diningChair from "../../assets/furniture/chairs/dining-chair.svg";
import loungeChair from "../../assets/furniture/chairs/lounge-chair.svg";
import officeChair from "../../assets/furniture/chairs/office-chair.svg";

// TABLES
import coffeeTable from "../../assets/furniture/tables/coffee-table.svg";
import consoleTable from "../../assets/furniture/tables/console-table.svg";
import desk from "../../assets/furniture/tables/desk.svg";
import diningTable from "../../assets/furniture/tables/dining-table.svg";
import sideTable from "../../assets/furniture/tables/side-table.svg";
import roundTable from "../../assets/furniture/tables/round-table.svg";

// SOFAS
import singleSofa from "../../assets/furniture/sofas/single-sofa.svg";
import twoSofa from "../../assets/furniture/sofas/two-seater-sofa.svg";
import threeSofa from "../../assets/furniture/sofas/three-seater-sofa.svg";
import lShapeSofa from "../../assets/furniture/sofas/l-shape-sofa.svg";
import reclinerSofa from "../../assets/furniture/sofas/recliner-sofa.svg";

// BEDS
import singleBed from "../../assets/furniture/beds/single-bed.svg";
import doubleBed from "../../assets/furniture/beds/double-bed.svg";
import queenBed from "../../assets/furniture/beds/queen-bed.svg";
import kingBed from "../../assets/furniture/beds/king-bed.svg";
import bunkBed from "../../assets/furniture/beds/bunk-bed.svg";

// STORAGE
import bookshelf from "../../assets/furniture/storage/bookshelf.svg";
import cabinet from "../../assets/furniture/storage/cabinet.svg";
import displayShelf from "../../assets/furniture/storage/display-shelf.svg";
import sideCabinet from "../../assets/furniture/storage/side-cabinet.svg";
import tvStand from "../../assets/furniture/storage/tv-stand.svg";

const FurnitureCard = ({ name, type, icon, addFurniture }) => (
  <div
    draggable
    onDragStart={(e) => {
      try {
        e.dataTransfer.setData(
          "furniture",
          JSON.stringify({ type, name, src: icon })
        );
        e.dataTransfer.effectAllowed = "copy";
      } catch {
        // Intentionally ignore drag data errors
      }
    }}
    onClick={() => addFurniture(type, icon)}
    className="cursor-pointer border rounded-lg p-3 hover:bg-gray-50 hover:scale-105 transition flex flex-col items-center text-center"
  >
    <img src={icon} alt={name} className="w-12 h-12 mb-1"/>
    <p className="text-xs font-medium">{name}</p>
  </div>
);

function RightPanel() {

  const [tab, setTab] = useState("room");
  const [category, setCategory] = useState(null);

  const room = useRoomStore((s) => s.room);
  const setRoom = useRoomStore((s) => s.setRoom);
  const setRoomShape = useRoomStore((s) => s.setRoomShape);

  const addFurniture = useFurnitureStore((s) => s.addFurniture);

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

    <div className="fixed right-6 top-24 w-72 bg-white rounded-2xl shadow-xl p-4 z-40 max-h-[75vh] overflow-y-auto">

      {/* Tabs */}
      <div className="flex gap-2 mb-4">

        <button
          className={`px-3 py-1 rounded-lg text-sm ${tab==="room" ? "bg-black text-white" : "bg-gray-200"}`}
          onClick={() => {setTab("room"); setCategory(null);}}
        >
          Room
        </button>

        <button
          className={`px-3 py-1 rounded-lg text-sm ${tab==="furniture" ? "bg-black text-white" : "bg-gray-200"}`}
          onClick={() => {setTab("furniture"); setCategory(null);}}
        >
          Furniture
        </button>

        <button
          className={`px-3 py-1 rounded-lg text-sm ${tab==="3d" ? "bg-black text-white" : "bg-gray-200"}`}
          onClick={() => setTab("3d")}
        >
          3D
        </button>

      </div>

      {/* ROOM TAB */}
      {tab === "room" && (
        <div>

          <label className="text-sm block mb-1">Room Width</label>
          <input name="width" value={room.width} onChange={handleChange} className="border rounded p-2 w-full mb-3"/>

          <label className="text-sm block mb-1">Room Height</label>
          <input name="height" value={room.height} onChange={handleChange} className="border rounded p-2 w-full mb-3"/>

          <label className="text-sm block mb-1">Room Shape</label>

          <select value={room.shape} onChange={(e) => setRoomShape(e.target.value)} className="border rounded p-2 w-full mb-3">
            <option value="rectangle">Rectangle</option>
            <option value="square">Square</option>
            <option value="lshape">L Shape</option>
          </select>

          <label className="text-sm block mb-1">Wall Color</label>
          <input type="color" value={room.wallColor} onChange={handleWallColor} className="w-full h-10 mb-3"/>

          <label className="text-sm block mb-1">Floor Color</label>
          <input type="color" value={room.floorColor} onChange={handleFloorColor} className="w-full h-10"/>

        </div>
      )}

      {/* FURNITURE TAB */}
      {tab === "furniture" && (

        <div>

          {!category && (

            <div className="grid grid-cols-2 gap-3">

              <button className="border rounded-lg p-3 hover:bg-gray-50" onClick={() => setCategory("chairs")}>🪑 Chairs</button>
              <button className="border rounded-lg p-3 hover:bg-gray-50" onClick={() => setCategory("tables")}>🪟 Tables</button>
              <button className="border rounded-lg p-3 hover:bg-gray-50" onClick={() => setCategory("sofas")}>🛋 Sofas</button>
              <button className="border rounded-lg p-3 hover:bg-gray-50" onClick={() => setCategory("beds")}>🛏 Beds</button>
              <button className="border rounded-lg p-3 hover:bg-gray-50 col-span-2" onClick={() => setCategory("storage")}>📦 Storage</button>

            </div>

          )}

          {category && (

            <div>

              <button className="mb-3 text-sm text-blue-600" onClick={() => setCategory(null)}>
                ← Back
              </button>

              {category === "chairs" && (
                <div className="grid grid-cols-3 gap-3">
                  <FurnitureCard name="Accent Chair" type="chair" icon={accentChair} addFurniture={addFurniture}/>
                  <FurnitureCard name="Armchair" type="chair" icon={armChair} addFurniture={addFurniture}/>
                  <FurnitureCard name="Dining Chair" type="chair" icon={diningChair} addFurniture={addFurniture}/>
                  <FurnitureCard name="Lounge Chair" type="chair" icon={loungeChair} addFurniture={addFurniture}/>
                  <FurnitureCard name="Office Chair" type="chair" icon={officeChair} addFurniture={addFurniture}/>
                </div>
              )}

              {category === "tables" && (
                <div className="grid grid-cols-3 gap-3">
                  <FurnitureCard name="Coffee Table" type="table" icon={coffeeTable} addFurniture={addFurniture}/>
                  <FurnitureCard name="Console Table" type="table" icon={consoleTable} addFurniture={addFurniture}/>
                  <FurnitureCard name="Desk" type="table" icon={desk} addFurniture={addFurniture}/>
                  <FurnitureCard name="Dining Table" type="table" icon={diningTable} addFurniture={addFurniture}/>
                  <FurnitureCard name="Side Table" type="table" icon={sideTable} addFurniture={addFurniture}/>
                  <FurnitureCard name="Round Table" type="table" icon={roundTable} addFurniture={addFurniture}/>
                </div>
              )}

              {category === "sofas" && (
                <div className="grid grid-cols-3 gap-3">
                  <FurnitureCard name="Single Sofa" type="sofa" icon={singleSofa} addFurniture={addFurniture}/>
                  <FurnitureCard name="2 Seater Sofa" type="sofa" icon={twoSofa} addFurniture={addFurniture}/>
                  <FurnitureCard name="3 Seater Sofa" type="sofa" icon={threeSofa} addFurniture={addFurniture}/>
                  <FurnitureCard name="L Shape Sofa" type="sofa" icon={lShapeSofa} addFurniture={addFurniture}/>
                  <FurnitureCard name="Recliner Sofa" type="sofa" icon={reclinerSofa} addFurniture={addFurniture}/>
                </div>
              )}

              {category === "beds" && (
                <div className="grid grid-cols-3 gap-3">
                  <FurnitureCard name="Single Bed" type="bed" icon={singleBed} addFurniture={addFurniture}/>
                  <FurnitureCard name="Double Bed" type="bed" icon={doubleBed} addFurniture={addFurniture}/>
                  <FurnitureCard name="Queen Bed" type="bed" icon={queenBed} addFurniture={addFurniture}/>
                  <FurnitureCard name="King Bed" type="bed" icon={kingBed} addFurniture={addFurniture}/>
                  <FurnitureCard name="Bunk Bed" type="bed" icon={bunkBed} addFurniture={addFurniture}/>
                </div>
              )}

              {category === "storage" && (
                <div className="grid grid-cols-3 gap-3">
                  <FurnitureCard name="Bookshelf" type="storage" icon={bookshelf} addFurniture={addFurniture}/>
                  <FurnitureCard name="Cabinet" type="storage" icon={cabinet} addFurniture={addFurniture}/>
                  <FurnitureCard name="Display Shelf" type="storage" icon={displayShelf} addFurniture={addFurniture}/>
                  <FurnitureCard name="Side Cabinet" type="storage" icon={sideCabinet} addFurniture={addFurniture}/>
                  <FurnitureCard name="TV Stand" type="storage" icon={tvStand} addFurniture={addFurniture}/>
                </div>
              )}

            </div>

          )}

        </div>

      )}

      {/* 3D TAB */}
      {tab === "3d" && (
        <div className="text-center">
          <button className="bg-black text-white px-4 py-2 rounded-lg w-full">
            View Room in 3D
          </button>
        </div>
      )}

    </div>
  );
}

export default RightPanel;