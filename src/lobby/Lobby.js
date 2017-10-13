import React, { Component } from 'react';

import Util from '../Util';

export default class Lobby extends Component {
  constructor() {
    super();
    this.state = {
      passwordMode: false
    };
  }

  joinGame(id, requiresPassword) {
    const {connection} = this.props;
    if(requiresPassword) {
      connection.joinGame(id, prompt('password'));
    } else {
      connection.joinGame(id);
    }
  }

  render() {
    const {rooms, onHost} = this.props;
    return (
      <div className="lobby">
        <div className="top-menu">
          {
            onHost ?
            <button onClick={onHost}>Host</button> :
            ''
          }
          <h2>Lobby</h2>
        </div>
        <div className="listing">
          {
            rooms.local.map(({id, players}) =>
              <button key={id} onClick={() => this.joinGame(id)}>
                <div className="names">
                  <div className="host">{Util.possessiveFormOf(players[0])} game</div>
                  <div className="others">{players.slice(1).join(', ')}</div>
                </div>
              </button>
            )
          }
          {
            rooms.password.map(({id, players}) =>
              <button key={id} onClick={() => this.joinGame(id, true)}>
                <div className="names">
                  <div className="host">{Util.possessiveFormOf(players[0])} game</div>
                  <div className="others">{players.slice(1).join(', ')}</div>
                </div>
                <span
                  role="img"
                  aria-label="Password Protected"
                  title="Password Protected">&#x1f512;</span>

              </button>
            )
          }
        </div>
      </div>
    );
  }
}
