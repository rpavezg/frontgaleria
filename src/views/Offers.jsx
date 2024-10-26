import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';

const Likes = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await axios.get('/protected/offers', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setLikes(response.data);
    };

    fetchLikes();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Ofertado</h2>
      <div className="row">
        {likes.map(like => (
          <div key={like.id} className="col-md-4">
            {/* Card similar a la de artworks */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Likes;
