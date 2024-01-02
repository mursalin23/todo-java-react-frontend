import React, { useState } from 'react';
import api from '../api/axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoForm({ onNewTodo }) {
    const [id, setId] = useState('');
    const [description, setDescription] = useState('');
    const [duedate, setDuedate] = useState('');
    const [priority, setPriority] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newTodo = {
            id,
            description,
            duedate,
            priority,
        };

        try {
            const response = await api.post('/todo', newTodo);
            onNewTodo(response.data);
            setError(error)
        } catch (error) {
            setError(error.response.data.message);
        }

    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <form onSubmit={handleSubmit} className="mb-3">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="mb-3">
                            <label className="form-label">ID</label>
                            <input
                                type="text"
                                className="form-control"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Due Date</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={duedate}
                                onChange={(e) => setDuedate(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Priority</label>
                            <input
                                type="number"
                                className="form-control"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Todo</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TodoForm;