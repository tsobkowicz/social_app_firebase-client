import React from 'react';
import PropTypes from 'prop-types';

// MUI components
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const MyButton = ({
  children,
  onClick,
  btnClassName,
  tip,
  tipClassName,
  placement,
}) => (
  <Tooltip title={tip} className={tipClassName} placement={placement}>
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);

MyButton.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func,
  btnClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  tip: PropTypes.string,
  tipClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  placement: PropTypes.string,
};

export default MyButton;
