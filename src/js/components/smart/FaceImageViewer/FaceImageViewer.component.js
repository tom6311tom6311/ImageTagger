import React from 'react';
import PropTypes from 'prop-types';
import AppConstants from '../../../constant/App.constant';
import ConceptRow from '../ConceptRow/ConceptRow.component';

require('./FaceImageViewer.styl');

const FaceImageViewer = (props) => {
  const {
    imageCatagoryArr,
    currId,
    currSubId,
    onClose,
  } = props;

  if (typeof imageCatagoryArr === 'undefined' ||
    currId === -1 ||
    currSubId === -1
  ) {
    return (
      <div className="faceIimageViewer faceImageViewerClose" />
    );
  }

  const grabConcepts = info => ([
    {
      id: 0,
      name: 'gender',
      value: info.faceAttributes.gender,
    },
    {
      id: 1,
      name: 'age',
      value: info.faceAttributes.age,
    },
    {
      id: 2,
      name: 'smile',
      value: info.faceAttributes.smile,
    },
    {
      id: 3,
      name: 'glasses',
      value: info.faceAttributes.glasses,
    },
    {
      id: 4,
      name: 'bald',
      value: info.faceAttributes.hair.bald,
    },
  ]);


  const image = {
    name: imageCatagoryArr[currId].fileNames[currSubId],
    concepts: grabConcepts(imageCatagoryArr[currId].identResults[currSubId]),
  };

  const conceptRows = image.concepts && image.concepts.map(concept =>
    <ConceptRow key={concept.id} concept={concept} />);

  return (
    <div className="faceImageViewer faceImageViewerOpen">
      <button
        className="faceImageViewerCloseButton"
        onClick={e => onClose && onClose(e)}
      >
        &times;
      </button>
      <div className="faceImageViewerBlock">
        <img
          className="faceImageViewerBlockImage"
          src={AppConstants.SEVER_URL + AppConstants.SERVER_ROUTE.GET.IMAGES.FACE + image.name}
          alt="Nothing"
        />
        <div className="faceImageViewerBlockConcepts">
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

FaceImageViewer.propTypes = {
  imageCatagoryArr: PropTypes.arrayOf(PropTypes.object),
  currId: PropTypes.number,
  currSubId: PropTypes.number,
  onClose: PropTypes.func,
};

FaceImageViewer.defaultProps = {
  imageCatagoryArr: [],
  currId: -1,
  currSubId: -1,
  onClose: () => {},
};

export default FaceImageViewer;
