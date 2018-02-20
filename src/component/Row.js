import React from 'react'
import Cell from './Cell'



const Row = (props) => {

  const cells = [];
  const y = props.y;
  let value={}
  for(let x=0; x<props.x; x+=1){
    if(props.rowData[x]){
      value={
        data:props.rowData[x]['data'],
        cell:props.rowData[x]['cell']
      }
    }else{
      value={
        data : '',
        cell : 'cells'
      }
    }
    cells.push(
      <Cell
      key={`${x}-${y}`}
      y={y}
      x={x}
      onChangedValue={props.handleChangedCell}
      onStyleChanged={props.handleChangedStyle}
      updateCells={props.updateCells}
      handleClicked={props.handleClicked}
      value={value}
    />)

  }


  return(
    <div>
      {cells}
    </div>
  )
}

export default Row
