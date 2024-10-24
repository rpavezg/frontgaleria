import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';

const Likes = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/protected/likes', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setLikes(response.data);
    })
    .catch(error => {
      console.error("Error al obtener los likes:", error);
    });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Mis Me Gusta</h2>
      <div className="row">
        {likes.map((like) => (
          <div className="col-md-4" key={like.id}>
            <div className="card">
              <img src={like.img} className="card-img-top" alt={like.nombre} />
              <div className="card-body">
                <h5 className="card-title">{like.nombre}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Likes;
