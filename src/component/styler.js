import React,{Component} from 'react';
import {connect} from 'react-redux';
import {buttonClicked, buttonName} from '../action/tableAction'
class Styler extends Component{

  handleClick = (e) =>{
    e.preventDefault();
    this.props.handleButton(e.target.name);
  }

  handleDelete = (e) =>{
    e.preventDefault();
    this.props.handleDelete(e.target.name);
  }

  handleClear = (e) => {
    this.props.handleClear();
  }

  addRowColumn = (e) =>{
    this.props.addRowColumn(e.target.name);
  }

  handleSearch = (e) =>{
    this.props.handleSearch(e.target.value)
  }
  render(){
    return(
      <div className="styler">
        <button type="submit" className="font-bold" name="font-bold" onClick={this.handleClick} title="Bold">B</button>
        <button type="submit" className="font-italics" name="font-italics" onClick={this.handleClick} title="Italics">I</button>
        <button type="submit" className="redBtn" name="color-red" onClick={this.handleClick} title="Change Color">A</button>
        <button type="submit" className="blueBtn" name="color-blue" onClick={this.handleClick} title="Change Color">A</button>
        <button type="submit" className="btnDelete" name="delete-row" onClick={this.handleClick} title="Delete Row">Delete Row</button>
        <button type="submit" className="btnDelete" name="delete-row" onClick={this.handleClick} title="Delete Column">Delete Column</button>
        <br/>
        <button type="submit" className="btnDelete" name="column" onClick={this.addRowColumn} title="Add Column">Add Column</button>
        <button type="submit" className="btnDelete" name="row" onClick={this.addRowColumn} title="Add Row">Add Row</button>
        <button type="submit" className="btnClear" name="clear-sheet" onClick={this.handleClear} title="Clear All">Clear</button>

        <br/>
        <input type="text" placeholder="Type to search" onChange={this.handleSearch}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    buttonClicked : state.buttonClicked,
    buttonName : state.buttonName
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    clickButton : (bool)=>dispatch(buttonClicked(bool)),
    buttonName : (value)=>dispatch(buttonName(value))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Styler)
