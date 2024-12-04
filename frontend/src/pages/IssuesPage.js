import React, { useState, useEffect } from 'react';
import { getIssues, addIssue, updateIssue, deleteIssue } from '../api/issues';

const IssuesPage = () => {
    const [issues, setIssues] = useState([]);
    const [newIssue, setNewIssue] = useState({
        description: '',
        vehicle: '', // Vehicle ID
        component: '', // Component ID
        issue_type: 'repair', // Default type
    });
    const [editIssue, setEditIssue] = useState(null);

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            const data = await getIssues();
            setIssues(data);
        } catch (error) {
            console.error('Error fetching issues:', error);
        }
    };

    const handleAddIssue = async () => {
        try {
            await addIssue(newIssue);
            setNewIssue({ description: '', vehicle: '', component: '', issue_type: 'repair' });
            fetchIssues();
        } catch (error) {
            console.error('Error adding issue:', error);
        }
    };

    const handleUpdateIssue = async () => {
        try {
            await updateIssue(editIssue.id, editIssue);
            setEditIssue(null);
            fetchIssues();
        } catch (error) {
            console.error('Error updating issue:', error);
        }
    };

    const handleDeleteIssue = async (id) => {
        try {
            await deleteIssue(id);
            fetchIssues();
        } catch (error) {
            console.error('Error deleting issue:', error);
        }
    };

    return (
        <div>
            <h1>Issues Management</h1>
            <div>
                <h2>Add New Issue</h2>
                <textarea
                    placeholder="Description"
                    value={newIssue.description}
                    onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Vehicle ID"
                    value={newIssue.vehicle}
                    onChange={(e) => setNewIssue({ ...newIssue, vehicle: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Component ID"
                    value={newIssue.component}
                    onChange={(e) => setNewIssue({ ...newIssue, component: e.target.value })}
                />
                <select
                    value={newIssue.issue_type}
                    onChange={(e) => setNewIssue({ ...newIssue, issue_type: e.target.value })}
                >
                    <option value="repair">Repair</option>
                    <option value="purchase">Purchase</option>
                </select>
                <button onClick={handleAddIssue}>Add</button>
            </div>

            {editIssue && (
                <div>
                    <h2>Edit Issue</h2>
                    <textarea
                        placeholder="Description"
                        value={editIssue.description}
                        onChange={(e) => setEditIssue({ ...editIssue, description: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Vehicle ID"
                        value={editIssue.vehicle}
                        onChange={(e) => setEditIssue({ ...editIssue, vehicle: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Component ID"
                        value={editIssue.component}
                        onChange={(e) => setEditIssue({ ...editIssue, component: e.target.value })}
                    />
                    <select
                        value={editIssue.issue_type}
                        onChange={(e) => setEditIssue({ ...editIssue, issue_type: e.target.value })}
                    >
                        <option value="repair">Repair</option>
                        <option value="purchase">Purchase</option>
                    </select>
                    <button onClick={handleUpdateIssue}>Update</button>
                    <button onClick={() => setEditIssue(null)}>Cancel</button>
                </div>
            )}

            <div>
                <h2>Issues List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Vehicle</th>
                            <th>Component</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue) => (
                            <tr key={issue.id}>
                                <td>{issue.id}</td>
                                <td>{issue.description}</td>
                                <td>{issue.vehicle}</td>
                                <td>{issue.component}</td>
                                <td>{issue.issue_type}</td>
                                <td>
                                    <button onClick={() => setEditIssue(issue)}>Edit</button>
                                    <button onClick={() => handleDeleteIssue(issue.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IssuesPage;
