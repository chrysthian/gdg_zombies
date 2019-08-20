import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './App.css';
import GameManager from 'manager/GameManager';
import Keyboard from 'core/io/Keyboard';
import Mouse from 'core/io/Mouse';

import { keyDown, keyUp } from 'action/KeyboardAction'

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
            this.props.keyDown(this.keyboard.onKeyDown(event))
          }}
          onKeyUp={event => {
            this.props.keyUp(this.keyboard.onKeyUp(event))
          }}
          onMouseMove={event => {
            this.mouse.onMouseMove(event);
          }}
          onMouseDown={event => {
            this.mouse.onMouseDown(event);
          }}
          onMouseUp={event => {
            this.mouse.onMouseUp(event);
          }}
          tabIndex="0"
          style={{ position: 'absolute', width: window.innerWidth, height: window.innerHeight, zIndex: 10 }}
        >
          Componente React o.o
        </div>
    );
  }
}

const mapStateToProps = store => ({
  keyboard: store.keyboard
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      keyUp,
      keyDown,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

