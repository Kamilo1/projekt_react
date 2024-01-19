import React from 'react';

interface User {
  id: number;
  name: string;
}

interface Props {
  users: User[];
  onUserClick: (userId: number) => void;
  onDelete: (userId: number) => void;
  onShowAlbumsClick: (userId: number) => void;
  onShowTodosClick: (userId: number) => void;
  onShowPostsAndComments: (userId: number) => void;
  onSortUsersAZ: () => void;
  onSortUsersZA: () => void;
  onShowEditMode: (userId: number) => void;
}

const UserList: React.FC<Props> = ({
  users,
  onUserClick,
  onDelete,
  onShowAlbumsClick,
  onShowTodosClick,
  onSortUsersAZ,
  onSortUsersZA,
  onShowPostsAndComments,
  onShowEditMode,
}) => {
  return (
    <div className="center">
      <div className='sort-buttons'>
      <button onClick={onSortUsersAZ} className="sort-button">
        A-Z
      </button>
      <button onClick={onSortUsersZA} className="sort-button">
        Z-A
      </button>
      </div>
      
      <div className="user-container">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <div className="user-actions">
              <button onClick={() => onUserClick(user.id)}>
                <i className="fa-solid fa-circle-info"></i>
              </button>
              <button onClick={() => onDelete(user.id)}>
                <i className="fa-solid fa-trash"></i>
              </button>
              <button onClick={() => onShowAlbumsClick(user.id)}>
              <i className="fa-solid fa-images"></i>
              </button>
              <button onClick={() => onShowPostsAndComments(user.id)}>
                <i className="fa-solid fa-comments"></i>
              </button>
              <button onClick={() => onShowEditMode(user.id)}>
              <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button onClick={() => onShowTodosClick(user.id)}>
              <i className="fa-solid fa-list-check"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
