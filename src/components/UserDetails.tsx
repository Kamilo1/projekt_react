import React, { useEffect, useState } from 'react';
import Modal from './Modal';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }

interface Props {
  userId: number | null;
  onClose: () => void; 
}

const UserDetails: React.FC<Props> = ({ userId, onClose}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => response.json())
        .then((data: User) => setUser(data))
        .catch((error) => console.log(error));
    }
  }, [userId]);

  if (!user) {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <center><div>No user selected.</div></center>
        </div>
      </div>
    );
  }

  return (
    <center>
    <Modal onClose={onClose}>
        <h2>{user.name}</h2>
        <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <h3>Address:</h3>
      <p>Street: {user.address.street}</p>
      <p>Suite: {user.address.suite}</p>
      <p>City: {user.address.city}</p>
      <p>Zipcode: {user.address.zipcode}</p>
      <p>Geo: {user.address.geo.lat}, {user.address.geo.lng}</p>
      <h3>Contact:</h3>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <h3>Company:</h3>
      <p>Name: {user.company.name}</p>
      <p>Catchphrase: {user.company.catchPhrase}</p>
      <p>Business: {user.company.bs}</p>
</Modal>
    </center>
  );
};

export default UserDetails;
