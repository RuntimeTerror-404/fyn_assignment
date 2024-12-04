import React, { useState, useEffect } from 'react';
import { getVehicles, addVehicle, updateVehicle, deleteVehicle } from '../api/vehicles';

const VehiclesPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [newVehicle, setNewVehicle] = useState({ name: '', registration_number: '', owner_name: '' });
    const [editVehicle, setEditVehicle] = useState(null);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const data = await getVehicles();
            setVehicles(data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const handleAddVehicle = async () => {
        try {
            await addVehicle(newVehicle);
            setNewVehicle({ name: '', registration_number: '', owner_name: '' }); // Reset form
            fetchVehicles();
        } catch (error) {
            console.error('Error adding vehicle:', error);
        }
    };

    const handleUpdateVehicle = async () => {
        try {
            await updateVehicle(editVehicle.id, editVehicle);
            setEditVehicle(null); // Close edit form
            fetchVehicles();
        } catch (error) {
            console.error('Error updating vehicle:', error);
        }
    };

    const handleDeleteVehicle = async (id) => {
        try {
            await deleteVehicle(id);
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    return (
        <div>
            <h1>Vehicle Management</h1>
            <div>
                <h2>Add New Vehicle</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newVehicle.name}
                    onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Registration Number"
                    value={newVehicle.registration_number}
                    onChange={(e) => setNewVehicle({ ...newVehicle, registration_number: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Owner Name"
                    value={newVehicle.owner_name}
                    onChange={(e) => setNewVehicle({ ...newVehicle, owner_name: e.target.value })}
                />
                <button onClick={handleAddVehicle}>Add</button>
            </div>

            {editVehicle && (
                <div>
                    <h2>Edit Vehicle</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={editVehicle.name}
                        onChange={(e) => setEditVehicle({ ...editVehicle, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Registration Number"
                        value={editVehicle.registration_number}
                        onChange={(e) => setEditVehicle({ ...editVehicle, registration_number: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Owner Name"
                        value={editVehicle.owner_name}
                        onChange={(e) => setEditVehicle({ ...editVehicle, owner_name: e.target.value })}
                    />
                    <button onClick={handleUpdateVehicle}>Update</button>
                    <button onClick={() => setEditVehicle(null)}>Cancel</button>
                </div>
            )}

            <div>
                <h2>Vehicles List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Registration Number</th>
                            <th>Owner Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.id}</td>
                                <td>{vehicle.name}</td>
                                <td>{vehicle.registration_number}</td>
                                <td>{vehicle.owner_name}</td>
                                <td>
                                    <button onClick={() => setEditVehicle(vehicle)}>Edit</button>
                                    <button onClick={() => handleDeleteVehicle(vehicle.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VehiclesPage;
