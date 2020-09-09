import React from 'react';

const Person = ( {person, handleDelete} ) => {
    // Display the contents of the phonebook
    // Format: Name number
    return (
        <tr>
            <td>{person.name} </td>
            <td>{person.number} </td>
            <td>
                <button onClick={handleDelete} >delete</button>
            </td>
        </tr>
    )
    
};

export default Person;
