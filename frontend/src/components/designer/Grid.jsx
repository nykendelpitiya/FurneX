import { Line } from "react-konva";

function Grid(){

  const lines=[];

  for(let i=0;i<1000;i+=50){

    lines.push(
      <Line
        key={"h"+i}
        points={[0,i,2000,i]}
        stroke="#e5e5e5"
      />
    )

    lines.push(
      <Line
        key={"v"+i}
        points={[i,0,i,2000]}
        stroke="#e5e5e5"
      />
    )

  }

  return <>{lines}</>;

}

export default Grid;