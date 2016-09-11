import React, { PropTypes, Component } from 'react';
import * as themes from 'redux-devtools-themes';
import { profileAction } from './actions';
import reducer from './reducers';

const styles = {
  container: {
    fontFamily: '"Roboto Mono", "Droid Sans Mono", Monaco, Consolas, "Lucida Console", monospace',
    position: 'relative',
    overflowY: 'hidden',
    width: '100%',
    height: '100%',
    minWidth: 300,
    direction: 'ltr',
    padding: '5px',
  },
};

export default class ProfilerMonitor extends Component {
  static update = reducer;

  static propTypes = {
    dispatch: PropTypes.func,
    monitorState: PropTypes.shape({
      profileAction: PropTypes.string.isRequired,
    }),

    theme: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    theme: 'nicinabox',
  };

  getTheme() {
    const { theme } = this.props;
    if (typeof theme !== 'string') {
      return theme;
    }

    if (typeof themes[theme] !== 'undefined') {
      return themes[theme];
    }

    console.warn(`DevTools theme ${theme} not found, defaulting to nicinabox`);
    return themes.nicinabox;
  }

  handleProfileActionChange = (event) => {
    this.props.dispatch(profileAction(event.target.value));
  }

  render() {
    const theme = this.getTheme();

    return (
      <div style={{ ...styles.container, backgroundColor: theme.base00 }}>
        <span style={{ color: theme.base06 }}>Profile Action: </span>
        <input
          type="text"
          value={this.props.monitorState.profileAction}
          onChange={this.handleProfileActionChange}
        />
      </div>
    );
  }
}
