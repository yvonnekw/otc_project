import React, { useState, useEffect, useContext } from 'react';
import { getPayments } from '../../services/PaymentService'; 
import { AuthContext } from '../auth/AuthProvider';

interface Payment {
    id: number;
    amount: number;
    date: string;
}

const PaymentList: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { role } = useContext(AuthContext);

    // Render the page only if the user has the admin role
    if (role !== "ADMIN") {
        return <div>You don't have permission to access this page.</div>;
    }

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await getPayments(); // Call your API function to fetch payments
                setPayments(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching payments. Please try again.'); // Handle errors
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Display loading indicator while fetching payments
    }

    if (error) {
        return <div>{error}</div>; // Display error message if fetching payments fails
    }

    return (
        <div>
            <h2>Payment List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td>{payment.id}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentList;