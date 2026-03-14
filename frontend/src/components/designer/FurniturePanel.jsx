import { useFurnitureStore } from "../../store/useFurnitureStore";

import accentChair from "../../assets/furniture/chairs/accent-chair.svg";
import armChair from "../../assets/furniture/chairs/armchair.svg";
import diningChair from "../../assets/furniture/chairs/dining-chair.svg";
import loungeChair from "../../assets/furniture/chairs/lounge-chair.svg";
import officeChair from "../../assets/furniture/chairs/office-chair.svg";

function FurniturePanel() {

  const addFurniture = useFurnitureStore((s) => s.addFurniture);

  const items = [
    { name: "Accent Chair", type: "chair", src: accentChair },
    { name: "Armchair", type: "chair", src: armChair },
    { name: "Dining Chair", type: "chair", src: diningChair },
    { name: "Lounge Chair", type: "chair", src: loungeChair },
    { name: "Office Chair", type: "chair", src: officeChair }
  ];

  // drag start
  const handleDragStart = (e, item) => {

    e.dataTransfer.setData(
      "furniture",
      JSON.stringify(item)
    );

  };

  return (

    <div className="grid grid-cols-2 gap-3">

      {items.map((item) => (

        <div
          key={item.name}

          draggable

          onDragStart={(e) => handleDragStart(e, item)}

          className="border p-2 rounded cursor-grab hover:bg-gray-100 text-center"

          onClick={() => addFurniture(item.type, item.src)}
        >

          <img
            src={item.src}
            className="w-10 h-10 mx-auto pointer-events-none"
          />

          <p className="text-xs">{item.name}</p>

        </div>

      ))}

    </div>

  );

}

export default FurniturePanel;