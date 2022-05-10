import React, {ReactNode, useEffect, useState} from 'react';
import './board.css';
import Cell, {CellState} from "./cell/cell";
import {processData} from "../service/digitDetectorService";

const width = 28;
const height = 28;

const emptyCells = new Array<CellState>(width*height).fill(CellState.empty);

enum PenMode { draw, erase}

function Board() {

  let cells = [];

  const [drawMode, setDrawMode] = useState(PenMode.draw);
  const [isDrawing, setDrawing] = useState(false);
  const [cellState, setCellState] = useState(emptyCells);
  const [processedData, setProcessedData] = useState(new Array<number>(10).fill(0));

  const [bars, setBars] = useState(new Array<ReactNode>());

  useEffect(() => {
    setProcessedData(processData(cellState.map((next) => next === CellState.empty? 0 : 1)));
    let b = [];
    for (let i=0; i<10; i++) {
      let barLength = 0;
      barLength = processedData[i] * 600;
      let barStyle = {width: barLength};
      const elem = <div className={'bar'}>
        <div className={'bar-digit'}>{i}:</div>
        <div className={'bar-graph'} style={barStyle}></div>
      </div>;
      b.push(elem);
    }
    setBars(b);
  }, [cellState]);

  function drawCell(index: number) {
    if (isDrawing) {
      let newValue = drawMode === PenMode.draw? CellState.filled : CellState.empty;
      let newCells = [...cellState];
      newCells[index] = newValue;
      let y = Math.floor(index/width);
      let x = index % width;
      if (y < height - 1) {
        newCells[index+width] = newValue;
      }
      if (x < width - 1) {
        newCells[index+1] = newValue;
      }
      if (y < height - 1 && x < width - 1) {
        newCells[index+width+1] = newValue
      }
      setCellState(newCells);
    }
  }

  for (let i=0; i<width*height; i++) {
    cells.push(<Cell
      key={i}
      isFilled={cellState[i]}
      onDraw={() => drawCell(i)}
    />)
  }
  return (
    <div>
      <div className={"board"}
           onMouseDown={() => setDrawing(true)}
           onMouseUp={() => setDrawing(false)}>
        { cells }
      </div>
      <button className={'clearButton'} onClick={() => setCellState(emptyCells)}>Clear</button>
      <div className={'bars'}>
        { bars }
      </div>
    </div>
  );
}

export default Board;

