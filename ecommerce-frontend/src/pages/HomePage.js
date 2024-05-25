import React, { useEffect, useState } from 'react';
import axios from '../api/axios';


const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            {product.image && (
              <img src={product.image} alt={product.name} className="product-image" />
            )}
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
