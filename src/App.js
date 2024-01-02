import React from 'react';
import TodoList from './components/TodoList';

function App() {
  const handleNewTodo = (newTodo) => {
    // Handle new todo here (e.g., add it to the list)
  };

  return (
    <div>
      <TodoList />
    </div>
  );
}

export default App;