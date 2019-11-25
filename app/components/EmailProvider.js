import React from 'react';

const DEFAULT_STATE = {
  email: '',
  token: ''
};

export const EmailContext = React.createContext(DEFAULT_STATE);

export default class EmailProvider extends React.Component {
  state = DEFAULT_STATE;

  emailChanged = (email, token) => {
    this.setState({email, token});
  };

  render() {
    return (
      <EmailContext.Provider
        value={{
          ...this.state,
          emailChanged: this.emailChanged,
        }}
      >
        {this.props.children}
      </EmailContext.Provider>
    );
  }
}