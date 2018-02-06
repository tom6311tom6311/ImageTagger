import React from 'react';
import PropTypes from 'prop-types';
import FaceImageList from '../FaceImageList/FaceImageList.component';

require('./CategorizedImageList.styl');

const CategorizedImageList = (props) => {
  const { imageCatagoryArr, urlPrefix, onViewImageDetail } = props;
  const Categories = imageCatagoryArr.map((category, idx) => (
    <li key={category.name}>
      <FaceImageList
        title={category.name}
        fileNames={category.fileNames}
        urlPrefix={urlPrefix}
        onViewImageDetail={(e, subIdx) => onViewImageDetail && onViewImageDetail(e, idx, subIdx)}
      />
    </li>
  ));
  return (
    <ul className="CatgorizedImageList">{Categories}</ul>
  );
};

CategorizedImageList.propTypes = {
  imageCatagoryArr: PropTypes.arrayOf(PropTypes.object),
  urlPrefix: PropTypes.string,
  onViewImageDetail: PropTypes.func,
};

CategorizedImageList.defaultProps = {
  imageCatagoryArr: [],
  urlPrefix: '',
  onViewImageDetail: () => {},
};

export default CategorizedImageList;
