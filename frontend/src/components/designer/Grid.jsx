import { Group, Line } from "react-konva";
import React from "react";

function Grid({
  stageWidth = 6000,
  stageHeight = 6000,
  cellSize = 40,
  centerX = stageWidth / 2,
  centerY = stageHeight / 2,
  stroke = "#e5e5e5",
}) {

  const lines = [];

  const left = centerX - stageWidth / 2;
  const top = centerY - stageHeight / 2;
  const right = left + stageWidth;
  const bottom = top + stageHeight;

  const startI = Math.floor(left / cellSize) * cellSize;

  for (let x = startI; x <= right; x += cellSize) {
    lines.push(
      <Line key={`v${x}`} points={[x, top, x, bottom]} stroke={stroke} strokeWidth={1}/>
    );
  }

  const startJ = Math.floor(top / cellSize) * cellSize;

  for (let y = startJ; y <= bottom; y += cellSize) {
    lines.push(
      <Line key={`h${y}`} points={[left, y, right, y]} stroke={stroke} strokeWidth={1}/>
    );
  }

  return <Group>{lines}</Group>;
}

export default Grid;