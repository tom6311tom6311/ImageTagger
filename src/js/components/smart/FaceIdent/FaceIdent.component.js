import React from 'react';
import NameInput from '../NameInput/NameInput.component';
import ImageSelector from '../ImageSelector/ImageSelector.component';
import CategorizedImageList from '../CategorizedImageList/CategorizedImageList.component';
import FaceImageViewer from '../FaceImageViewer/FaceImageViewer.component';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay.component';
import Toast from '../Toast/Toast.component';
import FetchUtil from '../../../util/Fetch.util';
import AppConstants from '../../../constant/App.constant';

require('./FaceIdent.styl');

class FaceIdent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currImageFile: '',
      currImageBase64Url: '',
      imageCatagoryArr: [],
      currViewingImageId: -1,
      currViewingImageSubId: -1,
      name: '',
      toastMessage: '',
      isLoading: false,
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onImageSubmit = this.onImageSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onViewImageDetail = this.onViewImageDetail.bind(this);
    this.onClosePreviewer = this.onClosePreviewer.bind(this);
    this.onConnectionTimeout = this.onConnectionTimeout.bind(this);
    this.toggleLoadingOverlay = this.toggleLoadingOverlay.bind(this);
    this.showUploadResults = this.showUploadResults.bind(this);
  }

  componentDidMount() {
    FetchUtil.getImageArr(false, (imageCatagoryArr) => {
      this.setState({
        imageCatagoryArr,
      });
    });
  }

  onImageSubmit(e) {
    e.preventDefault();
    if (typeof this.state.currImageFile.name === 'undefined') {
      return;
    }
    if (this.state.name === '') {
      return;
    }
    this.toggleLoadingOverlay(true);
    FetchUtil.uploadImage(
      false,
      this.state.currImageFile.name,
      this.state.currImageBase64Url,
      (resJson) => {
        this.showUploadResults(resJson);
        FetchUtil.getImageArr(false, (imageCatagoryArr) => {
          this.setState({
            imageCatagoryArr,
          });
          // this.onViewImageDetail(null, imageArr.length - 1);
          this.toggleLoadingOverlay(false);
        });
      },
      this.state.name,
    );
    setTimeout(() => {
      if (this.state.isLoading) {
        this.toggleLoadingOverlay(false);
        this.onConnectionTimeout();
      }
    }, AppConstants.MAX_LOADING_TIME);
  }

  onNameChange(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value,
    });
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

  onViewImageDetail(e, id, subId) {
    if (e !== null) {
      e.preventDefault();
    }
    this.setState({
      currViewingImageId: id,
      currViewingImageSubId: subId,
    });
  }

  onClosePreviewer(e) {
    e.preventDefault();
    this.setState({
      currViewingImageId: -1,
      currViewingImageSubId: -1,
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

  showUploadResults(result) {
    let toastMessage = '';
    switch (result.result) {
      case 'new':
        toastMessage = '初次見面您好，感謝上傳！';
        break;
      case 'right':
        toastMessage = '感謝上傳！';
        break;
      case 'wrong':
        toastMessage = `不對喔，你應該是${result.rightName}，我有${Math.round(result.confidence * 100)}%的把握`;
        break;
      case 'noOne':
        toastMessage = '抱歉，在這張照片裡找不到人像';
        break;
      case 'unknown':
        toastMessage = `你是誰？為什麼要仿冒${result.imitate}？`;
        break;
      default:
        toastMessage = '伺服器出了點狀況...';
        break;
    }
    this.setState({
      toastMessage,
    });
    setTimeout(() => {
      this.setState({
        toastMessage: '',
      });
    }, AppConstants.TOAST_DURATION);
  }

  render() {
    const {
      currImageBase64Url,
      imageCatagoryArr,
      currViewingImageId,
      currViewingImageSubId,
      isLoading,
      toastMessage,
    } = this.state;

    return (
      <div>
        <NameInput
          onChange={this.onNameChange}
        />
        <ImageSelector
          onSubmit={this.onImageSubmit}
          onChange={this.onImageChange}
          previewUrl={currImageBase64Url}
        />
        <CategorizedImageList
          imageCatagoryArr={imageCatagoryArr}
          urlPrefix={AppConstants.SEVER_URL + AppConstants.SERVER_ROUTE.GET.IMAGES.FACE}
          onViewImageDetail={this.onViewImageDetail}
        />
        <FaceImageViewer
          imageCatagoryArr={imageCatagoryArr}
          currId={currViewingImageId}
          currSubId={currViewingImageSubId}
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

export default FaceIdent;
