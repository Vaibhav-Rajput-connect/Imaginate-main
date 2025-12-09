# Imaginate

Imaginate is a full-stack MERN (MongoDB, Express, React, Node.js) application designed for AI image generation. It allows users to generate creative images from text prompts, featuring a modern, responsive UI and secure payment integration.

## Features

- **Text-to-Image Generation**: Generate high-quality images from text descriptions using AI.
- **User Authentication**: Secure signup and login functionality using JWT.
- **Payment Integration**: Razorpay integration for credit purchasing.
- **Responsive Design**: A modern and responsive user interface built with TailwindCSS.
- **Community Showcase**: View and share generated images with the community.

## Tech Stack

**Frontend:**
- React
- Vite
- TailwindCSS
- Framer Motion

**Backend:**
- Node.js
- Express.js
- MongoDB
- Razorpay
- JWT (JSON Web Tokens)

## Prerequisites

Before running the application, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A MongoDB Atlas account and connection string.
- Razorpay account credentials.

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Imaginate-main
```

### 2. Server Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Start the server:

```bash
npm run server
```

The server will start on `http://localhost:5000`.

### 3. Client Setup

Navigate to the client directory and install dependencies:

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory and add the following variable:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The client will start on `http://localhost:5173` (or another available port).

## API Documentation

The backend exposes the following main API endpoints:

- **Auth**:
    - `POST /api/user/register`: Register a new user.
    - `POST /api/user/login`: Login an existing user.
    - `POST /api/user/credits`: Get user credits.
- **Image**:
    - `POST /api/image/generate-image`: Generate an image from a prompt.
    - `GET /api/image`: Get all generated images.

## Deployment

### Client (Vercel)
The frontend is configured for deployment on Vercel. Connect your GitHub repository to Vercel and deploy the `client` directory. Ensure you set the `VITE_BACKEND_URL` environment variable in your Vercel project settings.

### Server (Render)
The backend is configured for deployment on Render. Connect your GitHub repository to Render and deploy the `server` directory as a Web Service. Add all environment variables defined in your `.env` file to the Render environment settings.
