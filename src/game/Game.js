import React, { Component } from 'react';

import GameStepPanel from './GameStepPanel';
import CommitteeHistoryPanel from './CommitteeHistoryPanel';
import CommitteePanel from './CommitteePanel';
import PlayerPanel from './PlayerPanel';
import RolePanel from './RolePanel';
import VotePanel from './VotePanel';

export default class Game extends Component {
  render() {
    const {connection, game} = this.props;
    const {state} = game
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
      </div>
    );
  }
}
