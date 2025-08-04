# 🏪 Store Rating System

A comprehensive full-stack web application for rating and managing stores with role-based access control.

## 📱 **Screenshots**

### **Login Page**
![Login Page](<img width="1918" height="977" alt="Login Page" src="https://github.com/user-attachments/assets/524c80d1-bfb1-4a4c-a06f-298a85efc02e" />
)
*Modern authentication interface with role-based access control*

### **Admin Dashboard**
![Admin Dashboard](<img width="1918" height="953" alt="Admin Dashboard" src="https://github.com/user-attachments/assets/f70e0abe-0246-4fa1-b626-6b2342ad9ab9" />
)
*System overview with statistics and quick action buttons*

### **Admin Manage Users**
![Admin Manage Users](<img width="1890" height="866" alt="Admin Manage User Section" src="https://github.com/user-attachments/assets/f2fc6466-0ab8-47cb-8442-8c70872e1474" />
)
*User management with search, filter, and CRUD operations*

### **Admin Manage Stores**
![Admin Manage Stores](<img width="1907" height="965" alt="Admin Manage Store Section" src="https://github.com/user-attachments/assets/02962beb-cac3-49ef-8693-0f826f493b43" />
)
*Store management panel with ratings and owner assignments*

### **Store Owner Dashboard**
![Store Owner Dashboard](<img width="1885" height="861" alt="Store Dashboard" src="https://github.com/user-attachments/assets/074c8511-047e-4ee2-9cf3-1757c3062bc2" />
)
*Multi-store analytics with rating insights and performance metrics*

### **User Dashboard**
![User Dashboard](<img width="1916" height="968" alt="Normal User Dashboard" src="https://github.com/user-attachments/assets/7a0fdaf8-7728-435e-ba55-32856fb3e41d" />
)
*Store browsing with interactive ratings and search functionality*

---

**Features:** Role-based access, real-time ratings, search/filter, responsive design, modern UI/UX

## 🌟 Features

### 👤 **User Roles**
- **System Administrator**: Complete system management
- **Normal User**: Browse and rate stores
- **Store Owner**: Manage owned stores and view analytics

### 🔐 **Authentication & Security**
- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting protection
- Input validation and sanitization

### 🏬 **Store Management**
- Browse stores with search and filters
- Detailed store information display
- Store rating and review system
- Multi-store support for owners

### 🎨 **User Experience**
- Modern, responsive design
- Light/Dark mode toggle
- Real-time search with debouncing
- Toast notifications
- Loading states and error handling

## 🛠️ **Tech Stack**

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **express-rate-limit** - Rate limiting

### **Frontend**
- **React.js** - UI framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd store-rating-system
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Database Setup**
   ```bash
   # Login to MySQL
   mysql -u root -p
   
   # Create database
   CREATE DATABASE store_rating_system;
   
   # Run the database setup script
   node setup-database.js
   ```

4. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=store_rating_system
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. **Start the Application**
   ```bash
   # Start backend server (Terminal 1)
   npm run server
   
   # Start frontend (Terminal 2)
   cd client
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 👥 **Default Users**

### **System Administrator**
- **Email**: admin@store-rating.com
- **Password**: Admin@123

### **Demo Store Owner**
- **Email**: sarah@example.com
- **Password**: Password@123

### **Demo Normal User**
- **Email**: rahul@example.com
- **Password**: Password@123

## 📊 **Database Schema**

### **Users Table**
- id, name, email, address, role, password, created_at

### **Stores Table**
- id, name, email, address, owner_id, created_at, updated_at

### **Ratings Table**
- id, user_id, store_id, rating, comment, created_at

## 🔄 **API Endpoints**

### **Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### **Admin Routes**
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/stores` - Get all stores
- `POST /api/admin/stores` - Create store
- `PUT /api/admin/stores/:id` - Update store
- `DELETE /api/admin/stores/:id` - Delete store

### **Store Routes**
- `GET /api/stores` - Get all stores (public)
- `GET /api/stores/my-store` - Get owner's stores
- `PUT /api/stores/my-store/:id` - Update store
- `POST /api/stores/:id/rate` - Rate a store

### **User Routes**
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

## 🎯 **Key Features Implemented**

### **Admin Panel**
- ✅ User management (CRUD operations)
- ✅ Store management (CRUD operations)
- ✅ Advanced search and filtering
- ✅ Store rating display for store owners

### **Store Owner Dashboard**
- ✅ Multi-store management
- ✅ Real-time rating analytics
- ✅ Review management
- ✅ Store information editing

### **User Experience**
- ✅ Responsive design
- ✅ Light/Dark mode
- ✅ Debounced search
- ✅ Form validations
- ✅ Error handling

## 🔒 **Security Features**

- Password hashing with salt
- JWT token authentication
- Rate limiting (100 requests/15 minutes)
- Input validation and sanitization
- SQL injection prevention
- XSS protection headers

## 🚀 **Local Development & Deployment**

### **Quick Start**
```bash
# Install dependencies
npm run install-all

# Setup database
npm run setup

# Start development server
npm run dev
```

### **Production Build**
```bash
# Build frontend for production
npm run build

# Start production server
npm run server
```

### **Environment Variables**
Create a `.env` file in the root directory:
```env
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=store_rating_system
JWT_SECRET=your_strong_jwt_secret
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 **License**

This project is licensed under the MIT License.

---

**Built with ❤️ using React.js, Node.js, and MySQL**
