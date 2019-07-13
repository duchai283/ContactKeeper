import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import dateFns from 'date-fns';

const ContactItem = ({ contact }) => {
  const { deleteContact, setCurrent, clearCurrent } = useContext(
    ContactContext
  );

  const { _id, name, email, phone, type, date } = contact;
  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            ' badge ' +
            (type === 'personal' ? 'badge-primary' : 'badge-success')
          }
        >
          {type[0].toUpperCase() + type.slice(1)}
        </span>{' '}
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" />
            &nbsp; {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone" />
            &nbsp;{phone}
          </li>
        )}
      </ul>
      <div>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
        <p style={{ float: 'right' }}>
          {dateFns.format(date, 'DD/MM/YYYY-H:m-A')}
        </p>
      </div>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
