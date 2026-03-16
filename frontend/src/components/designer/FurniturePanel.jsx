import { useFurnitureStore } from "../../store/useFurnitureStore";

// chairs
import accentChair from "../../assets/furniture/chairs/accent-chair.svg";
import armChair from "../../assets/furniture/chairs/armchair.svg";
import diningChair from "../../assets/furniture/chairs/dining-chair.svg";
import loungeChair from "../../assets/furniture/chairs/lounge-chair.svg";
import officeChair from "../../assets/furniture/chairs/office-chair.svg";

function FurniturePanel() {

  const addFurniture = useFurnitureStore((s) => s.addFurniture);

  const items = [

    // CHAIRS
    { name: "Accent Chair", model: "accent chair.glb", src: accentChair },
    { name: "Armchair", model: "arm chair.glb", src: armChair },
    { name: "Dining Chair", model: "dining chair.glb", src: diningChair },
    { name: "Lounge Chair", model: "lounge chair.glb", src: loungeChair },
    { name: "Office Chair", model: "office chair.glb", src: officeChair },

    // TABLES
    { name: "Coffee Table", model: "coffee table.glb" },
    { name: "Console Table", model: "console table.glb" },
    { name: "Desk", model: "desk.glb" },
    { name: "Dining Table", model: "dining table.glb" },
    { name: "Side Table", model: "side table.glb" },
    { name: "Round Table", model: "round chair.glb" },

    // SOFAS
    { name: "Single Sofa", model: "single sofa.glb" },
    { name: "2 Seater Sofa", model: "2 seater sofa.glb" },
    { name: "3 Seater Sofa", model: "3 seater sofa.glb" },
    { name: "L Shape Sofa", model: "l shape sofa.glb" },
    { name: "Recliner Sofa", model: "recliner sofa.glb" },

    // BEDS
    { name: "Single Bed", model: "single bed.glb" },
    { name: "Double Bed", model: "double bed.glb" },
    { name: "Queen Bed", model: "queen bed.glb" },
    { name: "King Bed", model: "king bed.glb" },
    { name: "Bunk Bed", model: "bunk bed.glb" },

    // STORAGE
    { name: "Bookshelf", model: "bookshelf.glb" },
    { name: "Cabinet", model: "cabinet.glb" },
    { name: "Display Shelf", model: "display shelf.glb" },
    { name: "Side Cabinet", model: "side cabinet.glb" },
    { name: "TV Stand", model: "tv stand.glb" }

  ];

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
          onClick={() => addFurniture(item.model)}
        >

          {item.src && (
            <img
              src={item.src}
              className="w-10 h-10 mx-auto pointer-events-none"
            />
          )}

          <p className="text-xs">{item.name}</p>

        </div>

      ))}

    </div>

  );

}

export default FurniturePanel;