import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  // *** state variable and update functions *** 
  // to track a list of people in the phonebook
  const [ persons, setPersons ] = useState([]);
  
  // used to control the first form input element
  const [ newName, setNewName ] = useState('');

  // used to control the second form input element
  const [ newNumber, setNewNumber ] = useState('');

  // used to control the filter input element
  const [ filterText, setNewFilter ] = useState('');
  const [ filteredPersons, setFilteredPersons ] = useState([]);

  // fetch initial data from the server
  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfulled');
        setPersons(response.data);
        setFilteredPersons(response.data);
      })
  }, []); // empty array parameter: only use effect on first render

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
  };

  // handle the user typing in the filter input element
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    // filter the list of persons
    setNewFilter(event.target.value);
    const newPersons = event.target.value === '' 
      ? persons 
      : persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilteredPersons(newPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter
        filterText={filterText}
        handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm 
        handleSubmit={addPerson}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
