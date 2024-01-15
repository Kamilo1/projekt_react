import React, { useEffect, useState } from 'react';

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Props {
  userId: number | null;
  onClose: ()=> void;
}

const UserAlbums: React.FC<Props> = ({ userId , onClose}) => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    if (userId) {
      fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then((response) => response.json())
        .then((data: Album[]) => setAlbums(data))
        .catch((error) => console.log(error));
    }
  }, [userId]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>User Albums</h2>
        <div className="albums-container">
          {albums.map((album) => (
            <div key={album.id} className="album">
              <p>{album.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default UserAlbums;

export {};