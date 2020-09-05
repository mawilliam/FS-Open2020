import React, { useState } from 'react';

const App = () => {
  // *** state variable and update functions *** 
  // to track a list of people in the phonebook
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  
  // used to control the first form input element
  const [ newName, setNewName ] = useState('');

  // used to control the second form input element
  const [ newNumber, setNewNumber ] = useState('');

  // handle the form submission
  const addPerson = (event) => {
    event.preventDefault();

    // Check if the person is already added
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    };

    const personObject = {
      name: newName,
      number: newNumber
    };

    // concat returns a new object so we are not mutating the state variable
    setPersons(persons.concat(personObject));
    setNewName(''); // clear the input after submission
    setNewNumber('');
  };

  // handle the user typing in the input element
  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value); // updates the value of the input
  };

  // handle the user typing in the second input element
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handlePersonChange} />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  );
};

export default App;
