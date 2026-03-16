import { Stage, Layer, Rect, Transformer, Image, Group, Path, Text, Line } from "react-konva";
import { useRoomStore } from "../../store/useRoomStore";
import { useFurnitureStore } from "../../store/useFurnitureStore";
import Grid from "./Grid";
import Viewer3D from "./Viewer3D";

import { useRef, useEffect, useState } from "react";

function FurnitureItem({ item, onSelect, updateFurniture, onContext }) {

  const [image, setImage] = useState(null);
  const shapeRef = useRef();

  useEffect(() => {

    let active = true;
    let objectUrl = null;

    const loadSvg = async () => {

      const res = await fetch(item.src);
      const svgText = await res.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText,"image/svg+xml");

      const seat = doc.getElementById("seat");
      const frame = doc.getElementById("frame");

      if(seat){
        seat.setAttribute("fill", item.seatColor || "#4A90E2");
      }

      if(frame){
        frame.setAttribute("fill", item.frameColor || "#cccccc");
      }

      const finalSvg = new XMLSerializer().serializeToString(doc);

      const blob = new Blob([finalSvg],{type:"image/svg+xml"});
      objectUrl = URL.createObjectURL(blob);

      const img = new window.Image();
      img.onload = () => {
        if(active) setImage(img)
      };

      img.src = objectUrl;

    };

    loadSvg();

    return ()=>{
      active=false
      if(objectUrl) URL.revokeObjectURL(objectUrl)
    }

  },[item.src,item.seatColor,item.frameColor]);

  return(

    <Image
      id={item.id}
      ref={shapeRef}
      image={image}

      x={item.x}
      y={item.y}

      width={item.width}
      height={item.height}

      rotation={item.rotation || 0}

      draggable

      onClick={(e)=>{
        e.cancelBubble=true
        onSelect(item.id)
      }}

      onContextMenu={(e) => {
        // Konva wraps native event under e.evt
        try { e.evt.preventDefault(); } catch { /* ignore */ }
        e.cancelBubble = true;
        if (onContext) onContext(e, item.id);
      }}

      onDragEnd={(e)=>{
        // snapshot before moving furniture
        useRoomStore.getState().pushSnapshot();

        updateFurniture(item.id,{
          x:e.target.x(),
          y:e.target.y()
        })
      }}

      onTransformEnd={()=>{

        const node = shapeRef.current

        const scaleX = node.scaleX()
        const scaleY = node.scaleY()

        node.scaleX(1)
        node.scaleY(1)

        // snapshot before resizing/rotating
        useRoomStore.getState().pushSnapshot();

        updateFurniture(item.id,{
          x:node.x(),
          y:node.y(),
          width:Math.max(40,node.width()*scaleX),
          height:Math.max(40,node.height()*scaleY),
          rotation:node.rotation()
        })

      }}

    />

  )

}

function RoomCanvas(){

  const room = useRoomStore((s)=>s.room)
  const showGrid = useRoomStore((s)=>s.showGrid)

  const furniture = useFurnitureStore((s)=>s.furniture)
  const updateFurniture = useFurnitureStore((s)=>s.updateFurniture)
  const addFurniture = useFurnitureStore((s)=>s.addFurniture)

  const setSelected = useFurnitureStore((s)=>s.setSelected)
  const selectedId = useFurnitureStore((s)=>s.selectedId)

  const zoom = useRoomStore((s)=>s.zoom)
  const zoomIn = useRoomStore((s)=>s.zoomIn)
  const zoomOut = useRoomStore((s)=>s.zoomOut)
  const resetZoom = useRoomStore((s)=>s.resetZoom)

  const trRef = useRef()
  const roomRef = useRef()
  const stageRef = useRef()
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0, id: null })
  const [designName, setDesignName] = useState("");
  const viewMode = useRoomStore((s) => s.viewMode);
  const setViewMode = useRoomStore((s) => s.setViewMode);
  const currentTool = useRoomStore((s) => s.currentTool);
  const roomPoints = useRoomStore((s) => s.roomPoints);
  const setRoomPoints = useRoomStore((s) => s.setRoomPoints);
  const setRoomShape = useRoomStore((s) => s.setRoomShape);

  // Stage dimensions (match Stage props below)
  const STAGE_WIDTH = 900
  const STAGE_HEIGHT = 600
  // Determine effective room dimensions depending on shape
  const roomWidth = room.width;
  const roomHeight = room.shape === "square" ? room.width : room.height;

  // Calculate fit scale so the room always fits inside the stage
  const fitScale = Math.min(
    1,
    Math.min(STAGE_WIDTH / Math.max(1, roomWidth), STAGE_HEIGHT / Math.max(1, roomHeight))
  );

  // final scale applies fitScale as baseline and preserves user zoom controls
  const finalScale = fitScale * zoom;

  // center the room inside the stage in stage (unscaled) coordinates
  const roomX = (STAGE_WIDTH / finalScale - roomWidth) / 2;
  const roomY = (STAGE_HEIGHT / finalScale - roomHeight) / 2;

  useEffect(()=>{

    if(!trRef.current) return

    const stage = trRef.current.getStage()

    const selectedNode =
      selectedId === "room"
      ? roomRef.current
      : stage.findOne(`#${selectedId}`)

    if(selectedNode){
      trRef.current.nodes([selectedNode])
    }else{
      trRef.current.nodes([])
    }

    trRef.current.getLayer().batchDraw()

  },[selectedId])

  const selectedFurniture = furniture.find(f => f.id === selectedId)
  const deleteFurniture = useFurnitureStore((s) => s.deleteFurniture)
  const setRoom = useRoomStore((s) => s.setRoom)

  const handleContext = (e, id) => {
    // e is Konva event
    try { e.evt.preventDefault(); } catch { /* ignore */ }
    const clientX = (e.evt && e.evt.clientX) || 0;
    const clientY = (e.evt && e.evt.clientY) || 0;
    setSelected(id);
    setMenu({ visible: true, x: clientX, y: clientY, id });
  };

  useEffect(() => {
    const handleWindowClick = () => setMenu({ visible: false, x: 0, y: 0, id: null });
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, []);

  useEffect(() => {
    // attach native listeners to the Stage container so drag events aren't blocked by Konva internals
    const attachListeners = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const container = stage.container();

      const onDragOver = (e) => e.preventDefault();

      const onDrop = (e) => {
        e.preventDefault();
        const dt = e.dataTransfer || (e.nativeEvent && e.nativeEvent.dataTransfer);
        let dataStr = null;
        try {
          dataStr = dt.getData("furniture") || dt.getData("application/json") || dt.getData("text/plain");
        } catch {
          return;
        }
        if (!dataStr) return;
        let data = null;
        try { data = JSON.parse(dataStr); } catch { return; }

        const rect = container.getBoundingClientRect();
        // Use finalScale (fitScale * zoom) to convert screen coords to stage coords
        const dropX = (e.clientX - rect.left) / finalScale;
        const dropY = (e.clientY - rect.top) / finalScale;

        // snapshot before adding furniture
        useRoomStore.getState().pushSnapshot();

        // Add furniture with exact model filename (data.model)
        addFurniture(data.model, data.src, {
          x: dropX,
          y: dropY,
          width: 80,
          height: 80,
          seatColor: "#4A90E2",
          frameColor: "#cccccc"
        });
      };

      container.addEventListener("dragover", onDragOver);
      container.addEventListener("drop", onDrop);

      return () => {
        container.removeEventListener("dragover", onDragOver);
        container.removeEventListener("drop", onDrop);
      };
    };

    const cleanup = attachListeners();
    return () => { if (cleanup && typeof cleanup === 'function') cleanup(); };
  }, [zoom, addFurniture, finalScale]);

  // add pointer handling for pen tool
  const handleStageMouseDown = (e) => {
    if (currentTool !== "pen") {
      // existing behavior: clear selection when clicking empty stage
      if (e.target === e.target.getStage()) {
        setSelected(null);
      }
      return;
    }

    // Pen tool: add point
    const stage = stageRef.current;
    if (!stage) return;
    const pointer = stage.getPointerPosition();
    if (!pointer) return;
    const x = pointer.x / finalScale - roomX;
    const y = pointer.y / finalScale - roomY;
    // push new point
    const next = [...(roomPoints || []), x, y];
    setRoomPoints(next);
  };

  const handleStageDblClick = () => {
    if (currentTool !== "pen") return;
    // finalize polygon if at least 3 points
    if (!roomPoints || roomPoints.length < 6) return;
    // set room shape to polygon
    setRoomShape("polygon");
    // switch back to move tool
    useRoomStore.getState().setTool("move");
  };

  return (

    <>

      {/* view mode is controlled by RightPanel; no top toggles */}

      {viewMode === "2D" && (

        <div className={`absolute inset-0 flex justify-center items-center`} style={{ cursor: currentTool === "pen" ? "crosshair" : undefined }}>

          {/* Design toolbar above canvas */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-gray-600">DESIGN</span>
            <input
              type="text"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              placeholder="Enter design name..."
              className="border rounded-full px-4 py-1 w-64 outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <Stage
            ref={stageRef}
            width={STAGE_WIDTH}
            height={STAGE_HEIGHT}
            scaleX={finalScale}
            scaleY={finalScale}
            style={{background:"#fafafa"}}
            onMouseDown={handleStageMouseDown}
            onDblClick={handleStageDblClick}
          >

            <Layer>

              {showGrid && (
                <Grid
                  stageWidth={STAGE_WIDTH}
                  stageHeight={STAGE_HEIGHT}
                  cellSize={50}
                  centerX={roomX + roomWidth / 2}
                  centerY={roomY + roomHeight / 2}
                />
              )}

              {/* ROOM */}

              <Group
                ref={roomRef}
                x={roomX}
                y={roomY}
                draggable
                id="room"
                onClick={(e)=>{
                  e.cancelBubble=true
                  setSelected("room")
                }}
              >

                {/* RECTANGLE */}


                {room.shape === "rectangle" && (

                  <Rect
                    width={roomWidth}
                    height={roomHeight}
                    fill={room.floorColor}
                    stroke="black"
                  />

                )}

                {/* SQUARE */}

                {room.shape === "square" && (

                  <Rect
                    width={roomWidth}
                    height={roomHeight}
                    fill={room.floorColor}
                    stroke="black"
                  />

                )}

                {/* L SHAPE */}

                {room.shape === "lshape" && (

                  <Path
                    data={`
                M0 0
                h ${room.width}
                v ${room.height/2}
                h -${room.width/2}
                v ${room.height/2}
                h -${room.width/2}
                z
                `}
                    fill={room.floorColor}
                    stroke="black"
                  />

                )}

                {/* Polygon (pen tool) */}
                {room.shape === "polygon" && roomPoints && roomPoints.length >= 6 && (
                  <Line points={roomPoints} closed fill={room.floorColor} stroke="black" />
                )}

                {/* Temporary pen line while drawing */}
                {currentTool === "pen" && roomPoints && roomPoints.length >= 2 && (
                  <Line points={roomPoints} stroke="#4A5568" strokeWidth={2} dash={[4,4]} />
                )}

              </Group>

              {/* FURNITURE */}

              {furniture.map((item)=>(

                <FurnitureItem
                  key={item.id}
                  item={item}
                  onSelect={setSelected}
                  onContext={handleContext}
                  updateFurniture={updateFurniture}
                />

              ))}

              {/* TRANSFORMER */}

              <Transformer
                ref={trRef}
                rotateEnabled
                enabledAnchors={[
                  "top-left",
                  "top-center",
                  "top-right",
                  "middle-left",
                  "middle-right",
                  "bottom-left",
                  "bottom-center",
                  "bottom-right"
                ]}
              />

            </Layer>

          </Stage>

          {/* UNIVERSAL COLOR PANEL */}

          {selectedFurniture && (

            <div
              style={{
                position:"absolute",
                bottom:"20px",
                left:"50%",
                transform:"translateX(-50%)",
                background:"white",
                padding:"10px 20px",
                borderRadius:"10px",
                boxShadow:"0 2px 10px rgba(0,0,0,0.15)",
                display:"flex",
                gap:"25px"
              }}
            >

              <div style={{display:"flex",alignItems:"center",gap:"8px"}}>

                <span style={{fontSize:"13px"}}>Primary</span>

                <input
                  type="color"
                  value={selectedFurniture.seatColor || "#4A90E2"}
                  onChange={(e)=>
                    updateFurniture(selectedFurniture.id,{
                      seatColor:e.target.value
                    })
                  }
                />

              </div>

              <div style={{display:"flex",alignItems:"center",gap:"8px"}}>

                <span style={{fontSize:"13px"}}>Secondary</span>

                <input
                  type="color"
                  value={selectedFurniture.frameColor || "#cccccc"}
                  onChange={(e)=>
                    updateFurniture(selectedFurniture.id,{
                      frameColor:e.target.value
                    })
                  }
                />

              </div>

            </div>

          )}

          {/* ZOOM */}

          {/* DELETE BUTTON (Konva) - appears above selected object */}
              {selectedId && (
            (() => {
              let objX = 0, objY = 0, objW = 0;

              if (selectedId === "room") {
                objX = roomX;
                objY = roomY;
                objW = roomWidth;
              } else if (selectedFurniture) {
                objX = selectedFurniture.x;
                objY = selectedFurniture.y;
                objW = selectedFurniture.width;
              } else {
                return null;
              }

              const btnW = 80;
              const btnH = 30;
              const offset = 10; // gap between object and button

              const btnX = objX + objW / 2 - btnW / 2;
              const btnY = objY - btnH - offset;

              const handleDelete = () => {
                if (selectedId === "room") {
                  // snapshot before resetting room
                  useRoomStore.getState().pushSnapshot();
                  // reset room to empty/small defaults
                  setRoom({ width: 0, height: 0, wallColor: "#000000", floorColor: "#ffffff", shape: "rectangle" });
                  // clear selection
                  setSelected(null);
                } else {
                  // snapshot before deleting furniture
                  useRoomStore.getState().pushSnapshot();
                  deleteFurniture(selectedId);
                  setSelected(null);
                }
              };

              return (
                <Group x={btnX} y={btnY} onClick={handleDelete} draggable={false}>
                  <Rect width={btnW} height={btnH} fill="#e55353" cornerRadius={6} shadowBlur={4} />
                  <Text text={"🗑 Delete"} fill="#fff" fontSize={13} width={btnW} height={btnH} align="center" verticalAlign="middle" />
                </Group>
              );

            })()
          )}

          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow flex gap-4">

            <button onClick={zoomOut}>-</button>

            <span>{Math.round(zoom*100)}%</span>

            <button onClick={zoomIn}>+</button>

            <button onClick={resetZoom}>Reset</button>

          </div>

          {/* HTML context menu for furniture (absolute, not Konva) */}
          {menu.visible && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                left: menu.x,
                top: menu.y,
                background: "white",
                border: "1px solid #ccc",
                padding: "6px",
                borderRadius: "6px",
                cursor: "pointer",
                zIndex: 9999
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                    if (menu.id) {
                      // snapshot before deleting furniture
                      useRoomStore.getState().pushSnapshot();
                      deleteFurniture(menu.id);
                      setSelected(null);
                    }
                    setMenu({ visible: false, x: 0, y: 0, id: null });
                }}
              >
                Delete
              </div>
            </div>
          )}

        </div>

      )}

      {viewMode === "3D" && (
        <div className="absolute inset-0">

          {/* convert room/furniture into Viewer3D-friendly props */}
          {(() => {
            const PPM = 80;
            const viewerRoom = {
              width: room.width / PPM,
              length: roomHeight / PPM,
              height: 3,
              wall_color: room.wallColor,
              floor_color: room.floorColor
            };
            viewerRoom.shape = room.shape;

            const viewerFurniture = furniture.map((it) => {
              const adjX = (typeof it.x === 'number' ? it.x - roomX : 0);
              const adjY = (typeof it.y === 'number' ? it.y - roomY : 0);
              return {
                ...it,
                x: adjX,
                y: adjY,
                // model: exact filename stored on the furniture item
                model: it.model || null,
                color: it.seatColor || it.frameColor || "#8B5A2B"
              };
            });

            return (
              <Viewer3D
                room={viewerRoom}
                furniture={viewerFurniture}
                selectedId={selectedId}
                onSelectItem={(id) => setSelected(id)}
                onUpdateItem={(id, updates) => updateFurniture(id, updates)}
              />
            );
          })()}

        </div>
      )}

    </>

  )

}

export default RoomCanvas