import React from 'react';
import PropTypes from 'prop-types';

// Material-UI components
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { Label } from './styled';

const propTypes = {
  canEdit: PropTypes.bool,
  label: PropTypes.string.isRequired,
  mobile: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
};

const defaultProps = {
  canEdit: true,
  mobile: false,
  onChange: () => {},
};

const ListItemInput = ({ mobile, canEdit, label, name, value, onChange }) => (
  <ListItem>
    {mobile ? (
      <TextField
        id={name}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        fullWidth
        disabled={!canEdit}
      />
    ) : (
      <React.Fragment>
        <Label>
          <Typography variant="title">{label}:</Typography>
        </Label>
        <ListItemText>
          <TextField
            fullWidth
            value={value}
            name={name}
            onChange={onChange}
            disabled={!canEdit}
          />
        </ListItemText>
      </React.Fragment>
    )}
  </ListItem>
);

ListItemInput.propTypes = propTypes;
ListItemInput.defaultProps = defaultProps;

export default ListItemInput;
