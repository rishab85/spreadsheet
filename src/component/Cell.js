import React, {Component} from 'react';
import {connect} from 'react-redux';
import {modifiedData,buttonClicked, currentSelection} from '../action/tableAction'

class Cell extends Component{
  constructor(props){
    super(props)

    this.state={
      editing:false,
      value:props.value
    }

    this.display = this.determineDisplay(
      {x:props.x, y:props.y},
      props.value
    )
    this.timer = 0;
    this.delay = 200;
    this.prevent=false;
  }

  componentDidMount(){
    window.document.addEventListener('unselectAll', this.handleUnselectAll)
  }

  componentWillUpdate(){
    this.display = this.determineDisplay(
      {x:this.props.x, y:this.props.y}, this.state.value
    )


  }

  componentWillUnmount(){
      console.log('will unmount')
    window.document.removeEventListener('unselectAll', this.handleUnselectAll)
  }

  onChange = (e) => {
    this.setState({
      value : e.target.value
    })

    this.display = this.determineDisplay(
      {x:this.props.x, y:this.props.y}, e.target.value
    )
  }

  onKeyPressOnInput = (e) => {
    if(e.key==="Enter"){
      this.hasNewValue(e.target.value)
    }
  }

  onKeyPressOnSpan = (e) => {
    if(!this.state.editing){
      this.setState({
        editing:true
      })
    }
  }

  onBlur = (e) => {
    this.hasNewValue(e.target.value)
  }

  handleUnselectAll = () => {
    if(this.state.selected || this.state.editing) {
      this.setState({selected : false, editing : false})
    }
  }

  hasNewValue = (value) => {
    this.props.onChangedValue(
      {x:this.props.x, y:this.props.y}, value
    )
    this.setState({editing : false})
  }

  hasNewStyle = (value) => {
    this.props.onStyleChanged(
      {x:this.props.x, y:this.props.y}, value
    )
  }

  emitUnselectAllEvent = () => {
    const unselectAllEvent = new Event('unselectAll')
    window.document.dispatchEvent(unselectAllEvent)
  }

  clicked = (e) => {
    this.timer = setTimeout(() => {
      if(!this.prevent) {
        this.emitUnselectAllEvent()
        this.setState({selected:true})
      }
      this.prevent = false
    }, this.delay)
    this.props.currentSelection({x:this.props.x,y:this.props.y});

  }

  doubleClicked = () => {
    clearTimeout(this.timer)
    this.prevent = true

    this.emitUnselectAllEvent()
    this.setState({selected : true, editing:true})
  }

  determineDisplay = ({x,y}, value) => {
    return value
  }

  calculateCss = () => {
    const css = {
      width: '80px',
      padding: '4px',
      margin: '0',
      height: '25px',
      boxSizing: 'border-box',
      position: 'relative',
      display: 'inline-block',
      color: 'black',
      border: '1px solid #cacaca',
      textAlign: 'left',
      verticalAlign: 'top',
      fontSize: '14px',
      lineHeight: '15px',
      overflow: 'hidden',
    }

    if(this.props.x===0 || this.props.y===0){
      css.textAlign = 'center'
      css.backgroundColor = '#f0f0f0'
      css.fontWeight = 'bold'
    }

    return css
  }

  changeClicked=()=>{
    console.log('i  m vikA ON SALE')
  }

  render(){
    const css = this.calculateCss()
    if(this.props.buttonClicked){
      this.changeClicked();
    }
    if(this.props.x===0){
      return(
        <span style={css}>
          {this.props.y}
        </span>
      )
    }

    if(this.props.y===0){
      const alpha = ' abcdefghijklmnopqrstuvwxyz'.split('')
      return(
        <span
        onKeyPress={this.onKeyPressOnSpan}
        style ={css}>
        {alpha[this.props.x]}
        </span>
      )
    }

    if(this.state.selected){
      css.outlineColor = 'lightblue'
      css.outlineStyle = 'dotted'
    }

    if(this.state.editing){
      return(
        <input
          style={css}
          type = "text"
          onBlur = {this.onBlur}
          onKeyPress = {this.onKeyPressOnInput}
          value={this.state.value}
          onChange={this.onChange}
          autoFocus
        />
      )
    }

    return(
      <span
      className={this.props.styler}
      onClick={e=>this.clicked(e)}
      onDoubleClick={e=>this.doubleClicked(e)}
      onKeyDown = {this.onKeyPressOnSpan}
      style={css}>
      {this.display}
      </span>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    modData : state.modifiedData,
    buttonClicked : state.buttonClicked,
    buttonName : state.buttonName,
    current : state.currentSelection
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    changeData : (data)=>dispatch(modifiedData(data)),
    clickButton : (bool)=>dispatch(buttonClicked(bool)),
    currentSelection : (value)=>dispatch(currentSelection(value))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cell);
