import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Wrapper } from 'components/App.styled';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  // state = {
  //   contacts: [],
  //   filter: '',
  // };

  useEffect(() => {
    const localContacts = localStorage.getItem('contacts');
    console.log(localContacts);
    const parseContacts = JSON.parse(localContacts);
    console.log(parseContacts);
    if (parseContacts) {
      setContacts(parseContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const deleteContactById = contactId => {
    // this.setState(prevState => ({
    //   contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    // }));
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
    setContacts(prevState => [formData, ...prevState]);
  };

  const sortByFilter = evt => {
    // this.setState({ filter: evt.target.value });
  };

  const getFilteredContacts = () => {
    // const { contacts, filter } = this.state;
    // const normalizedText = filter.toLowerCase();
    // return contacts.filter(contact =>
    //   contact.name.toLowerCase().includes(normalizedText)
    // );
  };

  // const filteredContacts = getFilteredContacts();

  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={addFormContacts} />
      <h2>Contacts</h2>
      {/* <Filter filter={filter} onFilterChange={sortByFilter} />
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={deleteContactById}
      /> */}
    </Wrapper>
  );
}
