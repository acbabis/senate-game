import React, { Component } from 'react';

export default class CommitteeHistoryPanel extends Component {
  render() {
    const {state, missionHistory, missionSizes} = this.props.game;
    return (
      <div className="history">
        {
          new Array(5).fill(null).map((u, index) => {
              const mission = missionHistory[index];
              const isMissionActive = state === 'mission' && index === missionHistory.length;
              if(mission) {
              }
              return <div key={index}
                className="mission"
                data-active={isMissionActive}
                data-completed={!!mission}
              >
                <div class="front">
                  <span>{missionSizes[index]}</span>
                </div>
                <div class="back">
                  {(() => {
                    if(mission) {
                      const {isFailure} = mission;
                      return <span>{isFailure ? '❌' : '✔️'}</span>
                    }
                  })()}
                </div>
              </div>
          })
        }
      </div>
    );
  }
}
