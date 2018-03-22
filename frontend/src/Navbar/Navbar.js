import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs from 'material-ui/Tabs';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import TabMod from './TabMod';
import { Greeting, NavLinkStyled, Wrapper } from './styled';

import paths from './config';

const propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

const defaultProps = {
  history: { location: { pathname: '' } },
};

// https://stackoverflow.com/a/48934864/6696407
const styles = theme => ({
  fullHeight: {
    ...theme.mixins.toolbar,
  },
});

class Navbar extends React.Component {
  state = {
    value: 0,
  };

  componentDidMount() {
    const initialPath = this.props.history.location.pathname.split('/')[1];
    const idx = paths.findIndex(p => p.stem === initialPath);
    // eslint-disable-next-line
    this.setState(() => ({
      value: idx < 0 ? false : idx,
    }));
  }

  handleIndicator = (e, value) => {
    this.setState(() => ({
      value,
    }));
  };

  hideIndicator = () => {
    this.setState(() => ({
      value: false,
    }));
  };

  render() {
    const { value } = this.state;
    const { classes, isLoggedIn, username, userId } = this.props;

    return (
      <Wrapper>
        <AppBar position="static">
          <Toolbar disableGutters>
            <Tabs
              classes={{ root: classes.fullHeight }}
              value={value}
              onChange={this.handleIndicator}
              indicatorColor="secondary"
              fullWidth={false}
            >
              <TabMod idx={0} exact classes={classes} />
              {isLoggedIn && <TabMod idx={1} classes={classes} />}
              {isLoggedIn && <TabMod idx={2} classes={classes} />}
              {isLoggedIn && <TabMod idx={3} classes={classes} />}
              <TabMod idx={4} classes={classes} />
            </Tabs>
            <Greeting>
              Hi,{' '}
              {// prettier reformats (to) this, I don't like it.
              isLoggedIn ? (
                <Link to={`/users/${userId}`}>{username}</Link>
              ) : (
                'Guest'
              )}
            </Greeting>
            {isLoggedIn ? (
              <NavLinkStyled to="/logout" onClick={this.hideIndicator}>
                <Typography variant="button">Logout</Typography>
              </NavLinkStyled>
            ) : (
              <NavLinkStyled to="/login" onClick={this.hideIndicator}>
                <Typography variant="button">Login</Typography>
              </NavLinkStyled>
            )}
          </Toolbar>
        </AppBar>
      </Wrapper>
    );
  }
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default withStyles(styles)(Navbar);
