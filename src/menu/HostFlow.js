import React, { Component } from 'react';

export default class HostFlow extends Component {
  constructor() {
    super();
    this.state = {
      passwordMode: false
    };
  }

  hostLocalGame() {
    const {connection, onDone} = this.props;
    connection.hostLocalGame();
    if(onDone) {
      onDone();
    }
  }

  hostLinkGame() {
    const {connection, onDone} = this.props;
    connection.hostLinkGame();
    if(onDone) {
      onDone();
    }
  }

  hostPasswordGame(event) {
    event.preventDefault();
    const {password} = this.state;
    const {connection, onDone} = this.props;
    connection.hostPasswordGame(password);
    if(onDone) {
      onDone();
    }
  }

  render() {
    const {passwordMode} = this.state;
    return (
      <div className="select-lobby-type menu-container">
        <h3>How will people join?</h3>
        <button className="local" onClick={() => this.hostLocalGame()}>
          GPS (same room only)
        </button>
        <button className="link" onClick={() => this.hostLinkGame()}>
          Link
        </button>
        <button className="password" onClick={() => this.setState({passwordMode: true})}>
          Password
        </button>
        {
          passwordMode ? 
            <form className="password-overlay" onSubmit={e => this.hostPasswordGame(e)}>
              <input
                type="text"
                placeholder="Password"
                onChange={({target}) => this.setState({password: target.value})}/>
              <button>Submit</button>
            </form> :
            ''
        }
      </div>
    );
  }
}
