import React, { useEffect, useState } from 'react';
import Modal from './Modal';

interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  userId: number | null;
  onClose: () => void;
}

const UserTodos: React.FC<Props> = ({ userId, onClose }) => {
  const [todos, setTodos] = useState<ToDo[]>([]);

  useEffect(() => {
    if (userId) {
      fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
        .then((response) => response.json())
        .then((data: ToDo[]) => setTodos(data))
        .catch((error) => console.log(error));
    }
  }, [userId]);

  const handleDelete = (id: number) => {
    // Filtruj zadania, usuwając to o danym ID
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <Modal onClose={onClose}>
      <h2>Todos</h2>
      <div className="albums-container">
        {todos.map((todo) => (
          <div key={todo.id} className={`album${todo.completed ? ' completed' : ''}`}>
            <p>{todo.title}</p>
            {todo.completed && (
              <button onClick={() => handleDelete(todo.id)}>
                <i className="fa-solid fa-trash-can-arrow-up"></i>
              </button>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default UserTodos;
