import React,{Component} from 'react';
import {connect} from 'react-redux';
import {buttonClicked, buttonName} from '../action/tableAction'
class Styler extends Component{

  handleClick = (e) =>{
    e.preventDefault();
    this.props.handleButton(e.target.name);

  }
  render(){
    return(
      <div className="styler">
        <button type="submit" className="font-bold" name="font-bold" onClick={this.handleClick}>B</button>
        <button type="submit" className="font-italics" name="font-italics" onClick={this.handleClick}>I</button>
        <button type="submit" className="redBtn" name="color-red" onClick={this.handleClick}>A</button>
        <button type="submit" className="blueBtn" name="color-blue" onClick={this.handleClick}>A</button>
        <button type="submit" className="btnDelete" name="delete-row" onClick={this.handleClick}>Delete Row</button>
        <button type="submit" className="btnDelete" name="delete-row" onClick={this.handleClick}>Delete Column</button>
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
