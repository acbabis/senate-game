import React, { Component } from 'react';

export default class CommitteePanel extends Component {
  render() {
    const {game, connection} = this.props;
    const {playerIndex, currentMissionGroup, hasMadeSelection} = game;
    const isPlayerOnMission = currentMissionGroup.includes(playerIndex);
    return <div className="vote">
      {
        isPlayerOnMission && !hasMadeSelection ?
          <div>
            <button onClick={() => connection.sendMissionAction(true)}>
              Succeed
            </button>
            <button onClick={() => connection.sendMissionAction(false)}>
              Fail
            </button>
          </div> :
          ''
      }
    </div>
  }
}
