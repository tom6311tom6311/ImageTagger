import React from 'react';
import PropTypes from 'prop-types';
import AppConstants from '../../../constant/App.constant';
import ConceptRow from '../ConceptRow/ConceptRow.component';

require('./ImageViewer.styl');

const ImageViewer = (props) => {
  const {
    isTagger,
    image,
    onClose,
  } = props;
  const conceptRows = image.concepts && image.concepts.map(concept =>
    <ConceptRow key={concept.id} concept={concept} />);

  if (typeof image.name === 'undefined') {
    return (
      <div className="imageViewer imageViewerClose" />
    );
  }

  return (
    <div className="imageViewer imageViewerOpen">
      <button
        className="imageViewerCloseButton"
        onClick={e => onClose && onClose(e)}
      >
        &times;
      </button>
      <div className="imageViewerBlock">
        <img
          className="imageViewerBlockImage"
          src={AppConstants.SEVER_URL + (
            isTagger ?
            AppConstants.SERVER_ROUTE.GET.IMAGES.TAGGER :
            AppConstants.SERVER_ROUTE.GET.IMAGES.FACE
          ) + image.name}
          alt="Nothing"
        />
        <div className="imageViewerBlockConcepts">
          <p>{image.name}</p>
          <table>
            <tbody>
              {conceptRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

ImageViewer.propTypes = {
  isTagger: PropTypes.bool,
  image: PropTypes.shape({
    name: PropTypes.string,
    concepts: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
    })),
  }),
  onClose: PropTypes.func,
};

ImageViewer.defaultProps = {
  isTagger: true,
  image: {},
  onClose: () => {},
};

export default ImageViewer;
