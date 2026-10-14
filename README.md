# MERN E-Commerce Application

A full-stack e-commerce application with a customer storefront, an admin dashboard, and a REST API. The project supports product browsing, customer accounts, shopping carts, order management, and online payment integration.

## Features

### Storefront

- Browse products by category and brand; filter by price and tags, and sort results.
- View product details, ratings, and customer reviews.
- Register, sign in, manage a profile, and reset a forgotten password.
- Manage a shopping cart and wishlist.
- Check out through Razorpay and view order history and status.
- Browse blog posts and send enquiries through the contact form.

### Admin Dashboard

- View order and sales summaries.
- Manage products, product categories, brands, and colors.
- Manage customers, orders, coupons, and customer enquiries.
- Create and manage blog posts and blog categories.
- Upload and manage product images through Cloudinary.

### Backend

- REST API built with Express and MongoDB/Mongoose.
- JWT authentication and role-based access for administrative endpoints.
- Password hashing and email-based password reset.
- Razorpay order creation and server-side payment verification.
- Image upload and processing with Multer, Sharp, and Cloudinary.

## Tech Stack

| Component | Technologies |
| --- | --- |
| Storefront | React 18, React Router, Redux Toolkit, Axios, Formik |
| Admin Dashboard | React 18, Ant Design, Redux Toolkit |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| Integrations | Razorpay, Cloudinary, Nodemailer |

## Project Structure

```text
├── Frontend/       # Customer-facing React app
├── Admin/          # React admin dashboard
└── Backend/        # Express API, models, routes, and controllers
```

Each application has its own `package.json` and `package-lock.json`.

## Installation and Setup

### Prerequisites

- Node.js
- npm
- MongoDB
- Razorpay credentials for payments
- Cloudinary credentials for image uploads
- SMTP credentials for email functionality

### 1. Configure Environment Variables

Create a `.env` file in each of the following directories using the corresponding `.env.example` file:

- `Backend/`
- `Frontend/`
- `Admin/`

Update the environment variables with your own configuration.

### 2. Start Backend

```bash
cd Backend
npm ci
npm start
```

Backend URL: `http://localhost:5000`

### 3. Start Frontend

Open a new terminal:

```bash
cd Frontend
npm ci
npm start
```

Frontend URL: `http://localhost:3000`

### 4. Start Admin Dashboard

Open another terminal:

```bash
cd Admin
npm ci
npm start
```

Admin Dashboard URL: `http://localhost:3001`

## Environment Variables

### Backend Configuration

Create `Backend/.env`:

```dotenv
PORT=5000
NODE_ENV=development
MONGODB_URL=mongodb://127.0.0.1:27017/mern_ecommerce
JWT_SECRET=replace-with-a-long-random-value
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

CLOUD_NAME=your-cloudinary-name
API_KEY=your-cloudinary-api-key
SECRET_KEY=your-cloudinary-api-secret

MAIL_ID=your-smtp-account
MP=your-smtp-password
MAIL_FROM=your-smtp-account
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

### Frontend Configuration

Create `Frontend/.env`:

```dotenv
REACT_APP_API_URL=http://localhost:5000/api/
REACT_APP_BUSINESS_ADDRESS=
REACT_APP_BUSINESS_PHONE=
REACT_APP_BUSINESS_EMAIL=
REACT_APP_BUSINESS_HOURS=
```

The business contact fields are optional.

### Admin Dashboard Configuration

Create `Admin/.env`:

```dotenv
REACT_APP_API_URL=http://localhost:5000/api/
PORT=3001
```

## Production Build

To create a production build of the storefront:

```bash
cd Frontend
npm run build
```

To create a production build of the admin dashboard:

```bash
cd Admin
npm run build
```

## Additional Notes

- Admin login requires an existing account with the `admin` role.
- Razorpay checkout is configured for INR.
- Payment and email services require valid credentials.
- Keep `.env` files and sensitive credentials out of version control.
- Test authentication, checkout, payments, and order management before production deployment.