import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import '../App.css';

const Likes = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get('/protected/likes', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setLikes(response.data);
      } catch (error) {
        console.error("Error al obtener los 'Me gusta':", error);
      }
    };
    fetchLikes();
  }, []);

  const handleDeleteLike = async (id) => {
    try {
      await axios.delete(`/protected/likes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setLikes(likes.filter((like) => like.id !== id)); // Actualiza el estado local eliminando el "Me gusta"
      alert('Me gusta eliminado');
    } catch (error) {
      console.error("Error al eliminar 'Me gusta':", error);
      alert('Error al eliminar "Me gusta"');
    }
  };

  return (
    <div className="main-container">
      <h2>Mis Me Gusta</h2>
      <table className="table table-bordered table-hover" >
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre de la obra</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody class="table-group-divider"></tbody>
        <tbody>
          {likes.map((like) => (
            <tr key={like.id}>
              <td><img src={like.img} alt={like.nombre} style={{ width: '50px' }} /></td>
              <td>{like.nombre}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteLike(like.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Likes;
