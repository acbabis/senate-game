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
    const {state, players, playerIndex, succession, nextMissionSize} = game;
    const nominator = succession[0];
    const nominatorName = players[nominator];
    const isNominating = state === 'nomination' && nominator === playerIndex;
    return (
      <div className="players">
        <form data-nominating={isNominating} onSubmit={e => this.sendNominations(e)}>
          {
            players.map((player, index) => {
              const labelId = `player-checkbox-${index}`;
              return <label key={index}>
                <input
                  id={labelId}
                  type="checkbox"
                  disabled={!isNominating}
                  checked={nominations.includes(index)}
                  onChange={({target}) => this.togglePlayer(index, target.checked)} />
                <label htmlFor={labelId}>
                  {player}
                </label>
              </label>
            })
          }
          <button disabled={nominations.length !== nextMissionSize}>Nominate</button>
        </form>
      </div>
    );
  }
}
