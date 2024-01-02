import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import TodoForm from './TodoForm';
import UpdateTodoForm from './UpdateTodoForm';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [formValues, setFormValues] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await api.get('/todo');
            setTodos(response.data);
        };
        
        fetchTodos();
    }, []);
    
    const handleNewTodo = (todo) => {
        setTodos([...todos, todo]);
    };
    
    const handleEdit = async (todo) => {
        setFormValues(null);
        const response = await api.put(`/todo/${todo.id}`, todo);
        if (response.status === 200) {
            setTodos(todos.map(listedTodo => listedTodo.id === todo.id ? todo : listedTodo));
        }
    };

    const handleDelete = async (id) => {
        const response = await api.delete(`/todo/${id}`);
        if (response.status === 200) {
            setTodos(todos.filter(todo => todo.id !== id));
        }
    };

    const handleEditClick = (todo) => {
        setFormValues(todo);
    };

    return (
        <div className="container">
            <div className="card mt-3">
                <h5 className="card-header bg-primary text-white">Add New Todo</h5>
                <div className="card-body">
                    <TodoForm onNewTodo={handleNewTodo} />
                </div>
            </div>
            {formValues && (
                <div className="card mt-3">
                    <h5 className="card-header bg-warning text-white">Edit Todo</h5>
                    <div className="card-body">
                        <UpdateTodoForm todo={formValues} onUpdateTodo={handleEdit} />
                    </div>
                </div>
            )}
            <div className="card mt-3">
                <h5 className="card-header bg-success text-white">Todo List</h5>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Due Date</th>
                                <th>Priority</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map((todo) => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.duedate}</td>
                                    <td>{todo.priority}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(todo)}>Edit</button>
                                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TodoList;