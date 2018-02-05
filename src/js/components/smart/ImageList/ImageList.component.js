import React from 'react';
import PropTypes from 'prop-types';
import ImageBlock from '../ImageBlock/ImageBlock.component';

require('./ImageList.styl');

const ImageList = (props) => {
  const { imageArr, urlPrefix, onViewImageDetail } = props;
  const imageBlocks = imageArr.map(image => (
    <li key={image.key}>
      <ImageBlock
        name={image.name}
        urlPrefix={urlPrefix}
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
  urlPrefix: PropTypes.string,
  onViewImageDetail: PropTypes.func,
};

ImageList.defaultProps = {
  imageArr: [],
  urlPrefix: '',
  onViewImageDetail: () => {},
};

export default ImageList;
