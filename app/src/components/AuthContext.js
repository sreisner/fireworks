import React from 'react';
import AuthService from '../services/api/auth/auth';
import PropTypes from 'prop-types';

const AuthContext = React.createContext({});

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      loadingCurrentUser: true,
    };
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  loadCurrentUser = () => {
    this.setState({ loadingCurrentUser: true });

    return AuthService.getCurrentUser().then(user =>
      this.setState({
        user,
        loadingCurrentUser: false,
      })
    );
  };

  login = (email, password) => {
    return AuthService.login(email, password)
      .then(user => {
        this.setState({ user });
        return true;
      })
      .catch(err => false);
  };

  logout = () => {
    return AuthService.logout().then(() => {
      this.setState({ user: undefined });
    });
  };

  render() {
    const { children } = this.props;

    return (
      <AuthContext.Provider
        value={{
          user: this.state.user,
          login: this.login,
          logout: this.logout,
          loadingCurrentUser: this.state.loadingCurrentUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

AuthContext.propTypes = {
  children: PropTypes.object.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
