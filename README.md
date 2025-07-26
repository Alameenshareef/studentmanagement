# Student Management System

A full-stack student management application with role-based access control. The system supports Super Admin and Staff roles, where only Super Admins can register new staff members.

## 🏗️ Project Structure

```
studentmanagement/
├── backend/          # Node.js/Express API
├── frontend/         # React/TypeScript UI
└── README.md         # Project documentation
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment Configuration:**
   Create a `.env` file in the `backend/` directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/student-management
   JWT_SECRET=your_jwt_secret
   ```
4. **Start the backend server:**
   ```bash
   npm start
   ```
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration (Super Admin only for Staff)

### Staff Management
- `GET /api/staff` - Get all staff members
- `POST /api/staff` - Create new staff member
- `PUT /api/staff/:id` - Update staff member
- `DELETE /api/staff/:id` - Delete staff member

### Student Management
- `GET /api/students` - Get all students
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

## 🔐 Role-Based Access Control

- **Super Admin**: Full access to all features, can register new staff members
- **Staff**: Limited access, cannot register new staff members

## 🛠️ Development

### Backend

**Scripts:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

**Features:**
- Express.js REST API
- MongoDB with Mongoose
- JWT authentication
- Role-based middleware
- Password hashing with bcrypt

### Frontend

**Scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Features:**
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS and ShadCn for styling
- Context API for state management
- Axios for API calls

## 📁 Key Files

### Backend
- `server.js` - Main server file
- `controllers/` - Request handlers
- `models/` - Database schemas
- `middleware/` - Authentication and authorization
- `routes/` - API route definitions
- `services/` - Business logic

### Frontend
- `src/App.tsx` - Main application component
- `src/context/AuthContext.tsx` - Authentication state management
- `src/pages/` - Page components
- `src/components/` - Reusable UI components
- `src/api/` - API service functions

## 🔧 Configuration

### Backend Environment Variables
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-management
JWT_SECRET=your_jwt_secret
```

## 🐛 Troubleshooting

- **Backend won't start:** Check if MongoDB is running, verify environment variables, ensure dependencies are installed.
- **Frontend can't connect to backend:** Verify backend is running, check CORS configuration, ensure API endpoints are correct.
- **Authentication issues:** Verify JWT_SECRET, check token expiration, ensure proper role assignments.

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions, please open an issue in the repository. 
