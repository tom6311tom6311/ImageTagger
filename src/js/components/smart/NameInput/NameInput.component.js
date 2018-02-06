import React from 'react';
import PropTypes from 'prop-types';

require('./NameInput.styl');

const NameInput = (props) => {
  const { onChange } = props;

  return (
    <div className="nameInput">
      <form onSubmit={() => {}} >
        <input
          className="nameInputField"
          name="name"
          type="text"
          placeholder="請問您叫？"
          onChange={e => onChange && onChange(e)}
        />
      </form>
    </div>
  );
};

NameInput.propTypes = {
  onChange: PropTypes.func,
};

NameInput.defaultProps = {
  onChange: () => {},
};

export default NameInput;
