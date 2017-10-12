import React, { Component } from 'react';

export default class NameForm extends Component {
  setUsername(event) {
    event.preventDefault();
    const {connection, onDone} = this.props;
    const username = new FormData(event.target).get('username');
    if(username) {
      connection.setUsername(username);
    }
    if(onDone) {
      onDone();
    }
  }

  render() {
    const {username} = this.props;
    return (
      <div className="enter-name">
        <form className="menu-container username" onSubmit={(e) => this.setUsername(e)}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder={username}
            autoFocus/>
          <button>Proceed</button>
        </form>
      </div>
    );
  }
}
