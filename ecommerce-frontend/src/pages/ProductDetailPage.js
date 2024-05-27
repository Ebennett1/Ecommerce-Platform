import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`products/${id}/`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    navigate('/cart');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      {product.image && (
        <img src={product.image} alt={product.name} className="product-image" />
      )}
      <p> Available in Stock: {product.stock}</p>
      <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button> <br/>
      <button className="back-button" onClick={() => navigate('/products')}>Back to Products</button>
    </div>
  );
};

export default ProductDetailPage;
