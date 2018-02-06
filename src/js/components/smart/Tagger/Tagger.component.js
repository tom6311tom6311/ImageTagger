import React from 'react';
import ImageSelector from '../ImageSelector/ImageSelector.component';
import ImageList from '../ImageList/ImageList.component';
import ImageViewer from '../ImageViewer/ImageViewer.component';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay.component';
import Toast from '../Toast/Toast.component';
import FetchUtil from '../../../util/Fetch.util';
import AppConstants from '../../../constant/App.constant';

require('./Tagger.styl');

class Tagger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currImageFile: '',
      currImageBase64Url: '',
      imageArr: [],
      currViewingImageId: -1,
      toastMessage: '',
    };
    this.onImageSubmit = this.onImageSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onViewImageDetail = this.onViewImageDetail.bind(this);
    this.onClosePreviewer = this.onClosePreviewer.bind(this);
    this.onConnectionTimeout = this.onConnectionTimeout.bind(this);
    this.toggleLoadingOverlay = this.toggleLoadingOverlay.bind(this);
  }

  componentDidMount() {
    FetchUtil.getImageArr(true, (imageArr) => {
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
      true,
      this.state.currImageFile.name,
      this.state.currImageBase64Url,
      () => {
        FetchUtil.getImageArr(true, (imageArr) => {
          this.setState({
            imageArr,
          });
          this.onViewImageDetail(null, imageArr.length - 1);
          this.toggleLoadingOverlay(false);
        });
      },
    );
    setTimeout(() => {
      if (this.state.isLoading) {
        this.toggleLoadingOverlay(false);
        this.onConnectionTimeout();
      }
    }, AppConstants.MAX_LOADING_TIME);
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
    if (e !== null) {
      e.preventDefault();
    }
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

  onConnectionTimeout() {
    this.setState({
      toastMessage: '伺服器出了點狀況...',
    });
    setTimeout(() => {
      this.setState({
        toastMessage: '',
      });
    }, AppConstants.TOAST_DURATION);
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
      toastMessage,
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
          urlPrefix={AppConstants.SEVER_URL + AppConstants.SERVER_ROUTE.GET.IMAGES.TAGGER}
          onViewImageDetail={this.onViewImageDetail}
        />
        <ImageViewer
          isTagger
          image={imageArr[currViewingImageId]}
          onClose={this.onClosePreviewer}
        />
        <LoadingOverlay
          isLoading={isLoading}
          loadingText={AppConstants.TEXT_UPLOADING}
        />
        <Toast
          message={toastMessage}
        />
      </div>
    );
  }
}

export default Tagger;
