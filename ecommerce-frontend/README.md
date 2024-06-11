# Ecommerce-Platform-Front-end
# Elite Cart

[Hosted App Link](https://your-app-link.com)

## Description

Welcome to our Elite Cart, a dynamic and user-friendly online store that provides a seamless shopping experience. From browsing through various categories to managing your cart and making secure payments, our app is designed to meet all your shopping needs efficiently.

## Technologies Used

- React
- Bulma CSS Framework
- Django (Backend)
- Django REST Framework (API)
- PostgreSQL (Database)
- Stripe (Payment Processing)
- Axios (HTTP Client)
- React Router (Navigation)
- Unsplash API (Images)

## Installation and Setup

### Prerequisites

- Node.js and npm
- Python and pip
- PostgreSQL

### Frontend

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo/frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

### Backend

1. Navigate to the backend directory:
    ```bash
    cd ../backend
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate # On Windows use `venv\Scripts\activate`
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up the PostgreSQL database:
    ```bash
    createdb your-database-name
    ```

5. Apply migrations:
    ```bash
    python manage.py migrate
    ```

6. Create a superuser:
    ```bash
    python manage.py createsuperuser
    ```

7. Start the development server:
    ```bash
    python manage.py runserver
    ```

## API Documentation

### Description

Our API provides endpoints to manage products, categories, orders, and user authentication for the e-commerce platform. The API is built with Django REST Framework.

### Base URL

https://your-app-link.com/api


### Endpoints

#### Authentication

- **Login**
    - **URL:** `/auth/login/`
    - **Method:** `POST`
    - **Request Body:**
        ```json
        {
          "username": "your-username",
          "password": "your-password"
        }
        ```
    - **Response:**
        ```json
        {
          "access": "access-token",
          "refresh": "refresh-token"
        }
        ```

- **Register**
    - **URL:** `/auth/register/`
    - **Method:** `POST`
    - **Request Body:**
        ```json
        {
          "username": "your-username",
          "password": "your-password",
          "email": "your-email"
        }
        ```
    - **Response:**
        ```json
        {
          "id": "user-id",
          "username": "your-username",
          "email": "your-email"
        }
        ```

#### Products

- **Get All Products**
    - **URL:** `/products/`
    - **Method:** `GET`
    - **Response:**
        ```json
        [
          {
            "id": "product-id",
            "name": "product-name",
            "description": "product-description",
            "price": "product-price",
            "image": "product-image-url",
            "stock": "product-stock"
          },
          ...
        ]
        ```

- **Get Product by ID**
    - **URL:** `/products/:id/`
    - **Method:** `GET`
    - **Response:**
        ```json
        {
          "id": "product-id",
          "name": "product-name",
          "description": "product-description",
          "price": "product-price",
          "image": "product-image-url",
          "stock": "product-stock"
        }
        ```

#### Orders

- **Create Order**
    - **URL:** `/orders/create/`
    - **Method:** `POST`
    - **Request Body:**
        ```json
        {
          "cart": [
            {
              "product_id": "product-id",
              "quantity": "quantity"
            },
            ...
          ],
          "total_price": "total-price"
        }
        ```
    - **Response:**
        ```json
        {
          "id": "order-id",
          "total_price": "total-price",
          "status": "order-status",
          "items": [
            {
              "product": "product-id",
              "quantity": "quantity",
              "price": "price"
            },
            ...
          ]
        }
        ```

- **Get Order by ID**
    - **URL:** `/orders/:id/`
    - **Method:** `GET`
    - **Response:**
        ```json
        {
          "id": "order-id",
          "total_price": "total-price",
          "status": "order-status",
          "items": [
            {
              "product": "product-id",
              "quantity": "quantity",
              "price": "price"
            },
            ...
          ]
        }
        ```

### Making Requests

All requests to the API should include the appropriate headers for authentication and content type:

```http
Authorization: Bearer your-access-token
Content-Type: application/json
