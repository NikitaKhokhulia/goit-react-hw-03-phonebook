import React, { Component } from 'react';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import { Container, Title } from './App.styled';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formFilter = filter => {
    this.setState({ filter });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  formSubmitHandler = data => {
    const contains = this.state.contacts.some(({ name }) => {
      return name.toLowerCase() === data.name.toLowerCase();
    });
    if (contains) {
      return alert(`${data.name} is already exist!`);
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, data],
      };
    });
  };

  onDeleteContacts = contactsId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactsId),
    }));
    console.log(contactsId);
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contact) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const {
      filteredContacts,
      formFilter,
      formSubmitHandler,
      onDeleteContacts,
    } = this;

    return (
      <>
        <Container>
          <Title>Phonebook</Title>

          <ContactsForm onSubmit={formSubmitHandler} />
        </Container>
        <Container>
          <Title>Contacts</Title>

          <h3>Find contacts by name</h3>
          <Filter filter={filter} formFilter={formFilter} />
          <ContactList
            contacts={filteredContacts()}
            onDeleteContacts={onDeleteContacts}
          />
        </Container>
      </>
    );
  }
}
