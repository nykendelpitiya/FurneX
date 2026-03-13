import { Stage, Layer, Rect, Line, Transformer, Group } from "react-konva";
import { useRoomStore } from "../../store/useRoomStore";
import Grid from "./Grid";
import { useState, useRef, useEffect } from "react";

function RoomCanvas() {

  const room = useRoomStore((s) => s.room);
  const showGrid = useRoomStore((s) => s.showGrid);
  const walls = useRoomStore((s) => s.walls);
  const addWall = useRoomStore((s) => s.addWall);
  const currentTool = useRoomStore((s) => s.currentTool);

  const snapToGrid = useRoomStore((s) => s.snapToGrid); // ⭐ ADD

  const zoom = useRoomStore((s) => s.zoom);
  const zoomIn = useRoomStore((s) => s.zoomIn);
  const zoomOut = useRoomStore((s) => s.zoomOut);
  const resetZoom = useRoomStore((s) => s.resetZoom);

  const [drawing, setDrawing] = useState(false);
  const [points, setPoints] = useState([]);

  const [stagePos, setStagePos] = useState({
    x: 0,
    y: 0
  });

  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {

    if (trRef.current && shapeRef.current) {

      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();

    }

  }, [room.shape]);

  // ⭐ UPDATED SNAP FUNCTION
  const snap = (value) => {

    if (!snapToGrid) return value;

    const gridSize = 20;

    return Math.round(value / gridSize) * gridSize;

  };

  return (

    <div className="absolute inset-0 flex justify-center items-center">

      <Stage
        width={900}
        height={600}

        scaleX={zoom}
        scaleY={zoom}

        x={stagePos.x}
        y={stagePos.y}

        draggable={currentTool === "move" && !drawing}

        onMouseDown={(e) => {

          if (currentTool !== "wall") return;

          const pos = e.target.getStage().getPointerPosition();
          if (!pos) return;

          const x = snap(pos.x);
          const y = snap(pos.y);

          setDrawing(true);
          setPoints([x, y, x, y]);

        }}

        onMouseMove={(e) => {

          if (!drawing) return;

          const pos = e.target.getStage().getPointerPosition();
          if (!pos) return;

          const x = snap(pos.x);
          const y = snap(pos.y);

          setPoints((prev) => [

            prev[0],
            prev[1],
            x,
            y

          ]);

        }}

        onMouseUp={() => {

          if (!drawing) return;

          if (points.length === 4) {

            addWall(points);

          }

          setDrawing(false);
          setPoints([]);

        }}

        onDragEnd={(e) => {

          setStagePos({

            x: e.target.x(),
            y: e.target.y()

          });

        }}

        style={{ background: "#fafafa" }}
      >

        <Layer>

          {showGrid && <Grid />}

          {/* Walls */}
          {walls.map((wall, i) => (

            <Line
              key={i}
              points={wall}
              stroke={room.wallColor || "black"}
              strokeWidth={4}
            />

          ))}

          {/* Drawing preview */}
          {drawing && points.length === 4 && (

            <Line
              points={points}
              stroke={room.wallColor || "black"}
              strokeWidth={4}
              dash={[6, 4]}
            />

          )}

          {/* RECTANGLE */}
          {room.shape === "rectangle" && (

            <Rect
              ref={shapeRef}
              x={200}
              y={150}
              width={room.width}
              height={room.height}
              fill={room.floorColor || "#e5e5e5"}
              stroke="black"
              draggable
            />

          )}

          {/* SQUARE */}
          {room.shape === "square" && (

            <Rect
              ref={shapeRef}
              x={200}
              y={150}
              width={room.width}
              height={room.width}
              fill={room.floorColor || "#e5e5e5"}
              stroke="black"
              draggable
            />

          )}

          {/* L SHAPE */}
          {room.shape === "lshape" && (

            <Group
              ref={shapeRef}
              draggable
            >

              <Rect
                x={200}
                y={150}
                width={room.width}
                height={room.height / 2}
                fill={room.floorColor || "#e5e5e5"}
                stroke="black"
              />

              <Rect
                x={200}
                y={150 + room.height / 2}
                width={room.width / 2}
                height={room.height / 2}
                fill={room.floorColor || "#e5e5e5"}
                stroke="black"
              />

            </Group>

          )}

          {/* Transformer */}
          {(room.shape === "rectangle" || room.shape === "square") && (

            <Transformer
              ref={trRef}
              rotateEnabled={false}
            />

          )}

        </Layer>

      </Stage>

      {/* Zoom Controls */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow flex gap-4">

        <button onClick={zoomOut}>-</button>

        <span>
          {Math.round(zoom * 100)}%
        </span>

        <button onClick={zoomIn}>+</button>

        <button onClick={resetZoom}>
          Reset
        </button>

      </div>

    </div>

  );

}

export default RoomCanvas;