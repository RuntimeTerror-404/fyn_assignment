import React, { useState, useEffect } from 'react';
import { getComponents, addComponent, updateComponent, deleteComponent } from '../api/components';

const ComponentsPage = () => {
    const [components, setComponents] = useState([]);
    const [newComponent, setNewComponent] = useState({ name: '', price: 0, type: 'new' }); // Include type with default value
    const [editComponent, setEditComponent] = useState(null);

    useEffect(() => {
        fetchComponents();
    }, []);

    const fetchComponents = async () => {
        try {
            const data = await getComponents();
            setComponents(data);
        } catch (error) {
            console.error('Error fetching components:', error);
        }
    };

    const handleAddComponent = async () => {
        try {
            await addComponent(newComponent);
            setNewComponent({ name: '', price: 0, type: 'new' }); // Reset the form
            fetchComponents();
        } catch (error) {
            console.error('Error adding component:', error);
        }
    };

    const handleUpdateComponent = async () => {
        try {
            await updateComponent(editComponent.id, editComponent);
            setEditComponent(null);
            fetchComponents();
        } catch (error) {
            console.error('Error updating component:', error);
        }
    };

    const handleDeleteComponent = async (id) => {
        try {
            await deleteComponent(id);
            fetchComponents();
        } catch (error) {
            console.error('Error deleting component:', error);
        }
    };

    return (
        <div>
            <h1>Components Management</h1>
            <div>
                <h2>Add New Component</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newComponent.name}
                    onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newComponent.price}
                    onChange={(e) => setNewComponent({ ...newComponent, price: parseFloat(e.target.value) })}
                />
                <select
                    value={newComponent.type}
                    onChange={(e) => setNewComponent({ ...newComponent, type: e.target.value })}
                >
                    <option value="new">new</option>
                    <option value="new">new</option>
                </select>
                <button onClick={handleAddComponent}>Add</button>
            </div>

            {editComponent && (
                <div>
                    <h2>Edit Component</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={editComponent.name}
                        onChange={(e) => setEditComponent({ ...editComponent, name: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={editComponent.price}
                        onChange={(e) => setEditComponent({ ...editComponent, price: parseFloat(e.target.value) })}
                    />
                    <select
                        value={editComponent.type}
                        onChange={(e) => setEditComponent({ ...editComponent, type: e.target.value })}
                    >
                        <option value="new">new</option>
                        <option value="new">new</option>
                    </select>
                    <button onClick={handleUpdateComponent}>Update</button>
                    <button onClick={() => setEditComponent(null)}>Cancel</button>
                </div>
            )}

            <div>
                <h2>Components List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {components.map((component) => (
                            <tr key={component.id}>
                                <td>{component.id}</td>
                                <td>{component.name}</td>
                                <td>{component.price}</td>
                                <td>{component.type}</td>
                                <td>
                                    <button onClick={() => setEditComponent(component)}>Edit</button>
                                    <button onClick={() => handleDeleteComponent(component.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComponentsPage;
