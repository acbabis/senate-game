import React, { Component } from 'react';

export default class VotePanel extends Component {
  render() {
    const {game, connection} = this.props;
    const {hasMadeSelection} = game;
    return (
      <div className="vote">
        {
          hasMadeSelection ?
            <div>Waiting for all votes</div> :
            <div>
              <button onClick={() => connection.sendVote(true)}>Approve</button>
              <button onClick={() => connection.sendVote(false)}>Reject</button>
            </div>
        }
      </div>
    );
  }
}
