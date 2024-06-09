import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  return (
    <div className="container">
      <div className="category-list">
        <h1 className="title">Categories</h1>
        <ul>
          {categories.map(category => (
            <li key={category.id} className="box">
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
