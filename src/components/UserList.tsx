import React from 'react';

interface User {
  id: number;
  name: string;
  // ... inne właściwości użytkownika
}

interface Props {
  users: User[];
  onUserClick: (userId: number) => void;
}

const UserList: React.FC<Props> = ({ users, onUserClick }) => {
  return (
   <center>
   <div>
      <h2>Lista użytkowników:</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            {/* Dodaj inne kolumny */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              {/* Dodaj inne komórki */}
              <td
                 onClick={() => onUserClick(user.id)}>ℹ️
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </center>
  );
};

export default UserList;
