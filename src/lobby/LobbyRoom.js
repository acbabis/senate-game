import React, { Component } from 'react';

import Util from '../Util';

export default class LobbyRoom extends Component {
  constructor() {
    super();
    this.state = {
      passwordMode: false
    };
  }

  render() {
    const {connection, room, isUserHost} = this.props;
    const {players} = room;
    const host = players[0];
    const otherPlayers = players.slice(1);
    return (
      <div className="lobby-room">
        <h3>{Util.possessiveFormOf(host)} Game</h3>
        <p>{Util.listFormat(otherPlayers)}</p>
        {
          isUserHost ?
            <div>
              <button
                disabled={players.length < 5}
                onClick={() => connection.startGame()}>Start</button>
            </div> :
            <div>
              Loader
            </div>
        }
        <button onClick={() => connection.leaveGame()}>Leave</button>
      </div>
    );
  }
}
