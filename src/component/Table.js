import React, {Component} from 'react';
import {connect} from 'react-redux';
import {modifiedData, modifiedStyle, tableStructure} from '../action/tableAction'
import Row from './Row'
import Styler from './styler'
class Table extends Component{
  constructor(props){
    super(props)

    let styles = [[]];
    let data = {};
    for(let y=0; y<this.props.table.y+1; y+=1){
      styles[y]=[];
      for(let x=0; x<this.props.table.x+1; x+=1){
        styles[y][x]="cells"
      }
    }

    if(localStorage.getItem('sheet')){
      data = JSON.parse(localStorage.getItem('sheet'));
    }else{
      data = {}
    }

    this.state={
      data:data,
      styler:styles,
    }

    console.log(this.state.styler);
  }



  handleChangedCell = ({x,y},value) => {
    const modifiedValue = Object.assign({},this.state.data)
    if(!modifiedValue[y]) modifiedValue[y] = {}
    let data={data:value,cell:'cells'}
    modifiedValue[y][x] = data
      localStorage.setItem('sheet', JSON.stringify(modifiedValue))
    this.setState({
      data : modifiedValue,
    })
  }

  handleStyler = () => {
    let styles = [[]];
    for(let y=0; y<this.props.table.y+1; y+=1){
      styles[y]=[];
      for(let x=0; x<this.props.table.x+1; x+=1){
        styles[y][x]="cells"
      }
    }
  }

  handleChangedStyle = ({x,y},value) => {
    const modifiedValue = this.state.data
    if(!modifiedValue[y]) modifiedValue[y] = {}
    if(modifiedValue[y][x]['cell'].includes(value)){
      modifiedValue[y][x]['cell']=modifiedValue[y][x]['cell'].replace(value,'')
      modifiedValue[y][x]['cell']=modifiedValue[y][x]['cell'].trim()
    }else{
      modifiedValue[y][x]['cell'] = value+ " " + modifiedValue[y][x]['cell']
    }

    this.setState({
      styler : {cell:modifiedValue[y][x]['cell']}
    })
  }

  handleButton=(value)=>{
    // console.log('I am on Table and you clicked me');

    if(Object.keys(this.props.current).length){
      const x = this.props.current.x;
      const y = this.props.current.y;
      this.handleChangedStyle({x,y}, value)
    }
  }

  addRowColumn = (value) =>{

    if(value==="row"){
      let y = this.props.table.y+1;
      let x = this.props.table.x;
      const  data = {
        x : x,
        y : y
      }
      let styles = this.handleStyler;
      this.props.modifyTable(data);
    }else{
      let y = this.props.table.y;
      let x = this.props.table.x+1;
      const  data = {
        x : x,
        y : y
      }
      let styles = this.handleStyler;
      this.props.modifyTable(data);
    }
  }

  addRow=()=>{
    let modif = [[]];
    modif = JSON.parse(localStorage.getItem('sheet'))
    const rows=[];
    for(let x=0; x<this.props.table.x; x+=1){
      rows[x] = {};
    }
    modif.push(rows);
    console.log(modif);

    // localStorage.setItem('sheet', JSON.stringify(mod));
  }
  handleClear = () =>{
    let r =window.confirm("Are you sure you want to clear all data");
    if(r){
      localStorage.removeItem('sheet');
      const data = {}
      this.setState({
        data
      })
    }
    window.location.reload(true);
  }

  handleDelete=(value)=>{
    console.log(value)
  }
  updateCells = () => {
    this.forceUpdate()
  }
  render(){
      const rows = [];
      console.log(this.props.table.y);
      for(let y=0; y<this.props.y+1; y+=1){
        const rowData = this.state.data[y] || {};
        rows.push(
          <Row
            handleChangedCell = {this.handleChangedCell}
            handleChangedStyle = {this.handleChangedStyle}
            handleClicked = {this.handleButton}
            updateCells={this.updateCells}
            key={y}
            y={y}
            x={this.props.x+1}
            rowData={rowData}
          />
        )
      }

      return(
        <div>
          <Styler
          handleButton = {this.handleButton}
          handleDelete = {this.handleDelete}
          handleClear = {this.handleClear}
          addRowColumn = {this.addRowColumn}
          />
          {rows}
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return{
    table : state.tableStructure,
    modData : state.modifiedData,
    modStyle : state.modifiedStyle,
    current : state.currentSelection
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    modifyData : (data)=>dispatch(modifiedData(data)),
    modifyStyle : (data)=>dispatch(modifiedStyle(data)),
    modifyTable : (data)=>dispatch(tableStructure(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Table)
