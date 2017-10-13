import React, { Component } from 'react';

import Util from '../Util';

export default class NominationPanel extends Component {
  render() {
    const {game} = this.props;
    const {
      state, players, playerIndex,
      succession, nextMissionSize,
      hasMadeSelection,
      currentNominations,
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
              return <h3>Waiting for committee nomination from {players[nominator]}</h3>
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
              return <h3>On committee with {Util.listFormat(currentMissionGroup
                .filter(index => index !== playerIndex)
                .map(index => players[index]))
              }</h3>
            } else {
              return <h3>
                Awaiting deliberation {
                Util.listFormat(currentMissionGroup.map(index => players[index]))
              }</h3>
            }
          } else if(state === 'end') {
            const failureCount = missionHistory.map(({isFailure}) => +isFailure).reduce((a, b) => a + b);
            if(failureCount === 3) {
              return <h3>Traitors Win</h3>
            } else {
              return <h3>Senate Wins</h3>
            }
          }
        })()}
      </div>
    );
  }
}
