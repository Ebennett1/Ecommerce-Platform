import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';


const ProductListPage = () => {
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
      <h1>Products</h1>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            {product.image && (
              <img src={product.image} alt={product.name} className="product-image" />
            )}
            <Link to={`/product/${product.id}`} className="product-link">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
