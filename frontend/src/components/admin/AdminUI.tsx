import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import ListCallsComponent from '../calls/ListAllCalls'
import { AuthContext } from '../auth/AuthProvider';



const AdminUI: React.FC = () => {
  const { role } = useContext(AuthContext);

  // Render the page only if the user has the admin role
  if (role !== "ADMIN") {
    return <div>You don't have permission to access this page.</div>;
  }

  return (
    <>
      <section className='container mt-5'>
        <h2>Welcome to the Admin Panel</h2>
      </section>
      <Link to={"/get-all-calls"}>
        Manage Calls
      </Link>
      <br></br>
      <Link to={"/get-all-invoices"}>
        Manage invoices
      </Link>
      <br></br>
      <Link to={"/get-all-payments"}>
        Manage Payments
      </Link>
      <br></br>
      <Link to={"/get-all-users"}>
        Manage Users
      </Link>
      <div>
        <ListCallsComponent />
      </div>
    </>
  );
}

export default AdminUI;

/*
const AdminUI = () => {
  return (
    <>
    <section className='container mt-5'>
      <h2>Welcome to the Admin Panel</h2>
    </section>
      <Link to={"/calls"}>
        Manage Calls
      </Link>



    <div>
      <ListCallsComponent />
      </div>
      
      </>
  )
}

export default AdminUI
*/