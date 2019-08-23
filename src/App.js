import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './App.css';
import GameManager from 'manager/GameManager';
import Mouse from 'core/io/Mouse';
import { mouseDown, mouseUp, mouseMove } from 'action/MouseAction'
import { Container } from 'nes-react';

class App extends Component {
  constructor(props) {
    super(props);
    GameManager.init();

    this.app = React.createRef();

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
        onMouseMove={event => {
          this.props.mouseMove(this.mouse.onMouseMove(event));
        }}
        onMouseDown={event => {
          this.props.mouseDown(this.mouse.onMouseDown(event));
        }}
        onMouseUp={event => {
          this.props.mouseUp(this.mouse.onMouseUp(event));
        }}
        tabIndex="0"
        style={{ position: 'absolute', width: window.innerWidth, height: window.innerHeight, zIndex: 10 }}
      >
        <Container
          title={`Cérebros devorados:`}
          style={{ fontSize: '40px' }}
          centered
          dark>
          {this.props.score}
        </Container>

      </div>
    );
  }
}

const mapStateToProps = store => ({
  score: store.score.score
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      mouseDown,
      mouseUp,
      mouseMove
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

