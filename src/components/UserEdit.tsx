import React, { useEffect, useState } from 'react';

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
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{user.name}</h2>
        <p>Username: <input type="text" value={user.username}/></p>
      <p>Email: <input type="text" value={user.email}/></p>

      <h3>Address:</h3>
      <p>Street: <input type="text" value={user.address.street} /></p>
      <p>Suite: <input type="text" value={user.address.suite} /></p>
      <p>City: <input type="text" value={user.address.city} /></p>
      <p>Zipcode: <input type="text" value={user.address.zipcode} /></p>
      <p>Geo: <input type="text" value={`${user.address.geo.lat}, ${user.address.geo.lng}`} /></p>

      <h3>Contact:</h3>
      <p>Phone: <input type="text" value={user.phone} /></p>
      <p>Website: <input type="text" value={user.website} /></p>
      <h3>Company:</h3>
      <p>Name: <input type="text" value={user.company.name} /></p>
      <p>Catchphrase: <input type="text" value={user.company.catchPhrase} /></p>
      <p>Business: <input type="text" value={user.company.bs} /></p>
      <input type="button" onClick={onClose} value="Save"/>
      </div>
    </div>
    </center>
  );
};

export default UserDetails;
