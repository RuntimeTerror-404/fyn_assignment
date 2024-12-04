import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/components/';

export const getComponents = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const addComponent = async (componentData) => {
    const response = await axios.post(API_BASE_URL, componentData);
    return response.data;
};

export const updateComponent = async (id, componentData) => {
    const response = await axios.put(`${API_BASE_URL}${id}/`, componentData);
    return response.data;
};

export const deleteComponent = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}${id}/`);
    return response.data;
};
