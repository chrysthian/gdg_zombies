import React, { Component } from 'react';
import './App.css';
import GameManager from 'manager/GameManager';
import Keyboard from 'core/io/Keyboard';
import Mouse from 'core/io/Mouse';

class App extends Component {
  constructor(props) {
    super(props);
    GameManager.init();

    this.app = React.createRef();

    this.keyboard = new Keyboard();
    this.mouse = new Mouse();
  }

  componentDidMount() {
    this.app.current.focus();
  }

  render() {
    return (
      <div
        className="App"
        ref={this.app}
        onKeyDown={event => {
          this.keyboard.onKeyDown(event);
        }}
        onKeyUp={event => {
          this.keyboard.onKeyUp(event);
        }}
        tabIndex="0"
        style={{ position: 'absolute', overflow: 'hidden', width: window.innerWidth, height: window.innerHeight, zIndex: 10 }}
      >
        Componente React o.o
      </div>
    );
  }
}

export default App;
