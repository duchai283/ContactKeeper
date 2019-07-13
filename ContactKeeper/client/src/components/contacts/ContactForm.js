import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
 
const ContactForm = () => {
  const { addContact, current, clearCurrent, updateContact } = useContext(
    ContactContext
  );
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [addContact, current]);

  const { name, email, phone, type } = contact;

  const onChange = ({ target }) =>
    setContact({ ...contact, [target.name]: target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
      // clearCurrent();
    }
    onClear();
  };
  const onClear = () => {
    clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? 'Update Contact' : 'Add Contact'}
      </h2>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="phone"
        value={phone}
        onChange={onChange}
        placeholder="Phone"
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        onChange={onChange}
        id="per"
        checked={type === 'personal'}
      />{' '}
      <label htmlFor="per" className="label-radio">
        Personal
      </label>
      <input
        type="radio"
        name="type"
        id="pro"
        value="professional"
        onChange={onChange}
        checked={type === 'professional'}
      />{' '}
      <label htmlFor="pro" className="label-radio">
        Professional
      </label>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={onClear}>
            Clear Contact
          </button>
        </div>
      )}
      <div>
        <input
          type="submit"
          value={current ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ContactForm;
