import React, { useState } from 'react';
import { addReceiver } from '../../services/CallReceiverService';


interface NewTelephoneNumberFormProps {
  onSuccess: () => void;
}

const NewTelephoneNumberForm: React.FC<NewTelephoneNumberFormProps> = ({ onSuccess }) => {
  const [newTelephoneNumber, setNewTelephoneNumber] = useState<string>('');

  const handleNewTelephoneNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTelephoneNumber(e.target.value);
  };

  const handleAddNewTelephoneNumber = async () => {
    try {
      await addReceiver(newTelephoneNumber, 'yodalpinky1'); // Assuming 'yodalpinky1' is some identifier
      onSuccess(); // Notify the parent component of success
      setNewTelephoneNumber(''); // Clear the input field
    } catch (error) {
      console.error('Error adding new telephone number:', error);
    }
  };

  return (
    <div className='input-group'>
      <input
        className='form-control'
        type='text'
        placeholder='Enter new call receiver phone number'
        value={newTelephoneNumber}
        onChange={handleNewTelephoneNumberInputChange}
      />
      <button className='btn btn-success' type='button' onClick={handleAddNewTelephoneNumber}>
        Add
      </button>
    </div>
  );
};

export default NewTelephoneNumberForm;

/*
const NewTelephoneNumberForm = ({ onSuccess }) => {
  const [newTelephoneNumber, setNewTelephoneNumber] = useState('');

  const handleNewTelephoneNumberInputChange = (e) => {
    setNewTelephoneNumber(e.target.value);
  };

  const handleAddNewTelephoneNumber = async () => {
    try {
      await addReceiver(newTelephoneNumber, 'yodalpinky1');
      onSuccess(); // Notify the parent component of success
      setNewTelephoneNumber(''); // Clear the input field
    } catch (error) {
      console.error('Error adding new telephone number:', error);
    }
  };

  return (
    <div className='input-group'>
      <input
        className='form-control'
        type='text'
        placeholder='Enter new call receiver phone number'
        value={newTelephoneNumber}
        onChange={handleNewTelephoneNumberInputChange}
      />
      <button className='btn btn-success' type='button' onClick={handleAddNewTelephoneNumber}>
        Add
      </button>
    </div>
  );
};

export default NewTelephoneNumberForm;

*/

/*
const NewTelephoneNumberForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [telephoneNumbers, setTelephoneNumbers] = useState([]);

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // First, add the new receiver
      await addReceiver(phoneNumber, 'yodalpinky1'); // Replace 'yodalpinky1' with the actual username
      // Then fetch the telephone numbers
      const response = await getTelephoneNumbers('yodalpinky1'); // Replace 'yodalpinky1' with the actual username
      setTelephoneNumbers(response.data); // Assuming the response contains the telephone numbers
    } catch (error) {
      console.error('Error fetching telephone numbers:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter phone number for the call:
          <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
        </label>
        <button type="submit">Fetch Telephone Numbers</button>
      </form>
      {telephoneNumbers.length > 0 && (
        <div>
          {/* Display fetched telephone numbers here */
          /*
          <ul>
            {telephoneNumbers.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NewTelephoneNumberForm;
*/
/*
const NewTelephoneNumberForm = ({ onSuccess }) => {
  const [newTelephoneNumber, setNewTelephoneNumber] = useState('');

  const handleNewTelephoneNumberInputChange = (e) => {
    setNewTelephoneNumber(e.target.value);
  };

  const handleAddNewTelephoneNumber = async () => {
    if (newTelephoneNumber.trim() !== '') {
      try {
        await addReceiver(newTelephoneNumber, 'yodalpinky1'); // Assuming 'yodalpinky1' is the username
        onSuccess(newTelephoneNumber); // Notify the parent component of success with the new number
        setNewTelephoneNumber(''); // Clear the input field
      } catch (error) {
        console.error('Error adding new telephone number:', error);
        // Handle error
      }
    } else {
      // Notify user that the input cannot be empty
    }
  };

  return (
    <div className='input-group'>
      <input
        className='form-control'
        type='text'
        placeholder='Enter new call receiver phone number'
        value={newTelephoneNumber}
        onChange={handleNewTelephoneNumberInputChange}
      />
      <button className='btn btn-success' type='button' onClick={handleAddNewTelephoneNumber}>
        Add
      </button>
    </div>
  );
};

export default NewTelephoneNumberForm;


/*
const NewTelephoneNumberForm = ({ onSuccess }) => {
  const [newTelephoneNumber, setNewTelephoneNumber] = useState('');

  const handleNewTelephoneNumberInputChange = (e) => {
    setNewTelephoneNumber(e.target.value);
  };

  const handleAddNewTelephoneNumber = async () => {
    if (newTelephoneNumber.trim() !== '') {
      try {
        await addReceiver(newTelephoneNumber, 'yodalpinky1'); // Assuming 'yodalpinky1' is the username
        onSuccess(newTelephoneNumber); // Notify the parent component of success with the new number
        setNewTelephoneNumber(''); // Clear the input field
      } catch (error) {
        console.error('Error adding new telephone number:', error);
        // Handle error
      }
    } else {
      // Notify user that the input cannot be empty
    }
  };

  return (
    <div className='input-group'>
      <input
        className='form-control'
        type='text'
        placeholder='Enter new call receiver phone number'
        value={newTelephoneNumber}
        onChange={handleNewTelephoneNumberInputChange}
      />
      <button className='btn btn-success' type='button' onClick={handleAddNewTelephoneNumber}>
        Add
      </button>
    </div>
  );
};

export default NewTelephoneNumberForm;

/*

const NewTelephoneNumberForm = ({ onSuccess }) => {
  const [newTelephoneNumber, setNewTelephoneNumber] = useState('');

  const handleNewTelephoneNumberInputChange = (e) => {
    setNewTelephoneNumber(e.target.value);
  };

  const handleAddNewTelephoneNumber = async () => {
    if (newTelephoneNumber.trim() !== '') {
      try {
        await addReceiver(newTelephoneNumber, 'yodalpinky1'); // Assuming 'yodalpinky1' is the username
        onSuccess(); // Notify the parent component of success
        setNewTelephoneNumber(''); // Clear the input field
      } catch (error) {
        console.error('Error adding new telephone number:', error);
        // Handle error
      }
    } else {
      // Notify user that the input cannot be empty
    }
  };

  return (
    <div className='input-group'>
      <input
        className='form-control'
        type='text'
        placeholder='Enter new call receiver phone number'
        value={newTelephoneNumber}
        onChange={handleNewTelephoneNumberInputChange}
      />
      <button className='btn btn-success' type='button' onClick={handleAddNewTelephoneNumber}>
        Add
      </button>
    </div>
  );
};

export default NewTelephoneNumberForm;

*/