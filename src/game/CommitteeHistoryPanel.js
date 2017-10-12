import React, { Component } from 'react';

export default class CommitteeHistoryPanel extends Component {
  render() {
    const {missionHistory} = this.props.game;
    return (
      <div className="history">
        {
          missionHistory.map(({numFails, isFailure}, index) =>
            <div key={index}
              className={isFailure ? 'failure' : 'success'}>
              {numFails} fail votes
            </div>
          )
        }
      </div>
    );
  }
}
