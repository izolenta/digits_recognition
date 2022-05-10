import React from 'react';
import './cell.css';

export enum CellState {empty, grayed, filled}

// @ts-ignore
const Cell = ({ isFilled, onDraw }) => {
  let cName = 'cell';
  if (isFilled === CellState.grayed) cName += ' grayed';
  if (isFilled === CellState.filled) cName += ' selected';
  return (
    <div
      className={cName}
      onMouseDown={onDraw}
      onMouseMove={onDraw}
      onMouseEnter={onDraw}>
    </div>
  );
}

export default Cell;