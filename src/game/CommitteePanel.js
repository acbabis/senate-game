import React, { Component } from 'react';

export default class CommitteePanel extends Component {
  render() {
    const {game, connection} = this.props;
    const {playerIndex, currentMissionGroup, hasMadeSelection} = game;
    const isPlayerOnMission = currentMissionGroup.includes(playerIndex);
    if(isPlayerOnMission && !hasMadeSelection) {
      return <div className="committee"> 
        <button className="action succeed" onClick={() => connection.sendMissionAction(true)}>
          Succeed
        </button>
        <button className="action fail" onClick={() => connection.sendMissionAction(false)}>
          Fail
        </button>
      </div>
    } else {
      return null;
    }
  }
}
