import React, { Component } from 'react';

import Util from '../Util';

import spinner from './spinner.svg';

export default class LobbyRoom extends Component {
  constructor() {
    super();
    this.state = {
      passwordMode: false
    };
  }

  render() {
    const {connection, room, isUserHost} = this.props;
    if(!room) {
      return null;
    }
    const {id, players, type} = room;
    const host = players[0];
    const otherPlayers = players.slice(1);
    return (
      <div className="lobby-room">
        <h2>{Util.possessiveFormOf(host)} Game</h2>
        <div className="middle">
          <div className="players">
            <span>Players: </span> <span className="player">{host}</span>
            {
              otherPlayers.map((player, index) => 
                <span key={index}>, <span className="player">{player}</span></span>
              )
            }
          </div>
          {
            type === 'link' ?
              <div className="invite">
                <h3>Share this Link</h3>
                <a href={window.location.host + '?' + id}>
                  {window.location.host + '?' + id}
                </a>
              </div> : ''
          }
        </div>
        {
          isUserHost ? '' :
            <img
              src={spinner}
              alt="Loading"
              width="100"
              height="100"
            />
        }
        <div className="menu-container">
          {
            isUserHost ?
              <button
                className="start"
                disabled={players.length < 5}
                onClick={() => connection.startGame()}>Start</button> : ''
          }
          <button
            className="leave"
            onClick={() => connection.leaveGame()}>Leave</button>
        </div>

      </div>
    );
  }
}
