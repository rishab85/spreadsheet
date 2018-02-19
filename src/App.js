import React, { Component } from 'react';
import Table from './component/Table'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Table x={5} y={5}/>
      </div>
    );
  }
}

export default App;
