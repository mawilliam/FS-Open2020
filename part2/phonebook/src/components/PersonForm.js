import React from 'react';
import PropTypes from 'prop-types';

const PersonForm = ({
  handleSubmit, handlePersonChange, handleNumberChange, newName, newNumber,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name:
      <input
        value={newName}
        onChange={handlePersonChange}
      />
    </div>
    <div>
      number:
      <input
        value={newNumber}
        onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

PersonForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handlePersonChange: PropTypes.func.isRequired,
  handleNumberChange: PropTypes.func.isRequired,
  newName: PropTypes.string.isRequired,
  newNumber: PropTypes.string.isRequired,
};

export default PersonForm;
