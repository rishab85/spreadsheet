import React, {Component} from 'react';
import {connect} from 'react-redux';
import {modifiedData, modifiedStyle} from '../action/tableAction'
import Row from './Row'
import Styler from './styler'
class Table extends Component{
  constructor(props){
    super(props)



    let styles = [[]];
    let data = {};
    for(let y=0; y<this.props.y+1; y+=1){
      styles[y]=[];
      for(let x=0; x<this.props.x+1; x+=1){
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
  }

  componentWillMount(){

  }

  handleChangedCell = ({x,y},value) => {
    const modifiedValue = Object.assign({},this.state.data)
    if(!modifiedValue[y]) modifiedValue[y] = {}
    modifiedValue[y][x] = value
    this.setState({
      data : modifiedValue
    })

    localStorage.setItem('sheet', JSON.stringify(this.state.data))
  }

  handleChangedStyle = ({x,y},value) => {
    const modifiedValue = this.state.styler
    if(!modifiedValue[y]) modifiedValue[y] = {}
    if(modifiedValue[y][x].includes(value)){
      modifiedValue[y][x]=modifiedValue[y][x].replace(value,'')
      modifiedValue[y][x]=modifiedValue[y][x].trim()
    }else{
      modifiedValue[y][x] = value+ " " + modifiedValue[y][x]
    }

    this.setState({
      styler : modifiedValue
    })
  }

  handleButton=(value)=>{
    // console.log('I am on Table and you clicked me');
    console.log(value)
    if(Object.keys(this.props.current).length){
      const x = this.props.current.x;
      const y = this.props.current.y;
      this.handleChangedStyle({x,y}, value)
    }
  }

  updateCells = () => {
    this.forceUpdate()
  }
  render(){

      const rows = [];
      for(let y=0; y<this.props.y+1; y+=1){
        const rowData = this.state.data[y] || {};
        const styleData = this.state.styler[y] || {};
        
        rows.push(
          <Row
            handleChangedCell = {this.handleChangedCell}
            handleChangedStyle = {this.handleChangedStyle}
            handleClicked = {this.handleButton}
            updateCells={this.updateCells}
            styler = {this.state.styler[y]}
            key={y}
            y={y}
            x={this.props.x+1}
            rowData={rowData}
          />
        )
      }

      return(
        <div>
          <Styler handleButton = {this.handleButton}/>
          {rows}
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return{
    modData : state.modifiedData,
    modStyle : state.modifiedStyle,
    current : state.currentSelection
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    modifyData : (data)=>dispatch(modifiedData(data)),
    modifyStyle : (data)=>dispatch(modifiedStyle(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Table)
