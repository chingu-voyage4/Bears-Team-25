import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';

const propTypes = {
  anchor: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const MessageBar = ({ anchor, message, handleClose }) => (
  // snackbarcontentprops has to be all lowercase or we get a warning
  // React does not recognize the `snackbarcontentProps` prop on a DOM element.
  <Snackbar
    anchorOrigin={anchor}
    open={message.show}
    onClose={handleClose}
    autoHideDuration={message.error ? null : 3000}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={
      <span id="message-id">{message.text || 'Something went wrong :('}</span>
    }
  />
);

MessageBar.propTypes = propTypes;

export default MessageBar;
