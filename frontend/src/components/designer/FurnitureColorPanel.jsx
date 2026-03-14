import { useFurnitureStore } from "../../store/useFurnitureStore";

function FurnitureColorPanel() {

  const selectedId = useFurnitureStore((s) => s.selectedId);
  const updateFurniture = useFurnitureStore((s) => s.updateFurniture);

  if (!selectedId) return null;

  return (

    <div className="absolute right-10 bottom-32 bg-white shadow-lg p-4 rounded-xl">

      <p className="text-sm mb-2">Change Color</p>

      <input
        type="color"
        onChange={(e) =>
          updateFurniture(selectedId, {
            color: e.target.value
          })
        }
      />

    </div>

  );

}

export default FurnitureColorPanel;