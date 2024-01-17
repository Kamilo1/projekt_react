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
    onClose: ()=> void;
  }

  const UserTodos: React.FC<Props> = ({ userId , onClose}) => {
    const [todos, setTodos] = useState<ToDo[]>([]);

    useEffect(() => {
        if (userId) {
          fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
            .then((response) => response.json())
            .then((data: ToDo[]) => setTodos(data))
            .catch((error) => console.log(error));
        }
      }, [userId]);

      return (

        <Modal onClose={onClose}>
            <h2>Todos</h2>
            <div className="albums-container">
              {todos.map((todo) => (
                <div key={todo.id} className="album">
                  <p>{todo.title}</p>
                </div>
              ))}
            </div>
        </Modal>
        
      );
    };
    
    
    export default UserTodos;
