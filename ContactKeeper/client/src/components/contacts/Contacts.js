import React, { useContext, useEffect } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';
import AuthContext from '../../context/auth/authContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const { contacts, filtered, getContacts, loading } = contactContext;
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please adding some contact..</h4>;
  }

  return (
    <React.Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(contact => (
                <CSSTransition
                  classNames="item"
                  key={contact._id}
                  timeout={500}
                >
                  <ContactItem key={contact._id} contact={contact} />
                </CSSTransition>
              ))
            : contacts.map(contact => (
                <CSSTransition
                  classNames="item"
                  key={contact._id}
                  timeout={500}
                >
                  <ContactItem key={contact._id} contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

export default Contacts;
