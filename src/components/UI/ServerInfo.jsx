import React from 'react';
import { branch } from 'baobab-react/decorators';

@branch({
  cursors: {
    connected: ['connected']
  }
})
class ServerInfo extends React.Component {

  render() {
    let { connected } = this.props;

    return (
      <div className='serverinfo'>
        <i className='fa fa-check-circle-o online'></i>
        <span>
          { connected.username } @ { connected.host }:{ connected.port }
        </span>
      </div>
    );
  }
}

export default ServerInfo;
