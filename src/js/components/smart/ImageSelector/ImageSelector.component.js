import React from 'react';
import PropTypes from 'prop-types';

require('./ImageSelector.styl');

const ImageSelector = (props) => {
  const { onSubmit, onChange, previewUrl } = props;
  let $imagePreview = null;
  if (previewUrl) {
    $imagePreview = (<img src={previewUrl} alt="Nothing" />);
  } else {
    $imagePreview = (
      <div className="imageSelectorPreviewerText">
        Please select an Image for Preview
      </div>
    );
  }

  return (
    <div className="imageSelector">
      <form onSubmit={e => onSubmit && onSubmit(e)} >
        <input
          className="imageSelectorFileInput"
          name="image-file"
          accept="image/*"
          type="file"
          onChange={e => onChange && onChange(e)}
        />
        <button
          className="imageSelectorSubmitButton"
          type="submit"
          onClick={e => onSubmit && onSubmit(e)}
        >
          Upload Image
        </button>
      </form>
      <div className="imageSelectorPreviewer">
        {$imagePreview}
      </div>
    </div>
  );
};

ImageSelector.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  previewUrl: PropTypes.string,
};

ImageSelector.defaultProps = {
  onSubmit: () => {},
  onChange: () => {},
  previewUrl: '',
};

export default ImageSelector;
