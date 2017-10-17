import React, { Component } from 'react';

export default class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.lastUsername || ''
    };
  }

  sendUsername(event) {
    event.preventDefault();
    const {username} = this.state;
    const {connection, onDone} = this.props;
    if(username) {
      localStorage.lastUsername  = username;
      connection.setUsername(username);
    }
    if(onDone) {
      onDone();
    }
  }

  componentDidMount() {
    this.input.focus();
    this.input.select();
  }

  render() {
    const {username} = this.state;
    const {currentUsername} = this.props;

    return (
      <div className="enter-name">
        <form className="menu-container username" onSubmit={(e) => this.sendUsername(e)}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            placeholder={currentUsername}
            onChange={({target}) => this.setState({username: target.value})}
            ref={input => this.input = input} />
          <button>Proceed</button>
        </form>
      </div>
    );
  }
}
