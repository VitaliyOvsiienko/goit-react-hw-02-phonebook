import { Component } from "react";
import { nanoid } from "nanoid";
import { Container, Title, SubTitle } from "./App.styled";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";


export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmitHandler = (newContact) => {
    const { contacts } = this.state;

    const isDuplicateName = contacts.some(contact => contact.name.toLowerCase() === newContact.name.toLowerCase());

    if (isDuplicateName) {
      return alert(`${newContact.name} is already in contacts`);
    }

    const newContactId = nanoid();

    const updatedContacts = [...contacts, { ...newContact, id: newContactId }];
    this.setState({
      contacts: updatedContacts
    });
  };

  onDeleteHandler = (id) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  onFilterContacts = () => {
    let filterContact = [];
    if (this.state.filter) {
      filterContact = this.state.contacts.filter((contact) =>
        contact.name.includes(this.state.filter) ||
        contact.name.toLowerCase().includes(this.state.filter)
      );
    } else {
      return this.state.contacts;
    }
    return filterContact;
  };

  render() {
    const { filter } = this.state;
    const filterContacts = this.onFilterContacts();

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.onSubmitHandler} />

        <SubTitle>Contacts</SubTitle>
        <Filter value={filter} onChange={this.onFilterContacts} />
        <ContactList contacts={filterContacts} onDeleteContact={this.onDeleteHandler} />
      </Container>
    );
  }
}
