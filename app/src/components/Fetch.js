import { Component } from 'react';
import api from '../services/api/api';
import PropTypes from 'prop-types';

class Fetch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: '',
      data: undefined,
    };
  }

  componentDidMount() {
    api
      .get(this.props.route)
      .then(data => this.setState({ data, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }

  render() {
    const { loading, error, data } = this.state;
    return this.props.children(loading, error, data);
  }
}

Fetch.propTypes = {
  route: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default Fetch;
