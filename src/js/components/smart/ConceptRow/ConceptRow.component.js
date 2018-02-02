import React from 'react';
import PropTypes from 'prop-types';

require('./ConceptRow.styl');

const ConceptRow = (props) => {
  const { concept } = props;
  return (
    <tr>
      <td>
        {concept.name}
      </td>
      <td>
        {concept.value}
      </td>
    </tr>
  );
};

ConceptRow.propTypes = {
  concept: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }),
};

ConceptRow.defaultProps = {
  concept: {
    name: '',
    value: 0,
  },
};

export default ConceptRow;
