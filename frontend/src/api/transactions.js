import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/transactions/';

export const getTransactions = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const addTransaction = async (transactionData) => {
    const response = await axios.post(API_BASE_URL, transactionData);
    return response.data;
};

export const updateTransaction = async (id, transactionData) => {
    const response = await axios.put(`${API_BASE_URL}${id}/`, transactionData);
    return response.data;
};

export const deleteTransaction = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}${id}/`);
    return response.data;
};
