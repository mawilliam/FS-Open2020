import React from 'react';

const Persons = ( {filteredPersons} ) => {
    // Display the contents of the phonebook
    // Format: Name number
    return (
        <table>
            <tbody>
                {filteredPersons.map((person, i) =>
                    <tr key={i}>
                        <td>{person.name} </td>
                        <td>{person.number} </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
    
};

export default Persons;
