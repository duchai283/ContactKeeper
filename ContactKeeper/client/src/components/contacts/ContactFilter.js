import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const { setFilter, clearFilter, filtered } = useContext(ContactContext);
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });
  const onChange = e => {
    e.preventDefault();
    if (text.current.value !== '') {
      setFilter(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Search Contact..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
