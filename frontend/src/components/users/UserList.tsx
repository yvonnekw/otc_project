import React, { useState, useEffect, useContext } from 'react';
import { getAllUsers } from '../../services/UserService'; 
import { AuthContext } from '../auth/AuthProvider';


interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { role } = useContext(AuthContext);

    // Render the page only if the user has the admin role
    if (role !== "ADMIN") {
        return <div>You don't have permission to access this page.</div>;
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers(); 
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching users. Please try again.'); 
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <div>
            <h2>User List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;