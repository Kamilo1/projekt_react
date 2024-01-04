import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import UserDetails from '../components/UserDetails';

interface User {
  id: number;
  name: string;
  
}

const UserContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false); 

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId);
    setShowDetailsModal(true); // Pokaż modal po kliknięciu użytkownika
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
    setShowDetailsModal(false); 
  };
  const handleUserDelete = (userId: number) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setSelectedUserId(null); 
    setShowDetailsModal(false);
  };
  return (
    <div>
      <UserList users={users} onUserClick={handleUserClick} onDelete={handleUserDelete} />
      {showDetailsModal && (
        <UserDetails userId={selectedUserId} onClose={handleCloseModal} /> // Przekaż funkcję onClose do UserDetails
      )}
    </div>
  );
};

export default UserContainer;
