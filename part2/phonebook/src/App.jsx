import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from '../services/persons';
import Message from './components/Message';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState({ content: '', type: '' });
  const { getAll, create, deletePerson, update } = personsService;

  useEffect(() => {
    getAll().then((persons) => setPersons(persons));
  }, [getAll]);

  const filteredPersons =
    persons &&
    persons.filter((person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const personToUpdate = persons.find(
      (person) => person.name === newPerson.name
    );

    if (personToUpdate) {
      const updatePersonNumber = confirm(
        `${newPerson.name} is already to phonebook, replace the old number with a new one?`
      );

      updatePersonNumber &&
        update(personToUpdate.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            setNewName('');
            setNewNumber('');
            const newMessage = {
              content: `Updated number of ${updatedPerson.name}`,
              type: 'ok',
            };
            setMessage(newMessage);
            setTimeout(() => {
              setMessage('');
            }, 3000);
          })
          .catch((error) => {
            if (error.response.status === 404) {
              const newMessage = {
                content: `Information of ${personToUpdate.name} has already been removed from server`,
                type: 'bad',
              };
              setMessage(newMessage);
              setPersons(
                persons.filter((person) => person.name !== personToUpdate.name)
              );
              setTimeout(() => {
                setMessage('');
              }, 3000);
            } else {
              console.error('Unexpected error:', error.message);
            }
          });
    } else {
      create(newPerson).then((person) => {
        setPersons([...persons, person]);
        setNewName('');
        setNewNumber('');
        const newMessage = {
          content: `Added ${person.name}`,
          type: 'ok',
        };
        setMessage(newMessage);
        setTimeout(() => {
          setMessage('');
        }, 3000);
      });
    }
  };

  const handleDelete = (id, name) => {
    const areYouSure = confirm(`Delete ${name} ?`);
    const newPersons =
      areYouSure && persons.filter((person) => person.id !== id);
    areYouSure && setPersons(newPersons);
    areYouSure && deletePerson(id);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <Filter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
