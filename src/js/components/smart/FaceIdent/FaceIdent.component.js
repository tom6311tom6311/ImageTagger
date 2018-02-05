import React from 'react';
import ImageSelector from '../ImageSelector/ImageSelector.component';
import ImageList from '../ImageList/ImageList.component';
import ImageViewer from '../ImageViewer/ImageViewer.component';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay.component';
import FetchUtil from '../../../util/Fetch.util';
import AppConstants from '../../../constant/App.constant';

require('./FaceIdent.styl');

class FaceIdent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currImageFile: '',
      currImageBase64Url: '',
      imageArr: [],
      currViewingImageId: -1,
    };
    this.onImageSubmit = this.onImageSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onViewImageDetail = this.onViewImageDetail.bind(this);
    this.onClosePreviewer = this.onClosePreviewer.bind(this);
    this.toggleLoadingOverlay = this.toggleLoadingOverlay.bind(this);
  }

  componentDidMount() {
    FetchUtil.getImageArr(false, (imageArr) => {
      this.setState({
        imageArr,
      });
    });
  }

  onImageSubmit(e) {
    e.preventDefault();
    if (typeof this.state.currImageFile.name === 'undefined') {
      return;
    }
    this.toggleLoadingOverlay(true);
    FetchUtil.uploadImage(
      false,
      this.state.currImageFile.name,
      this.state.currImageBase64Url,
      () => {
        FetchUtil.getImageArr(false, (imageArr) => {
          this.setState({
            imageArr,
          });
        });
      },
    );
  }

  onImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const currImageFile = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        currImageFile,
        currImageBase64Url: reader.result,
      });
    };

    reader.readAsDataURL(currImageFile);
  }

  onViewImageDetail(e, id) {
    e.preventDefault();
    this.setState({
      currViewingImageId: id,
    });
  }

  onClosePreviewer(e) {
    e.preventDefault();
    this.setState({
      currViewingImageId: -1,
    });
  }

  toggleLoadingOverlay(isLoading) {
    this.setState({
      isLoading,
    });
  }

  render() {
    const {
      currImageBase64Url,
      imageArr,
      currViewingImageId,
      isLoading,
    } = this.state;

    return (
      <div>
        <ImageSelector
          onSubmit={this.onImageSubmit}
          onChange={this.onImageChange}
          previewUrl={currImageBase64Url}
        />
        <ImageList
          imageArr={imageArr}
          urlPrefix={AppConstants.SEVER_URL + AppConstants.SERVER_ROUTE.GET.IMAGES.FACE}
          onViewImageDetail={this.onViewImageDetail}
        />
        <ImageViewer
          image={imageArr[currViewingImageId]}
          onClose={this.onClosePreviewer}
        />
        <LoadingOverlay
          isLoading={isLoading}
          loadingText={AppConstants.TEXT_UPLOADING}
        />
      </div>
    );
  }
}

export default FaceIdent;
