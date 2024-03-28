import React, { useEffect } from 'react'
import { useState } from 'react'
import { getTelephoneNumbers } from '../../services/CallReceiverService'
import { getUsername } from '../../services/UserService'; // Import loginUser and isLoggedIn from UserService
import NewTelephoneNumberForm from '../calls/NewTelephoneNumberForm';

interface CallReceiverSelectorProps {
    handleTelephoneNumberInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    newCall: {
        telephone: string;
    };
}

const CallReceiverSelector: React.FC<CallReceiverSelectorProps> = ({ handleTelephoneNumberInputChange, newCall }) => {
    const [telephoneNumbers, setTelephoneNumbers] = useState<string[]>([]);
    const [showNewTelephoneNumberForm, setShowNewTelephoneNumberForm] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTelephoneNumbers('yodalpinky1'); // Assuming 'yodalpinky1' is some identifier
                setTelephoneNumbers(response);
            } catch (error) {
                console.error('Error fetching phone numbers:', error);
            }
        };
        fetchData();
    }, [showNewTelephoneNumberForm]);

    const handleAddNewTelephoneNumber = async () => {
        setShowNewTelephoneNumberForm(false); // Hide the form after adding the number
    };

    return (
        <div>
            <select
                id='telephone'
                name='telephone'
                value={newCall.telephone}
                onChange={handleTelephoneNumberInputChange}>
                <option value=''>Select a call receiver phone number</option>
                {telephoneNumbers.map((telephone, index) => (
                    <option key={index} value={telephone}>
                        {telephone}
                    </option>
                ))}
            </select>
            {showNewTelephoneNumberForm ? (
                <NewTelephoneNumberForm onSuccess={handleAddNewTelephoneNumber} />
            ) : (
                <button className='btn btn-success' onClick={() => setShowNewTelephoneNumberForm(true)}>Add New Telephone Number</button>
            )}
        </div>
    );
};

export default CallReceiverSelector;
/*
interface CallReceiverSelectorProps {
    handleTelephoneNumberInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    newCall: {
        telephone: string;
    };
}

const CallReceiverSelector: React.FC<CallReceiverSelectorProps> = ({ handleTelephoneNumberInputChange, newCall }) => {
    const [telephoneNumbers, setTelephoneNumbers] = useState<string[]>([]);
    const [showNewTelephoneNumberForm, setShowNewTelephoneNumberForm] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTelephoneNumbers('yodalpinky1'); // Assuming 'yodalpinky1' is some identifier
                setTelephoneNumbers(response);
            } catch (error) {
                console.error('Error fetching phone numbers:', error);
            }
        };
        fetchData();
    }, [showNewTelephoneNumberForm]);

    const handleAddNewTelephoneNumber = async () => {
        setShowNewTelephoneNumberForm(false); // Hide the form after adding the number
    };

    return (
        <div>
            <select
                id='telephone'
                name='telephone'
                value={newCall.telephone}
                onChange={handleTelephoneNumberInputChange}>
                <option value=''>Select a call receiver phone number</option>
                {telephoneNumbers.map((telephone, index) => (
                    <option key={index} value={telephone}>
                        {telephone}
                    </option>
                ))}
            </select>
            {showNewTelephoneNumberForm ? (
                <NewTelephoneNumberForm onSuccess={handleAddNewTelephoneNumber} />
            ) : (
                <button className='btn btn-success' onClick={() => setShowNewTelephoneNumberForm(true)}>Add New Telephone Number</button>
            )}
        </div>
    );
};

export default CallReceiverSelector;

*/

/*
const CallReceiverSelector = ({ handleTelephoneNumberInputChange, newCall }) => {
  const [telephoneNumbers, setTelephoneNumbers] = useState([]);
  const [showNewTelephoneNumberForm, setShowNewTelephoneNumberForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTelephoneNumbers('yodalpinky1');
        setTelephoneNumbers(response);
      } catch (error) {
        console.error('Error fetching phone numbers:', error);
      }
    };
    fetchData();
  }, [showNewTelephoneNumberForm]);

  const handleAddNewTelephoneNumber = async () => {
    setShowNewTelephoneNumberForm(false); // Hide the form after adding the number
  };

  return (
    <div>
      <select
        id='telephone'
        name='telephone'
        value={newCall.telephone}
        onChange={handleTelephoneNumberInputChange}>
        <option value=''>Select a call receiver phone number</option>
        {telephoneNumbers.map((telephone, index) => (
          <option key={index} value={telephone}>
            {telephone}
          </option>
        ))}
      </select>
      {showNewTelephoneNumberForm ? (
        <NewTelephoneNumberForm onSuccess={handleAddNewTelephoneNumber} />
      ) : (
        <button className='btn btn-success' onClick={() => setShowNewTelephoneNumberForm(true)}>Add New Telephone Number</button>
      )}
    </div>
  );
};

export default CallReceiverSelector;


*/





/*
const CallReceiverSelector = ({ handleTelephoneNumberInputChange, newCall}) => {
    const [telephoneNumbers, setTelephoneNumbers] = useState([""])
    const [showTelephoneNumberInput, setShowTelephoneNumberInput] = useState(true)
    const [newTelephoneNumber, setNewTelephoneNumber] = useState("")
    const [selectedTelephoneNumber, setSelectedTelephoneNumber] = useState('');
    const [showNewTelephoneNumberForm, setShowNewTelephoneNumberForm] = useState(false);
    const [username, setUsername] = useState("")

    
     const handleAddNewTelephoneNumber = async (newTelephoneNumber) => {
        setUsername("yodalpinky1"); // Set username
        try {
            const success = await addReceiver(newTelephoneNumber, username);
            if (success) {
                console.log("Successfully added a call receiver:", newTelephoneNumber);
                setTelephoneNumbers([...telephoneNumbers, newTelephoneNumber]);
                setShowNewTelephoneNumberForm(false); // Hide the form after adding the number
            } else {
                console.error('Error adding new phone number');
            }
        } catch (error) {
            console.error('Error adding new phone number:', error);
        }
    };

useEffect(() => {
    const fetchData = async () => { // Define fetchData as an async arrow function
        try {
            const response = await getTelephoneNumbers('yodalpinky1');
            setTelephoneNumbers(response);
            console.log("telephone numbers ", response.data);
        } catch (error) {
            console.error("Error fetching phone numbers:", error);
        }
    };

    fetchData(); // Call fetchData when the component mounts

    // Refetch data when showNewTelephoneNumberForm changes
    if (showNewTelephoneNumberForm) {
        fetchData();
    }
}, [showNewTelephoneNumberForm]); // Dependency array includes showNewTelephoneNumberForm

    /*
    useEffect(() => {
    // Fetch data when showNewTelephoneNumberForm changes
    if (showNewTelephoneNumberForm) {
        fetchData();
    }
}, [showNewTelephoneNumberForm]); // Dependency array includes showNewTelephoneNumberForm

*/

  //  const handleNewTelephoneNumberInputChange = (e) => {
       // setNewTelephoneNumber(e.target.value);
   // }

    /*
   const handleTelphoneNumberChange = (selectedValue) => {
        setSelectedTelephoneNumber(selectedValue);
        //handleTelephoneNumberInputChange({ target: { name: 'telephone', value: selectedValue } });
    };*/
    
    /*
    const handleAddNewTelephoneNumbera = async () => {

        //const username = await getUsername(); // Fetch the username after successful login
       // console.log('Username after login:', username);
        setUsername("yodalpinky1")
         if (newTelephoneNumber !== "") {
            try {
                const success = await addReceiver(newTelephoneNumber, username);
              
                if (success) {
                    console.log( "successfully added a Call Receiver " + success)
                    setTelephoneNumbers([...telephoneNumbers, newTelephoneNumber]);
                    setNewTelephoneNumber("");
                    setShowTelephoneNumberInput(false);
                } else {
                    // Handle unsuccessful response
                    console.error('Error adding new phone number');
                }
            } catch (error) {
                // Handle error
                console.error('Error adding new phone number:', error);
            }
    }
        
        /*
        if (newPhoneNumber !== "") {
            setPhoneNumbers([...phoneNumbers, newPhoneNumber])
            setNewPhoneNumber("")
            setShowPhoneNumberInput(false)
        }*/
    //}
    /*

    return (

        <div>
            <select
                id="telephone"
                name="telephone"
                value={newCall.telephone}
                onChange={handleTelephoneNumberInputChange}>
                <option value={""}>Select a call receiver phone number</option>
                {telephoneNumbers.map((telephone, index) => (
                    <option key={index} value={telephone}>
                        {telephone}
                    </option>
                ))}
            </select>
            {showNewTelephoneNumberForm && (
               // <NewTelephoneNumberForm onSubmit={handleAddNewTelephoneNumber} />
                <NewTelephoneNumberForm onSuccess={handleAddNewTelephoneNumber} />
            )}
            {!showNewTelephoneNumberForm && (
                <button onClick={() => setShowNewTelephoneNumberForm(true)}>
                    Add New Telephone Number
                </button>
            )}
        </div>


        */
        /*
        <>
            {telephoneNumbers.length > 0 && (
                <div>
                    <select
                        id="telephone"
                        name="telephone"
                        value={newCall.telephone}
                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowTelephoneNumberInput(true)
                            } else {
                               // handleTelphoneNumberChange(e.target.value); // Call the handleTelphoneNumberChange function here
                                ///handleNewTelephoneNumberInputChange(e)
                                handleTelephoneNumberInputChange(e)
                            }
                        }}>
                        
                        <option value={""}>Select a call receiver phone number</option>
                        <option value={"Add New"}>Add New</option>
                        {telephoneNumbers.map((telephone, index) => (
                            <option key={index} value={telephone}>
                                {telephone}
                            </option>
                        ))}
                    </select>
                    {showTelephoneNumberInput && (
                        <div className='input-group'>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Enter new call receiver phone number'
                                onChange={handleNewTelephoneNumberInputChange}
                            />
                            <button className='btn btn-success' type='button' onClick={handleAddNewTelephoneNumber}>
                                Add
                            </button>
                        </div>
                    )}
                </div>
                
                
            )}
        </>
        */

        /*
    )
}

export default CallReceiverSelector

*/
