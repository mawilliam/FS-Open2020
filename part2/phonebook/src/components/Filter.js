import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filterText, handleFilterChange }) => (
  <div>
    filter shown with
    <input
      value={filterText}
      onChange={handleFilterChange}
    />
  </div>
);

Filter.propTypes = {
  filterText: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default Filter;
