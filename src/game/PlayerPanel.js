import React, { Component } from 'react';

export default class PlayerPanel extends Component {
  constructor() {
    super();
    this.state = {
      nominations: []
    };
  }

  togglePlayer(index, isNominated) {
    let nominations = this.state.nominations.slice();
    if(isNominated) {
      nominations.push(index);
    } else {
      nominations = nominations.filter(i => i !== index);
    }
    this.setState({nominations});
  }

  sendNominations(event) {
    event.preventDefault();
    this.props.connection.sendNominations(this.state.nominations);
    this.setState({
      nominations: []
    });
  }

  render() {
    const {nominations} = this.state;
    const {game} = this.props;
    const {
      state, players, playerIndex,
      succession, nextMissionSize,
      currentNominations, rejectedNominations,
      currentMissionGroup,
      lastVote
    } = game;
    const nominator = succession[0];
    const isNominationStep = state === 'nomination';
    const isVoteStep = state === 'vote';
    const isCommitteeStep = state === 'mission';
    const isSpeaker = nominator === playerIndex;
    const showSpeaker = isNominationStep || isVoteStep;
    const isNominating = isSpeaker && isNominationStep;
    return (
      <div className="players-panel">
        <form data-nominating={isNominating}
          data-voting={isVoteStep}
          onSubmit={e => this.sendNominations(e)}
        >
          {
            players.map((player, index) => {
              const labelId = `player-checkbox-${index}`;
              const isPlayerSpeaker = nominator === index;
              const isPlayerNominated = isVoteStep && currentNominations.includes(index);
              const wasNominationRejected = !!rejectedNominations && rejectedNominations.includes(index);
              return <label key={index} data-nominated={isPlayerNominated}>
                <input
                  id={labelId}
                  type="checkbox"
                  disabled={!isNominating}
                  checked={nominations.includes(index)}
                  onChange={({target}) => this.togglePlayer(index, target.checked)} />
                <label className="player" htmlFor={labelId}>
                  <div className="player-name">{player}</div>
                  <div className="player-icons">
                    <span
                      data-applicable={(isPlayerSpeaker && showSpeaker) || wasNominationRejected}
                      role="img"
                      aria-label={wasNominationRejected ? 'Nomination Rejected' : 'Speaker'}
                      title={wasNominationRejected ? 'Nomination Rejected' : 'Speaker'}
                    >
                      {wasNominationRejected ? '👎' : '⚖️'}
                    </span>
                    <span
                      data-applicable={(isVoteStep && currentNominations.includes(index)) || (isCommitteeStep && currentMissionGroup.includes(index))}
                      role="img"
                      aria-label="On Committee"
                      title="On Committee">&#x1f4dc;</span>
                    <span
                      data-applicable={!!lastVote}
                      role="img"
                      aria-label={lastVote && lastVote[index] ? "Approved Committee" : "Rejected Committee"}
                      title={lastVote && lastVote[index] ? "Approved Committee" : "Rejected Committee"}
                    >{lastVote && lastVote[index] ? '⚪' : '⚫'}</span>
                  </div>
                </label>
              </label>
            })
          }
          {
            isNominating ?
            <button className="nominate action" disabled={nominations.length !== nextMissionSize}>Nominate</button> :
            ''
          }
        </form>
      </div>
    );
  }
}
