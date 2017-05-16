import React, { Component } from 'react';
import './App.css';
import List from './List.js';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>// todo.ly</h1>
          <List />
      </div>
    );
  }
}

export default App;
