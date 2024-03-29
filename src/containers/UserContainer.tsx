import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import UserDetails from '../components/UserDetails';
import UserEdit from '../components/UserEdit';
import UserAlbums from '../components/UserAlbums';
import UserPostsAndComments from '../components/UserPostsAndComments';
import UserTodos from '../components/UserToDos';
interface User {
  id: number;
  name: string;
}

const UserContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditMode, setShowEditMode] = useState(false);
  const [showAlbums, setShowAlbums] = useState(false);
  const [showPostsAndComments, setShowPostsAndComments] = useState(false);
  const [showTodos, setShowTodos] = useState(false);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  /* Sorting */
  const sortUsersAZ = () => {
    const sorted = [...users].sort((a, b) =>
       a.name.localeCompare(b.name) 
    );
    setUsers(sorted);
    
  };
  
  const sortUsersZA = () => {
    const sorted = [...users].sort((a, b) =>
       b.name.localeCompare(a.name) 
    );
    setUsers(sorted);
    
  };
  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId);
    setShowDetailsModal(true);
    setShowAlbums(false);
    setShowTodos(false);
  };

  const handleShowAlbumsClick = (userId: number) => {
    setSelectedUserId(userId);
    setShowAlbums(true);
    setShowDetailsModal(false);
    setShowTodos(false);
  };
  
  const handleShowTodosClick = (userId: number) => {
    setSelectedUserId(userId);
    setShowTodos(true);
    setShowDetailsModal(false);
    setShowAlbums(false);
    setShowPostsAndComments(false);
  }

  const handleShowPostsAndCommentsClick = (userId: number) => {
    setSelectedUserId(userId);
    setShowPostsAndComments(true);
    setShowTodos(false);
  };
  
  const handleCloseModal = () => {
    setSelectedUserId(null);
    setShowDetailsModal(false);
    setShowAlbums(false);
    setShowPostsAndComments(false);
  };

  const handleUserDelete = (userId: number) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setSelectedUserId(null);
    setShowDetailsModal(false);
    setShowAlbums(false);
    setShowPostsAndComments(false);
    setShowTodos(false);
  };
  const handleUserEdit = (userId: number) => {
    setSelectedUserId(userId);
    setShowEditMode(true);
    setShowAlbums(false);
    setShowTodos(false);
  };
  const handleCloseUserEdit = () => {
    setSelectedUserId(null);
    setShowEditMode(false);
    setShowAlbums(false);
  };

  
  return (
    <div>
      <UserList 
      users={users} 
      onUserClick={handleUserClick} 
      onDelete={handleUserDelete} 
      onSortUsersAZ={sortUsersAZ}
      onSortUsersZA={sortUsersZA} 
      onShowAlbumsClick={handleShowAlbumsClick}
      onShowPostsAndComments ={handleShowPostsAndCommentsClick}
      onShowEditMode={handleUserEdit}
      onShowTodosClick={handleShowTodosClick}
       />
      {showEditMode && !showAlbums && (
        <UserEdit userId={selectedUserId} onClose={handleCloseUserEdit} />
      )}
      {showDetailsModal && !showAlbums && (
        <UserDetails userId={selectedUserId} onClose={handleCloseModal} />
      )}
      {showAlbums && selectedUserId !== null && (
        <UserAlbums userId={selectedUserId} onClose={handleCloseModal} />
      )}
      {showTodos && selectedUserId !== null && (
        <UserTodos userId={selectedUserId} onClose={handleCloseModal} />
      )}
      {showPostsAndComments && selectedUserId !== null && (
        <UserPostsAndComments userId={selectedUserId} onClose={handleCloseModal}></UserPostsAndComments>
      )} 
    </div>
  );
};

export default UserContainer;
