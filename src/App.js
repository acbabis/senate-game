import React, { Component } from 'react';
import './App.css';
import './game/CommitteeHistoryPanel.css';
import './game/CommitteePanel.css';
import './game/Game.css';
import './game/PlayerPanel.css';
import './game/RolePanel.css';
import './game/VotePanel.css';
import './lobby/LobbyRoom.css';
import './lobby/Lobby.css';
import './menu/HostFlow.css';
import './menu/NameForm.css';

import SocketConnection from './SocketConnection';

import Lobby from './lobby/Lobby';
import LobbyRoom from './lobby/LobbyRoom';
import HostFlow from './menu/HostFlow';
import NameForm from './menu/NameForm';
import Game from './game/Game';

const VIEW_NAME = 0;
const VIEW_FLOW = 1;
const VIEW_HOST_SELECT = 2;
const VIEW_LOBBY = 3;
const VIEW_ROOM = 4;
const VIEW_GAME = 5;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      view: VIEW_NAME,
      hasPlayerLeft: false
    };
  }

  componentDidMount() {
    this.connection = SocketConnection.open(stateChange => {
      const {room, game, error} = stateChange;
      if(error) {
        if(error.match(/password/i)) {
          alert(error);
        }
      } else if(room) {
        this.setState(Object.assign({}, {view: VIEW_ROOM}, stateChange));
      } else if(room === null) {
        this.setState(Object.assign({}, {view: VIEW_LOBBY}, stateChange));
      } else if(game) {
        this.setState(Object.assign({}, {view: VIEW_GAME}, stateChange));
      } else {
        this.setState(stateChange)
      }
    })
  }

  onNameSet() {
    this.setState({view: VIEW_FLOW});
    const {search} = window.location;
    const gameId = search.slice(1);
    if(gameId) {
      this.connection.joinGame(gameId);
      window.history.pushState('string', document.title, '/');
    }
  }

  render() {
    const {connection} = this;
    const {hasPlayerLeft, username, room, rooms, game, isUserHost} = this.state;
    return (
      <div className="App">
        {(() => {
          switch(this.state.view) {
            case VIEW_NAME:
              return <NameForm
                currentUsername={username}
                connection={connection}
                onDone={() => this.onNameSet()} />
            case VIEW_FLOW:
              return <div className="select-flow menu-container">
                <button className="host" onClick={() => this.setState({view: VIEW_HOST_SELECT})}>Host</button>
                <button className="join" onClick={() => this.setState({view: VIEW_LOBBY})}>Join</button>
              </div>
            case VIEW_HOST_SELECT:
              return <HostFlow connection={connection} />
            case VIEW_LOBBY:
              return <Lobby
                rooms={rooms}
                connection={connection}
                onHost={() => this.setState({view: VIEW_HOST_SELECT})} />
            case VIEW_ROOM:
              return <LobbyRoom room={room} connection={connection} isUserHost={isUserHost} />
            case VIEW_GAME:
              return <Game game={game} connection={connection} />
            default:
              break;
          }
        })()}
        {(() => {
          if(!hasPlayerLeft) {
            return null;
          } else {
            return <div
              className="leave-message"
              onClick={() => this.setState({hasPlayerLeft: false, view: VIEW_LOBBY})}
            >
              <h2>We're sorry</h2>
              <p>A player has left the game.</p>
              <p>Returning to lobby.</p>
            </div>
          }
        })()}
      </div>
    );
  }
}
