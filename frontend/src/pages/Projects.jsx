import LeftToolbar from "../components/designer/LeftToolbar";
import RightPanel from "../components/designer/RightPanel";
import RoomCanvas from "../components/designer/RoomCanvas";

function Projects(){

  return(

    <div className="relative h-screen bg-gray-100 overflow-hidden">

      {/* Left Toolbar */}
      <LeftToolbar/>

      {/* Canvas Workspace */}
      <div className="absolute inset-0 flex justify-center items-center">
        <RoomCanvas/>
      </div>

      {/* Right Panel */}
      <RightPanel/>

    </div>

  )

}

export default Projects;
