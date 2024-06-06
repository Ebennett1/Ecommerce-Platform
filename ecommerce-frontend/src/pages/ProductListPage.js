import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link, useLocation } from 'react-router-dom';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    axios.get('/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get('category_id');
    const searchQuery = params.get('search');
    
    let url = `/products/?page=${currentPage}`;
    if (categoryId) {
      url += `&category_id=${categoryId}`;
    }
    if (searchQuery) {
      url += `&search=${searchQuery}`;
    }

    console.log('Fetching products from URL:', url);

    axios.get(url)
      .then(response => {
        setProducts(response.data.results);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
        console.error(error.response || error.message);
      });
  }, [location.search, currentPage]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      window.location.href = `/products?category_id=${selectedCategory}`;
    } else {
      window.location.href = '/products';
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const params = new URLSearchParams(location.search);
  const selectedCategoryId = params.get('category_id') || '';

  return (
    <div>
      <h1>Products</h1>
      <div>
        <label htmlFor="category">Filter by category:</label>
        <select id="category" value={selectedCategoryId} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            <h2 className='product-names'>{product.name}</h2>
            <p>${product.price}</p>
            {product.image && (
              <img src={product.image} alt={product.name} className="product-image" />
            )}
            <Link to={`/product/${product.id}`} className="product-link">View Details</Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        {prevPage && <button className='prev-button' onClick={handlePrevPage}>Previous</button>}
        {nextPage && <button className='next-button' onClick={handleNextPage}>Next</button>}
      </div>
    </div>
  );
};

export default ProductListPage;
