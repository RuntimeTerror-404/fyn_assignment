import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/issues/';

export const getIssues = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const addIssue = async (issueData) => {
    const response = await axios.post(API_BASE_URL, issueData);
    return response.data;
};

export const updateIssue = async (id, issueData) => {
    const response = await axios.put(`${API_BASE_URL}${id}/`, issueData);
    return response.data;
};

export const deleteIssue = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}${id}/`);
    return response.data;
};
