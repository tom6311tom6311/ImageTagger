import React from 'react';
import PropTypes from 'prop-types';

require('./ImageBlock.styl');

const ImageBlock = (props) => {
  const {
    name,
    urlPrefix,
    onImageClick,
  } = props;

  return (
    <button
      className="imageBlock"
      onClick={e => onImageClick && onImageClick(e)}
    >
      <img
        src={urlPrefix + name}
        alt="Nothing"
      />
    </button>
  );
};

ImageBlock.propTypes = {
  name: PropTypes.string,
  urlPrefix: PropTypes.string,
  onImageClick: PropTypes.func,
};

ImageBlock.defaultProps = {
  name: '',
  urlPrefix: '',
  onImageClick: () => {},
};

export default ImageBlock;
