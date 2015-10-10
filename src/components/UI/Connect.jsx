import React from 'react';
import { branch } from 'baobab-react/decorators';

@branch({
  cursors: {
    servers: ['servers'],
    accounts: ['accounts']
  }
})
class Connect extends React.Component {

  handleConnect() {
    let acount = this.props.accounts[this.refs.activeAccount.value];
    let server = this.props.servers[this.refs.activeServer.value];
  }

  render() {
    let { servers, accounts } = this.props;

    if (!servers.length || !accounts.length) {
      return null;
    }

    return (
      <div className='container'>

        {/* server selection */}
        <div className='formgroup'>
          <label className='selector-title'>Server</label>
          <div className='select-control'>
            <div className='arrow'><i className='fa fa-chevron-down'></i></div>
            <select ref='activeServer'>
              { servers.map((server, i) => {
                return <option key={ i } value={ i }>{ server.name }</option>;
              }) }
            </select>
          </div>
        </div>

        {/* account selection */}
        <div className='formgroup'>
          <label className='selector-title'>Account</label>
          <div className='select-control'>
            <div className='arrow'><i className='fa fa-chevron-down'></i></div>
            <select ref='activeAccount'>
              { accounts.map((account, i) => {
                return <option key={ i } value={ i }>{ account.username }</option>;
              }) }
            </select>
          </div>
        </div>

        {/* = connect = */}
        <div className='btn btn-primary' onTouchEnd={ ::this.handleConnect }>
          Connect
        </div>

      </div>
    );
  }
}

export default Connect;
