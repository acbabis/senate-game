import React, { Component } from 'react';

export default class CommitteePanel extends Component {
  render() {
    const {game, connection} = this.props;
    const {playerIndex, currentMissionGroup, hasMadeSelection} = game;
    const isPlayerOnMission = currentMissionGroup.includes(playerIndex);
    if(isPlayerOnMission && !hasMadeSelection) {
      return <div className="vote"> 
        <button onClick={() => connection.sendMissionAction(true)}>
          Succeed
        </button>
        <button onClick={() => connection.sendMissionAction(false)}>
          Fail
        </button>
      </div>
    } else {
      return null;
    }
  }
}
