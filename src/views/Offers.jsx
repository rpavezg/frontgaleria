import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('/protected/offers', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOffers(response.data);
      } catch (error) {
        console.error("Error al obtener las ofertas:", error);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Mis Ofertas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre de la obra</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td><img src={offer.img} alt={offer.nombre} style={{ width: '50px' }} /></td>
              <td>{offer.nombre}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteOffer(offer.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Offers;
