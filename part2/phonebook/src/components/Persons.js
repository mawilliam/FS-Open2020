import React from 'react';
import PropTypes from 'prop-types';

// Display the contents of the phonebook
// Format: Name number
const Person = ({ person, handleDelete }) => (
  <tr>
    <td>
      {person.name}
    </td>
    <td>
      {person.number}
    </td>
    <td>
      <button type="button" onClick={handleDelete}>delete</button>
    </td>
  </tr>
);

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.string,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Person;
