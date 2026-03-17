function ZoomControls({ zoomIn, zoomOut, resetZoom }) {

  return (

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow flex gap-4">

      <button onClick={zoomOut}>-</button>

      <button onClick={resetZoom}>Reset</button>

      <button onClick={zoomIn}>+</button>

    </div>

  );

}

export default ZoomControls;