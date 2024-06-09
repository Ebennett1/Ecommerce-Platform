import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);  // State to manage categories

  // Fetch categories from the API when the component mounts
  useEffect(() => {
    axios.get('/categories/')
      .then(response => {
        setCategories(response.data);  // Update state with fetched categories
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);  // Handle errors
      });
  }, []);  // Empty dependency array ensures this effect runs only once

  return (
    <div className="container">
      <div className="category-list">
        <h1 className="title">Categories</h1>
        <ul>
          {categories.map(category => (
            <li key={category.id} className="box">
              {/* Link to the products page with the category ID as a query parameter */}
              <Link to={`/products?category_id=${category.id}`} className="has-text-link">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryListPage;
