import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateTodoForm({ todo, onUpdateTodo }) {
    const [id, setId] = useState('');
    const [description, setDescription] = useState('');
    const [duedate, setDuedate] = useState('');
    const [priority, setPriority] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (todo) {
            setId(todo.id);
            setDescription(todo.description);
            
            // Format the date string to "yyyy-MM-dd"
            const date = new Date(todo.duedate);
            const formattedDate = date.toISOString().split('T')[0];
            setDuedate(formattedDate);
            
            setPriority(todo.priority);
        }
    }, [todo]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedTodo = {
            id,
            description,
            duedate,
            priority,
        };

        try {
            const response = await api.put(`/todo/${id}`, updatedTodo);
            if (response.status === 200) {
                onUpdateTodo(updatedTodo);
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
                <label>Description</label>
                <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Due Date</label>
                <input type="date" className="form-control" value={duedate} onChange={e => setDuedate(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Priority</label>
                <input type="number" className="form-control" value={priority} onChange={e => setPriority(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    );
}

export default UpdateTodoForm;