import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const API_BASE = 'https://dummyjson.com';

const Home = () => {
  const { logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/products`);
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);


  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Products</h2>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-3">
            <div className="card h-100">
              <img src={product.thumbnail} className="card-img-top" alt={product.title} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
