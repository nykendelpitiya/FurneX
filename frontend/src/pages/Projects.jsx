import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LeftToolbar from "../components/designer/LeftToolbar";
import { useRoomStore } from "../store/useRoomStore";
import RightPanel from "../components/designer/RightPanel";

import RoomCanvas from "../components/designer/RoomCanvas";

function Projects() {


  const [designName, setDesignName] = useState("");
  const [loadedDesign, setLoadedDesign] = useState(null);
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";

  // Room and furniture store
  const room = useRoomStore((s) => s.room);
  const setRoom = useRoomStore((s) => s.setRoom);
  const furniture = useRoomStore((s) => s.furniture);
  const setFurniture = useRoomStore((s) => s.setFurniture);

  // Get designId from search params
  const designId = searchParams.get("id");

  // Loader for design
  useEffect(() => {
    if (!designId) return;
    fetch(`http://localhost:5002/api/designs/${designId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Loaded design:", data);
        setLoadedDesign(data);
        setDesignName(data.designName || "");
        setRoom(data.room);
        setFurniture(data.furniture || []);
      });
  }, [designId, setRoom, setFurniture]);

  // Update design handler (for edit mode)
  const handleUpdateDesign = async () => {
    if (!designName) {
      alert("Please enter a design name");
      return;
    }
    const canvases = document.querySelectorAll("canvas");
    let previewImage = "";
    if (canvases.length > 1) {
      previewImage = canvases[1].toDataURL("image/png");
    } else if (canvases.length === 1) {
      previewImage = canvases[0].toDataURL("image/png");
    }
    const designData = {
      designName,
      room,
      furniture,
      previewImage
    };
    try {
      const response = await fetch(`http://localhost:5002/api/designs/${designId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(designData)
      });
      const data = await response.json();
      console.log("Design updated:", data);
      alert("Design updated successfully!");
    } catch (error) {
      console.error("Error updating design:", error);
      alert("Error updating design");
    }
  };

  const handleSaveDesign = async () => {
    if (!designName) {
      alert("Please enter a design name");
      return;
    }

    const canvases = document.querySelectorAll("canvas");
    let previewImage = "";
    if (canvases.length > 1) {
      // 3D canvas
      previewImage = canvases[1].toDataURL("image/png");
    } else if (canvases.length === 1) {
      // 2D canvas
      previewImage = canvases[0].toDataURL("image/png");
    }

    const designData = {
      designName,
      room,
      furniture,
      previewImage
    };

    try {
      const response = await fetch("http://localhost:5002/api/designs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(designData)
      });

      const data = await response.json();

      console.log("Design saved:", data);

      alert("Design saved successfully!");

      setDesignName("");

    } catch (error) {

      console.error("Error saving design:", error);
      alert("Error saving design");

    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gray-100">
      {/* Left Toolbar */}
      <LeftToolbar />

      {/* Save/Edit Panel */}
      <div className="absolute top-4 left-56 bg-white shadow-lg p-2 rounded-lg flex gap-2 items-center z-10 w-[320px]">
        <input
          type="text"
          placeholder="Design name"
          value={designName}
          onChange={(e) => setDesignName(e.target.value)}
          className="border p-2 rounded-md outline-none text-base transition-all duration-200 focus:ring-2 focus:ring-[#1F5A2E] flex-1"
        />
        {isEditMode ? (
          <button
            onClick={handleUpdateDesign}
            className="px-4 py-2 font-semibold text-white transition-all duration-200 transform bg-blue-600 rounded-md shadow hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleSaveDesign}
            className="bg-[#1F5A2E] hover:bg-[#17451F] text-white px-4 py-2 rounded-md font-semibold shadow transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1F5A2E] focus:ring-offset-2"
          >
            Save
          </button>
        )}
      </div>

      {/* Canvas Workspace */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Pass loadedDesign as prop if RoomCanvas supports it, or use context/store as needed */}
        <RoomCanvas loadedDesign={loadedDesign} />
      </div>

      {/* Right Panel */}
      <RightPanel />
    </div>
  );
}

export default Projects;