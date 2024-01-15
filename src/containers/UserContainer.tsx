import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import UserDetails from '../components/UserDetails';
import UserAlbums from '../components/UserAlbums';

interface User {
  id: number;
  name: string;
}

const UserContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAlbums, setShowAlbums] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId);
    setShowDetailsModal(true);
    setShowAlbums(false);
  };

  const handleShowAlbumsClick = (userId: number) => {
    setSelectedUserId(userId);
    setShowAlbums(true);
    setShowDetailsModal(false);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
    setShowDetailsModal(false);
    setShowAlbums(false);
  };

  const handleUserDelete = (userId: number) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setSelectedUserId(null);
    setShowDetailsModal(false);
    setShowAlbums(false);
  };

  return (
    <div>
      <UserList users={users} onUserClick={handleUserClick} onDelete={handleUserDelete} onShowAlbumsClick={handleShowAlbumsClick} />
      {showDetailsModal && !showAlbums && (
        <UserDetails userId={selectedUserId} onClose={handleCloseModal} />
      )}
      {showAlbums && selectedUserId !== null && (
        <UserAlbums userId={selectedUserId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default UserContainer;
