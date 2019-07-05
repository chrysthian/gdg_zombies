import React, { Component } from 'react'
import './App.css'
import GameManager from 'manager/GameManager'

class App extends Component {
  constructor(props) {
    super(props)
    GameManager.init();
  }

  render() {
    return (
      <div className="App" style={{position: 'absolute', overflow: 'hidden'}}>
        Componente React
      </div>
    );
  }
}

export default App;
