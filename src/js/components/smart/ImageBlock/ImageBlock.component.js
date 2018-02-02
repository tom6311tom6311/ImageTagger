import React from 'react';
import PropTypes from 'prop-types';
import AppConstants from '../../../constant/App.constant';

require('./ImageBlock.styl');

const ImageBlock = (props) => {
  const {
    name,
    onImageClick,
  } = props;

  return (
    <button
      className="imageBlock"
      onClick={e => onImageClick && onImageClick(e)}
    >
      <img
        src={AppConstants.SEVER_URL + AppConstants.SERVER_ROUTE.GET.IMAGES + name}
        alt="Nothing"
      />
    </button>
  );
};

ImageBlock.propTypes = {
  name: PropTypes.string,
  onImageClick: PropTypes.func,
};

ImageBlock.defaultProps = {
  name: '',
  onImageClick: () => {},
};

export default ImageBlock;
