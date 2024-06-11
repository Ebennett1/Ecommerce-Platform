# Ecommerce-Platform-Front-end
# Elite Cart

[Hosted App Link](https://your-app-link.com)

## Description

Welcome to our E-commerce App, a dynamic and user-friendly online store that provides a seamless shopping experience. From browsing through various categories to managing your cart and making secure payments, our app is designed to meet all your shopping needs efficiently.

## Technologies Used

- React
- Bulma CSS Framework
- Django (Backend)
- Django REST Framework (API)
- PostgreSQL (Database)
- Stripe (Payment Processing)
- Axios (HTTP Client)
- React Router (Navigation)

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


```
## User Stories

### User Authentication and Authorization

#### User Registration
- As a new user, I want to create an account so that I can log in and make purchases.
- As a user, I want to receive a confirmation email after registering so that I know my account was created successfully.

#### User Login
- As a registered user, I want to log in to my account so that I can access my profile and order history.
- As a user, I want to log out of my account so that I can ensure my account is secure.

### User Profile Management

- As a logged-in user, I want to view and update my profile information so that my details are current.
- As a user, I want to change my password so that I can maintain my account’s security.

### Product Catalog

#### Product Listings
- As a user, I want to view a list of available products so that I can browse and choose items to purchase.
- As a user, I want to filter and sort products by category, price, and other criteria so that I can easily find what I’m looking for.

#### Product Details
- As a user, I want to view detailed information about a product so that I can make an informed purchase decision.
- As a user, I want to see product images, descriptions, specifications, and reviews on the product details page.

### Shopping Cart

#### Add to Cart
- As a user, I want to add a product to my shopping cart so that I can purchase it later.
- As a user, I want to see a confirmation that a product has been added to my cart.

#### View Cart
- As a user, I want to view the items in my shopping cart so that I can review my selections before checking out.
- As a user, I want to see the total price of the items in my cart.

#### Update Cart
- As a user, I want to update the quantity of items in my cart so that I can adjust my purchase according to my needs.
- As a user, I want to remove items from my cart if I decide not to purchase them.

### Checkout Process

#### Enter Shipping Address
- As a user, I want to enter my shipping address during checkout so that my order can be delivered to the correct location.

#### Payment Processing
- As a user, I want to enter my payment details securely during checkout so that I can pay for my order.
- As a user, I want to receive a confirmation of my payment so that I know my order has been processed.

#### Review Order
- As a user, I want to review my order details, including items, quantities, prices, shipping address, and payment method, before finalizing the purchase.

#### Order Confirmation
- As a user, I want to receive an order confirmation email after completing my purchase so that I have a record of my transaction.

### Order Management

#### View Order History
- As a logged-in user, I want to view my past orders so that I can track my purchase history.

#### Order Status
- As a user, I want to see the status of my current orders (e.g., processing, shipped, delivered) so that I know when to expect delivery.

### Basic Administration Panel

#### Product Management
- As an admin, I want to add new products to the catalog so that customers can purchase them.
- As an admin, I want to update product details so that the information is accurate and current.
- As an admin, I want to delete products that are no longer available so that the catalog is up-to-date.

#### Order Management
- As an admin, I want to view and manage customer orders so that I can ensure they are processed and fulfilled correctly.

### Responsive Design

#### Mobile-Friendly Interface
- As a user, I want to browse and purchase products on my mobile device so that I can shop conveniently from anywhere.

### Additional Features (Post-MVP)

#### User Reviews and Ratings
- As a user, I want to leave reviews and ratings for products I have purchased so that I can share my feedback with others.

#### Wishlist
- As a user, I want to save products to a wishlist so that I can easily find and purchase them later.

#### Advanced Search and Filtering
- As a user, I want to use advanced search options and filters to find products that meet my specific criteria.

#### Email Notifications
- As a user, I want to receive email notifications for various actions (e.g., order shipped, order delivered) so that I am kept informed about my order status.

#### Analytics Dashboard
- As an admin, I want to view sales and user activity analytics so that I can make informed business decisions.

#### Inventory Management
- As an admin, I want to track product stock levels and receive notifications when inventory is low so that I can restock in time.



## Wireframes


![Demo Screenshot1]()


![Demo Screenshot2]()

![Demo Screenshot3]()


![Demo Screenshot4]()