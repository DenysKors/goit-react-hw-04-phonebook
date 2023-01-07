import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Wrapper } from 'components/App.styled';

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContactById = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const addFormContacts = formData => {
    const normalizedName = formData.name.toLowerCase();
    const findName = contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );

    if (findName) {
      return alert(`${formData.name} is already in contacts`);
    }

    formData.id = nanoid();
    setContacts(prevContacts => [formData, ...prevContacts]);
  };

  const sortByFilter = evt => {
    setFilter(evt.target.value);
  };

  const getFilteredContacts = () => {
    console.log('filter');
    const normalizedText = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedText)
    );
  };

  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={addFormContacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} onFilterChange={sortByFilter} />
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={deleteContactById}
      />
    </Wrapper>
  );
}
