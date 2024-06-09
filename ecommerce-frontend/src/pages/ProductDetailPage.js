import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();  // Get the product ID from the URL parameters
  const [product, setProduct] = useState(null);  // State to manage the product details
  const { addToCart } = useContext(CartContext);  // Access the addToCart function from CartContext
  const navigate = useNavigate();  // Hook for navigating programmatically

  // Fetch product details when the component mounts or when the product ID changes
  useEffect(() => {
    axios.get(`products/${id}/`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [id]);

  // Handle adding the product to the cart
  const handleAddToCart = () => {
    addToCart(product.id, 1);  // Add one quantity of the product to the cart
    navigate('/cart');  // Navigate to the cart page
  };

  // Show loading message while the product details are being fetched
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
        <br />
        <button className="button" onClick={() => navigate('/products')}>Back to Products</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
