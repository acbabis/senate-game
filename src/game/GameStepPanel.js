import React, { Component } from 'react';

export default class NominationPanel extends Component {
  render() {
    const {game} = this.props;
    const {
      state, players, playerIndex,
      succession, nextMissionSize,
      hasMadeSelection,
      currentMissionGroup,
      missionHistory
    } = game;
    return (
      <div className="game-step">
        {(() => {
          if(state === 'nomination') {
            const nominator = succession[0];
            if(nominator === playerIndex) {
              return <h3>{`Nominate ${nextMissionSize} committee members`}</h3>
            } else {
              return <h3>{players[nominator]} nominating committee</h3>
            }
          } else if(state === 'vote') {
            if(hasMadeSelection) {
              return <h3>Waiting for all votes</h3>
            } else {
              return <h3>Voting on committee</h3>
            }
          } else if(state === 'mission') {
            const isPlayerOnMission = currentMissionGroup.includes(playerIndex);
            if(isPlayerOnMission) {
              return <h3>On committee</h3>
            } else {
              return <h3>Awaiting deliberation</h3>
            }
          } else if(state === 'end') {
            const failureCount = missionHistory.map(({isFailure}) => +isFailure).reduce((a, b) => a + b);
            if(failureCount === 3) {
              return <h3 className="defeat">Traitors Win</h3>
            } else {
              return <h3 className="senate">Senate Wins</h3>
            }
          }
        })()}
      </div>
    );
  }
}
