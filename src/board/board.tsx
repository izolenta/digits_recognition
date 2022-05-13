import React, {ReactNode, useEffect, useState} from 'react';
import './board.css';
import Cell, {CellState} from "./cell/cell";
import {initModelTf, processDataTf} from "../service/tfService";

const width = 28;
const height = 28;

const emptyCells = new Array<CellState>(width*height).fill(CellState.empty);

const drawPattern = [
  CellState.grayed33, CellState.grayed66, CellState.grayed33,
  CellState.grayed66, CellState.filled, CellState.grayed66,
  CellState.grayed33, CellState.grayed66, CellState.grayed33,
]

let isInitialized = false;

function Board() {

  let cells = [];

  const [isDrawing, setDrawing] = useState(false);
  const [cellState, setCellState] = useState(emptyCells);
  const [processedData, setProcessedData] = useState(new Array<number>(10).fill(0));

  const [bars, setBars] = useState(new Array<ReactNode>());

  useEffect(() => {
    initModelTf().then(() => {
      isInitialized = true;
    });
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    setProcessedData(processDataTf(cellState));
    let b = [];
    for (let i=0; i<10; i++) {
      let barLength = 0;
      barLength = processedData[i] * 600;
      let barStyle = {width: barLength};
      const elem = <div className={'bar'} key={i}>
        <div className={'bar-digit'}>{i}:</div>
        <div className={'bar-graph'} style={barStyle}></div>
      </div>;
      b.push(elem);
    }
    setBars(b);
  }, [cellState]);

  function drawCell(index: number) {
    if (isDrawing) {
      let newCells = [...cellState];
      let isModified = false;
      let y = Math.floor(index/width);
      let x = index % width;
      for (let i=-1; i<=1; i++) {
        for (let j=-1; j<=1; j++) {
          if (isOnPicture(y+i, x+j)) {
            const valueToFill = drawPattern[j+1+(i+1)*3];
            const indexToFill = x+j+(y+i)*28;
            if (newCells[indexToFill] < valueToFill) {
              isModified = true;
              newCells[indexToFill] = valueToFill;
            }
          }
        }
      }
      if (isModified) {
        setCellState(newCells);
      }
    }
  }

  function isOnPicture(x: number, y: number) {
    return x>=0 && x<28 && y>=0 && y<28;
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
           onPointerDown={() => setDrawing(true)}
           onPointerUp={() => setDrawing(false)}>
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

