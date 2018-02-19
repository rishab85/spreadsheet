import React from 'react'
import Cell from './Cell'



const Row = (props) => {

  const cells = [];
  const y = props.y;





  for(let x=0; x<props.x; x+=1){
    console.log(props.styler[x])
    cells.push(
      <Cell
      key={`${x}-${y}`}
      y={y}
      x={x}
      styler = {props.styler[x]}
      onChangedValue={props.handleChangedCell}
      onStyleChanged={props.handleChangedStyle}
      updateCells={props.updateCells}
      handleClicked={props.handleClicked}
      value={props.rowData[x]||''}
    />)
  }


  return(
    <div>
      {cells}
    </div>
  )
}

export default Row
