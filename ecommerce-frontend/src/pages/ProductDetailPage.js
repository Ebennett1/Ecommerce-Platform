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
    <div className="container">
      <div className="box">
        <h1 className="title is-4"><u>{product.name}</u></h1>
        <p className="content">{product.description}</p>
        <p className="content"><strong>Price:</strong> ${product.price}</p>
        {product.image && (
          <figure className="image_3">
            <img src={product.image} alt={product.name} />
          </figure>
        )}
        <p className="content"><strong>Available in Stock:</strong> {product.stock}</p>
        
          <button className="button is-primary" onClick={handleAddToCart}>Add to Cart</button>
          <br></br>
          <button className="button" onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
