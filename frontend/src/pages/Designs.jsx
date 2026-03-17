
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Designs(){

const [designs,setDesigns] = useState([]);
const navigate = useNavigate();

// LOAD DESIGNS
useEffect(()=>{
  fetch("http://localhost:5002/api/designs")
    .then(res=>res.json())
    .then(data=>{
      console.log("Designs:",data);
      setDesigns(data);
    });
},[]);

// DELETE
const handleDelete = async(id)=>{
  const confirmDelete = window.confirm("Delete this design?");
  if(!confirmDelete) return;
  await fetch(`http://localhost:5002/api/designs/${id}`,{
    method:"DELETE"
  });
  setDesigns(prev=>prev.filter(d=>d._id!==id));
};

// VIEW
const handleView = (id)=>{
  navigate({ pathname: "/projects", search: `?id=${encodeURIComponent(id)}` });
};

// EDIT
const handleEdit = (id)=>{
  navigate({ pathname: "/projects", search: `?id=${encodeURIComponent(id)}&edit=true` });
};

return(
<div className="p-4 sm:p-6 md:p-8 lg:p-10">
  <h1 className="mb-6 text-2xl font-bold text-center sm:mb-8 sm:text-3xl sm:text-left">My Designs</h1>
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-6">
    {designs.map((design)=>(
      <div key={design._id} className="flex flex-col h-full p-3 bg-white shadow sm:p-4 rounded-xl">
        {/* preview */}
        <div className="flex items-center justify-center w-full h-40 mb-3 overflow-hidden bg-gray-200 rounded sm:h-44">
          {design.previewImage ? (
            <img src={design.previewImage} alt="preview" className="object-cover w-full h-full" />
          ) : ( <span className="text-gray-400">Preview</span> )}
        </div>
        <h2 className="text-base font-semibold truncate sm:text-lg">{design.designName}</h2>
        <p className="mb-2 text-xs text-gray-500 sm:mb-3 sm:text-sm">living room</p>
        <div className="space-y-1 text-xs text-gray-600 sm:text-sm">
          <p>📐 Room Size: {design.room?.width} x {design.room?.height}</p>
          <p>🧱 Layout: {design.room?.shape}</p>
          <p>🪑 Furnishings: {design.furniture?.length || 0} items placed</p>
        </div>
        <div className="flex items-center gap-3 mt-2 sm:mt-3">
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm">Wall</span>
            <div className="w-4 h-4 rounded" style={{background:design.room?.wallColor}} />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm">Floor</span>
            <div className="w-4 h-4 rounded" style={{background:design.room?.floorColor}} />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-3 sm:flex-row sm:gap-3 sm:mt-4">
          <button onClick={()=>handleView(design._id)} className="w-full px-4 py-1 text-white bg-black rounded sm:w-auto">View</button>
          <button onClick={()=>handleEdit(design._id)} className="w-full text-gray-600 hover:text-black sm:w-auto">Edit</button>
          <button onClick={()=>handleDelete(design._id)} className="w-full text-red-500 hover:text-red-700 sm:w-auto">Delete</button>
        </div>
      </div>
    ))}
  </div>
</div>
);
}

export default Designs;