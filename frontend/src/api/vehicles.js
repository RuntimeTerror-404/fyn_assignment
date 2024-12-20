import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/vehicles/';

export const getVehicles = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const addVehicle = async (vehicleData) => {
    const response = await axios.post(API_BASE_URL, vehicleData);
    return response.data;
};

export const updateVehicle = async (id, vehicleData) => {
    const response = await axios.put(`${API_BASE_URL}${id}/`, vehicleData);
    return response.data;
};

export const deleteVehicle = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}${id}/`);
    return response.data;
};
