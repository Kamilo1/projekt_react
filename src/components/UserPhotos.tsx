import React, { useEffect, useState } from 'react';
import Modal from './Modal';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface Props {
  albumId: number | null;
  onClose: () => void;
}

const UserPhotos: React.FC<Props> = ({ albumId, onClose }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    if (albumId) {
      fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        .then((response) => response.json())
        .then((data: Photo[]) => setPhotos(data))
        .catch((error) => console.log(error));
    }
  }, [albumId]);

  return (
    <Modal onClose={onClose}>
      <h2>Zdjęcia</h2>
      <div className="photos-container">
        {photos.map((photo) => (
          <div key={photo.id} className="photo">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default UserPhotos;
