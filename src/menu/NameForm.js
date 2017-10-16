import React, { Component } from 'react';

export default class NameForm extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    };
  }

  sendUsername(event) {
    event.preventDefault();
    const {username} = this.state;
    const {connection, onDone} = this.props;
    if(username) {
      connection.setUsername(username);
    }
    if(onDone) {
      onDone();
    }
  }

  componentDidMount() {
    this.input.focus();
  }

  render() {
    const {username} = this.props;
    return (
      <div className="enter-name">
        <form className="menu-container username" onSubmit={(e) => this.sendUsername(e)}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder={username}
            onChange={({target}) => this.setState({username: target.value})}
            ref={input => this.input = input} />
          <button>Proceed</button>
        </form>
      </div>
    );
  }
}
