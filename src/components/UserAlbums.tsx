import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import UserPhotos from './UserPhotos';

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Props {
  userId: number | null;
  onClose: () => void;
}

const UserAlbums: React.FC<Props> = ({ userId, onClose }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [photoCount, setPhotoCount] = useState<number | null>(null);

  useEffect(() => {
    if (userId) {
      fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then((response) => response.json())
        .then((data: Album[]) => setAlbums(data))
        .catch((error) => console.log(error));
    }
  }, [userId]);

  const handleShowPhotosClick = (album: Album) => {
    setSelectedAlbum(album);

    // Pobierz liczbę zdjęć w albumie
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`)
      .then((response) => response.json())
      .then((photos) => setPhotoCount(photos.length))
      .catch((error) => console.log(error));
  };

  return (
    <Modal onClose={onClose}>
      <h2>Albums</h2>
      <div className="albums-container">
        {albums.map((album) => (
          <div key={album.id} className="album" onClick={() => handleShowPhotosClick(album)}>
            <p>{album.title}</p>
            <br></br>
            <p>Liczba zdjęć w albumie: {photoCount}</p>
          </div>
        ))}
      </div>

      {selectedAlbum !== null && (
        <UserPhotos albumId={selectedAlbum.id} onClose={() => setSelectedAlbum(null)} />
      )}

    </Modal>
  );
};

export default UserAlbums;
