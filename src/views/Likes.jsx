import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';

const Likes = () => {
  const [likes, setLikes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    axios.get('/protected/likes')
      .then(response => setLikes(response.data))
      .catch(error => console.error('Error al cargar "Me gusta":', error));
  }, []);

  const handleDeleteLike = async (id) => {
    await axios.delete(`/protected/likes/${id}`);
    setLikes(likes.filter(like => like.id !== id));
  };

  const currentLikes = likes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mt-4">
      <h2>Mis "Me gusta"</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Obra</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentLikes.map(like => (
            <tr key={like.id}>
              <td><img src={like.img} alt={like.nombre} style={{ width: '50px' }} /></td>
              <td>{like.nombre}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteLike(like.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(likes.length / itemsPerPage) }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Likes;
