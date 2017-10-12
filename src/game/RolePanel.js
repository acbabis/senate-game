import React, { Component } from 'react';

import Util from '../Util';

export default class RolePanel extends Component {
  constructor() {
    super();
    this.state = {
      isViewingRole: false
    };
  }

  toggleRole(isViewingRole) {
    this.setState({isViewingRole});
  }

  render() {
    const {isViewingRole} = this.state;
    const {game} = this.props;
    const {players, badFaction, playerIndex} = game;
    let accompliceString;
    if(badFaction) {
      const accomplices = badFaction
        .filter(index => index !== playerIndex)
        .map(index => players[index]);
      accompliceString = Util.listFormat(accomplices);
    }
    return (
      <div className="role"
        onMouseDown={() => this.toggleRole(true)}
        onMouseUp={() => this.toggleRole(false)}
        onMouseLeave={() => this.toggleRole(false)}
        onTouchStart={() => this.toggleRole(true)}
        onTouchEnd={() => this.toggleRole(false)}>
      {
        isViewingRole ?
          (badFaction ?
            <span className="evil">
              {`Traitor with ${accompliceString}`}
            </span> : 
            <span className="good">
              Senator
            </span>) :
          'Press to View Role'
      }
      </div>
    );
  }
}
