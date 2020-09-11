import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Persons';
import Notification from './components/Notification';

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

  // used to control the error message
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorType, setErrorType] = useState(null);

  // fetch initial data from the server
  useEffect(() => {
    console.log('effect');
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled');
        setPersons(initialPersons);
        setFilteredPersons(initialPersons);
      })
  }, []); // empty array parameter: only use effect on first render

  // handle the form submission
  const updatePerson = (duplicate) => {
    // confirm update
    const result = window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)
    if (result) {
      const changedPerson = {...duplicate, number: newNumber};
      personService
        .updateContact(duplicate.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== duplicate.id ? person : returnedPerson));
          setNewName('');
          setNewNumber('');
          setFilteredPersons(filteredPersons.map(person => person.id !== duplicate.id ? person : returnedPerson));
          setErrorType('message');
          setErrorMessage(
            `${returnedPerson.name} was updated`
          );
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000); // leave the message for at least 3 seconds
        })
        .catch(error => {
          setFilteredPersons(filteredPersons.filter(p => p.id !== duplicate.id))
          setErrorType('error');
          setErrorMessage(
            `${duplicate.name} was already removed from the server`
          );
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000); // leave the message for at least 3 seconds
        });
    };
  };
  const addPerson = (event) => {
    event.preventDefault();

    // Check if the person is already added, undefined if not
    const duplicate = persons.find(person => person.name === newName)
    if (duplicate !== undefined) {
      updatePerson(duplicate);
      return;
    };

    const personObject = {
      name: newName,
      number: newNumber
    };

    // concat returns a new object so we are not mutating the state variable
    personService
      .createContact(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        // check if we need to update the list of numbers
        if (filterText === '' || returnedPerson.name.toLowerCase().includes(filterText.toLowerCase())) {
          setFilteredPersons(filteredPersons.concat(returnedPerson))
        }
        setErrorType('message');
        setErrorMessage(
          `${returnedPerson.name} was added to the phonebook`
        );
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000); // leave the message for at least 3 seconds
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  // handle the user typing in the name input element
  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value); // updates the value of the input
  };

  // handle the user typing in the number input element
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

  // handle deleting a contact
  const deletePersonOf = (personID) => {
    // confirm deletion
    const toDelete = persons.find(p => p.id === personID);
    const result = window.confirm(`Delete ${toDelete.name}?`);

    if (!result) {
      return;
    };

    personService
      .deleteContact(personID)
      .then(() => {
        console.log('deleted');
        setPersons(persons.filter(person => person.id !== personID));
        setFilteredPersons(filteredPersons.filter(person => person.id !== personID));
        setErrorType('message');
        setErrorMessage(
          `${toDelete.name} was removed from the phonebook`
        );
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000); // leave the message for at least 3 seconds
      })
      .catch(error => {
        setErrorType('error');
        setErrorMessage(
          `${toDelete.name} was already removed from the server`
        );
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000); // leave the message for at least 3 seconds

      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={errorType} />
      
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
      <table>
        <tbody>
          {filteredPersons.map((person, i) => 
            <Person 
              key={i}
              person={person}
              handleDelete={() => deletePersonOf(person.id)}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
