# SDC Registration System

A web application for MVJ College of Engineering's Software Development Club registration system.

## Features

- Clean and modern user interface
- Registration form with validation
- Timeline showing registration process
- Backend API with MongoDB database
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sdc-registration
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

4. Create a `.env` file in the root directory with the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sdc_registration
JWT_SECRET=your_jwt_secret_key_here
```

## Running the Application

1. Start the MongoDB server

2. Start the backend server:
```bash
npm start
```

3. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

- POST /api/registration - Submit a new registration
- GET /api/registration - Get all registrations
- PATCH /api/registration/:id - Update registration status

## Technologies Used

- Frontend:
  - React with TypeScript
  - Material-UI
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT for authentication

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 