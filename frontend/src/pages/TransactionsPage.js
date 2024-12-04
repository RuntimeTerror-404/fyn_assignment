import React, { useState, useEffect } from 'react';
import {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
} from '../api/transactions';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [newTransaction, setNewTransaction] = useState({
        vehicle: '',
        total_price: '',
        date: '',
    });
    const [editTransaction, setEditTransaction] = useState(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleAddTransaction = async () => {
        try {
            await addTransaction(newTransaction);
            setNewTransaction({ vehicle: '', total_price: '', date: '' });
            fetchTransactions();
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    const handleUpdateTransaction = async () => {
        try {
            await updateTransaction(editTransaction.id, editTransaction);
            setEditTransaction(null);
            fetchTransactions();
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    const handleDeleteTransaction = async (id) => {
        try {
            await deleteTransaction(id);
            fetchTransactions();
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    return (
        <div>
            <h1>Transactions Management</h1>
            <div>
                <h2>Add New Transaction</h2>
                <input
                    type="text"
                    placeholder="Vehicle ID"
                    value={newTransaction.vehicle}
                    onChange={(e) =>
                        setNewTransaction({ ...newTransaction, vehicle: e.target.value })
                    }
                />
                <input
                    type="number"
                    placeholder="total_price"
                    value={newTransaction.total_price}
                    onChange={(e) =>
                        setNewTransaction({ ...newTransaction, total_price: e.target.value })
                    }
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={newTransaction.date}
                    onChange={(e) =>
                        setNewTransaction({ ...newTransaction, date: e.target.value })
                    }
                />
                <button onClick={handleAddTransaction}>Add</button>
            </div>

            {editTransaction && (
                <div>
                    <h2>Edit Transaction</h2>
                    <input
                        type="text"
                        placeholder="Vehicle ID"
                        value={editTransaction.vehicle}
                        onChange={(e) =>
                            setEditTransaction({ ...editTransaction, vehicle: e.target.value })
                        }
                    />
                    <input
                        type="number"
                        placeholder="total_price"
                        value={editTransaction.total_price}
                        onChange={(e) =>
                            setEditTransaction({ ...editTransaction, total_price: e.target.value })
                        }
                    />
                    <input
                        type="date"
                        placeholder="Date"
                        value={editTransaction.date}
                        onChange={(e) =>
                            setEditTransaction({ ...editTransaction, date: e.target.value })
                        }
                    />
                    <button onClick={handleUpdateTransaction}>Update</button>
                    <button onClick={() => setEditTransaction(null)}>Cancel</button>
                </div>
            )}

            <div>
                <h2>Transactions List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vehicle</th>
                            <th>total_price</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.vehicle}</td>
                                <td>{transaction.total_price}</td>
                                <td>{transaction.date}</td>
                                <td>
                                    <button onClick={() => setEditTransaction(transaction)}>Edit</button>
                                    <button onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionsPage;
