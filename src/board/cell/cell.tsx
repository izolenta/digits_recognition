import React from 'react';
import './cell.css';

export enum CellState {empty = 0, grayed33 = 0.33, grayed66 = 0.66, filled = 1}

// @ts-ignore
const Cell = ({ isFilled, onDraw }) => {
  let cName = 'cell';
  if (isFilled === CellState.grayed33) cName += ' grayed33';
  if (isFilled === CellState.grayed66) cName += ' grayed66';
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