import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { useNavigate, Link } from 'react-router-dom';

const Logout: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.handleLogout();
    navigate("/", { state: { message: "You have been logged out." } });
  };

  return (
    <>
      <ul>
        <li>
          <Link className="dropdown-item" to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <hr className='dropdown-divider' />
        </li>
      </ul>
      <button className='dropdown-item' onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Logout;

/*
const Logout: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.handleLogout();
    navigate("/", { state: { message: " You have been logged out." } });
  };

  return (
    <>
      <ul>
        <li>
          <Link className="dropdown-item" to={"/profile"}>
            Profile
          </Link>
        </li>
        <li>
          <hr className='dropdown-divider' />
        </li>
      </ul>
      <button className='dropdown-item' onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Logout;
*/

/*
const Logout = () => {

    const auth = useContext(AuthContext)
    
    const navigate = useNavigate();

    const handleLogout =() => {
        auth.handleLogout()
        navigate("/", { state: { message: " You have been logged out." }})
    }

    return (

        <>
            <ul>
                <li>
                    <Link className="dropdown-item" to={"/profile"}>
                        Profile
                    </Link>
                </li>
                <li>
                    <hr className='dropdown-divider' />
                </li>
            </ul>
            <button className='dropdown-item' onClick={handleLogout}>
                Logout
            </button>
        </>
  
    ) ;
}

export default Logout
*/