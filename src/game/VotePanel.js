import React, { Component } from 'react';

export default class VotePanel extends Component {
  render() {
    const {game, connection} = this.props;
    const {hasMadeSelection} = game;
    return (
      <div className="vote">
        {
          hasMadeSelection ?
            '' :
            <div className="buttons">
              <button className="action approve" onClick={() => connection.sendVote(true)}>Approve</button>
              <button className="action reject" onClick={() => connection.sendVote(false)}>Reject</button>
            </div>
        }
      </div>
    );
  }
}
