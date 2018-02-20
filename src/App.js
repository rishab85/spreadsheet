import React, { Component } from 'react';
import {connect} from 'react-redux';
import Table from './component/Table'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Table x={this.props.tableStructure.x} y={this.props.tableStructure.y}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return{
      tableStructure : state.tableStructure
    }
}

export default connect(mapStateToProps)(App);
