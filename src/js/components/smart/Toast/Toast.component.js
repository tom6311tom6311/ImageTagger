import React from 'react';
import PropTypes from 'prop-types';

require('./Toast.styl');

const Toast = (props) => {
  const { message } = props;
  if (message === '') {
    return (
      <div className="toast toastClose" />
    );
  }
  return (
    <div className="toast toastOpen">{message}</div>
  );
};

Toast.propTypes = {
  message: PropTypes.string,
};

Toast.defaultProps = {
  message: '',
};

export default Toast;
