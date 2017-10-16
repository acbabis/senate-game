import React, { Component } from 'react';

import GameStepPanel from './GameStepPanel';
import CommitteeHistoryPanel from './CommitteeHistoryPanel';
import CommitteePanel from './CommitteePanel';
import PlayerPanel from './PlayerPanel';
import RolePanel from './RolePanel';
import VotePanel from './VotePanel';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      showOutcome: false
    };
  }

  componentWillReceiveProps({game: newGame}) {
    const {game: oldGame} = this.props;
    if(newGame.state === 'nomination' && oldGame.state === 'mission') {
      // Mission just ended
      this.setState({
        showOutcome: true
      });
    } else if(newGame.state === 'vote' && this.state.showOutcome) {
      // Automatically close if game proceeds
      this.setState({
        showOutcome: false
      });
    }
  }

  render() {
    const {showOutcome} = this.state;
    const {connection, game} = this.props;
    const {state, missionHistory} = game
    return (
      <div className="game">
        <div className="top">
          <CommitteeHistoryPanel game={game} />
          <GameStepPanel game={game} />
          <PlayerPanel game={game} connection={connection} />
        </div>
        <div className="bottom">
          {(() => {
            switch(state) {
            case 'vote':
              return <VotePanel game={game} connection={connection} />
            case 'mission':
              return <CommitteePanel game={game} connection={connection} />
            default:
              return '';
            }
          })()}
          <RolePanel game={game} />
        </div>
        {(() => {
          if(!showOutcome) {
            return null;
          } else {
            const {numFails, isFailure} = missionHistory.slice(-1)[0];
            return <div
              className="committee-outcome"
              data-failure={isFailure}
              onClick={() => this.setState({showOutcome: false})}
            >
              <span>{(() => {
                if(!isFailure && numFails > 0) {
                  return 'Committee succeeded with 1 nay vote';
                } else if(!isFailure) {
                  return 'Committee succeeded unanimously';
                } else if(numFails == null) { // Auto-fail from deadlock
                  return 'Failed to form a committee';
                } else {
                  return `Committee failled with ${numFails} nay vote${numFails > 1 ? 's' : ''}`;
                }
              })()}
              </span>
            </div>
          }
        })()}
      </div>
    );
  }
}
