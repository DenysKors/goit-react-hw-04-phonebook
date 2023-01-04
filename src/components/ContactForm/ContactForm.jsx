import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Form,
  FormLabel,
  FormInput,
  FormButton,
} from 'components/ContactForm/ContactForm.styled';

export function ContactForm({ onSubmitForm }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputChange = evt => {
    const { value, name } = evt.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const submitForm = evt => {
    evt.preventDefault();
    onSubmitForm({ name, number });
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={submitForm}>
      <FormLabel>
        Name
        <FormInput
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={inputChange}
        />
      </FormLabel>
      <FormLabel>
        Number
        <FormInput
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={inputChange}
        />
      </FormLabel>
      <FormButton type="submit">Add to Contacts</FormButton>
    </Form>
  );
}

ContactForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
