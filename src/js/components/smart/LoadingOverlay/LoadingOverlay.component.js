import React from 'react';
import PropTypes from 'prop-types';
import LoadingImg from '../../../../../res/loading.gif';

require('./LoadingOverlay.styl');

const LoadingOverlay = (props) => {
  const {
    isLoading,
    loadingText,
  } = props;

  if (!isLoading) {
    return (
      <div className="loadingOverlay loadingOverlayClose" />
    );
  }

  return (
    <div className="loadingOverlay loadingOverlayOpen">
      <img
        className="loadingOverlayImage"
        src={LoadingImg}
        alt="Nothing"
      />
      <div
        className="loadingOverlayText"
      >
        {loadingText}
      </div>
    </div>
  );
};

LoadingOverlay.propTypes = {
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
};

LoadingOverlay.defaultProps = {
  isLoading: false,
  loadingText: 'Loading...',
};

export default LoadingOverlay;
