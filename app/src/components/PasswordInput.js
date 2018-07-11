import { InputAdornment, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { RemoveRedEye } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => {
  return {
    eye: {
      cursor: 'pointer',
    },
  };
};

class PasswordInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordIsMasked: true,
    };
  }

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };

  render() {
    const { passwordIsMasked } = this.state;
    const { classes, ...rest } = this.props;

    return (
      <TextField
        type={passwordIsMasked ? 'password' : 'text'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <RemoveRedEye
                className={classes.eye}
                onClick={this.togglePasswordMask}
              />
            </InputAdornment>
          ),
          className: classes.input,
        }}
        {...rest}
      />
    );
  }
}

PasswordInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (PasswordInput = withStyles(styles)(PasswordInput));
