import React from 'react';
import PropTypes from 'prop-types';
import ImageBlock from '../ImageBlock/ImageBlock.component';

require('./FaceImageList.styl');

const FaceImageList = (props) => {
  const {
    title,
    fileNames,
    urlPrefix,
    onViewImageDetail,
  } = props;
  const imageBlocks = fileNames.map((fileName, idx) => (
    <li key={fileName}>
      <ImageBlock
        name={fileName}
        urlPrefix={urlPrefix}
        onImageClick={e => onViewImageDetail && onViewImageDetail(e, idx)}
      />
    </li>
  ));
  return (
    <div className="faceImageList">
      <div className="faceImageListTitle">{title}</div>
      <ul>{imageBlocks}</ul>
    </div>
  );
};

FaceImageList.propTypes = {
  title: PropTypes.string,
  fileNames: PropTypes.arrayOf(PropTypes.string),
  urlPrefix: PropTypes.string,
  onViewImageDetail: PropTypes.func,
};

FaceImageList.defaultProps = {
  title: '',
  fileNames: [],
  urlPrefix: '',
  onViewImageDetail: () => {},
};

export default FaceImageList;
