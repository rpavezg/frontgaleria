import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    axios.get('/protected/offers')
      .then(response => setOffers(response.data))
      .catch(error => console.error('Error al cargar las ofertas:', error));
  }, []);

  const handleDeleteOffer = async (id) => {
    await axios.delete(`/protected/offers/${id}`);
    setOffers(offers.filter(offer => offer.id !== id));
  };

  const currentOffers = offers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container mt-4">
      <h2>Mis Ofertas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Obra</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentOffers.map(offer => (
            <tr key={offer.id}>
              <td><img src={offer.img} alt={offer.nombre} style={{ width: '50px' }} /></td>
              <td>{offer.nombre}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteOffer(offer.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(offers.length / itemsPerPage) }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Offers;
