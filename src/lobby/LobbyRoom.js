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
        <h2>{Util.possessiveFormOf(host)} Game</h2>
        <div className="players">
          <span>Players: </span> <span className="player">{host}</span>
          {
            otherPlayers.map((player, index) => 
              <span key={index}>, <span className="player">{player}</span></span>
            )
          }
        </div>
        {
          (() => {
            if(isUserHost) {
              return <div className="menu-container">
                <button
                  className="start"
                  disabled={players.length < 5}
                  onClick={() => connection.startGame()}>Start</button>
                <button
                  className="leave"
                  onClick={() => connection.leaveGame()}>Leave</button>
              </div>
            } else {
              return <div>
                Loader
                <div className="menu-container">
                  <button
                    className="leave"
                    onClick={() => connection.leaveGame()}>Leave</button>
                </div>
              </div>
            }
          })()
        }
      </div>
    );
  }
}
