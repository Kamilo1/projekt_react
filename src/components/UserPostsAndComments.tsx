import React, { useState, useEffect } from 'react';
import Modal from './Modal';


interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Props {
  userId: number;
  onClose: () => void;
}

const UserPostsAndComments: React.FC<Props> = ({ userId, onClose }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch posts for the selected user
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((data: Post[]) => setPosts(data))
      .catch((error) => console.log(error));

    // Fetch comments for all posts
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((data: Comment[]) => setComments(data))
      .catch((error) => console.log(error));
  }, [userId]);

  const handlePostClick = (postId: number) => {
    setSelectedPostId(postId);
  };

  const handleClosePostModal = () => {
    setSelectedPostId(null);
  };

  return (
    <Modal onClose={onClose}>
      {selectedPostId !== null ? (
        <div className="comments-container">
          <h3>Comments for Post {posts.find(post => post.id === selectedPostId)?.title}</h3>
          {comments
            .filter((comment) => comment.postId === selectedPostId)
            .map((comment) => (
              <div key={comment.id} className="comment">
                <p>
                  <strong>{comment.name}</strong> - {comment.body}
                </p>
              </div>
            ))}
          <button onClick={handleClosePostModal}>Close</button>
        </div>
      ) : (
        <div className="posts-container">
          {posts.map((post) => (
            <div key={post.id} className="post" onClick={() => handlePostClick(post.id)}>
              <p>{post.title}</p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default UserPostsAndComments;
