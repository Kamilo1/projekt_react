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
  onShowPostsAndComments: (userId:number) => void;
  onSortUsersAZ: () => void;
  onSortUsersZA: () => void;
}

const UserList: React.FC<Props> = ({ users, onUserClick, onDelete, onShowAlbumsClick, onSortUsersAZ, onSortUsersZA, onShowPostsAndComments}) => {
  return (
    <div className="center">
      <button onClick={onSortUsersAZ} className="sort-button">
          A-Z
        </button>
        <button onClick={onSortUsersZA} className="sort-button">
          Z-A
        </button>
      <div className="user-container">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <div className="user-actions">
              <button onClick={() => onUserClick(user.id)}><i className="fa-solid fa-circle-info"></i>
              </button>
              <button onClick={() => onDelete(user.id)}><i className="fa-solid fa-trash"></i>
              </button>
              <button onClick={() => onShowAlbumsClick(user.id)}><i className="fa-solid fa-boxes-stacked"></i>
              </button>
              <button onClick={() => onShowPostsAndComments(user.id)}><i className="fa-solid fa-comments"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
