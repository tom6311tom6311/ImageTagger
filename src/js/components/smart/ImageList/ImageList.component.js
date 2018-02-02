import React from 'react';
import PropTypes from 'prop-types';
import ImageBlock from '../ImageBlock/ImageBlock.component';

require('./ImageList.styl');

const ImageList = (props) => {
  const { imageArr, onViewImageDetail } = props;
  const imageBlocks = imageArr.map(image => (
    <li key={image.key}>
      <ImageBlock
        name={image.name}
        concepts={image.concepts}
        onImageClick={e => onViewImageDetail && onViewImageDetail(e, image.key)}
      />
    </li>
  ));
  return (
    <ul className="imageList">{imageBlocks}</ul>
  );
};

ImageList.propTypes = {
  imageArr: PropTypes.arrayOf(PropTypes.object),
  onViewImageDetail: PropTypes.func,
};

ImageList.defaultProps = {
  imageArr: [],
  onViewImageDetail: () => {},
};

export default ImageList;
