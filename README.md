# Post Blog Application 📝

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring complete CRUD operations, user authentication, and a modern responsive design.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)
![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey)

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Protected routes
- User profile management
- Ownership-based permissions (users can only edit/delete their own posts)

### 📝 Blog Management (Full CRUD)
- **Create** - Write and publish blog posts with image uploads
- **Read** - View all posts and individual post details
- **Update** - Edit existing posts (owners only)
- **Delete** - Remove posts (owners only)

### 💬 Interactive Features
- Like/unlike posts
- Comment system with authentication
- User statistics dashboard
- Real-time UI updates

### 🎨 Modern UI/UX
- **Dark/Light Theme Toggle** 🌙☀️
- **Fully Responsive Design** 📱💻
- **Modern UI Components** with Tailwind CSS
- **Smooth Animations** and transitions
- **Mobile-First Approach**

### 🛠️ Technical Features
- RESTful API architecture
- File upload with Multer
- Password hashing with bcrypt
- Input validation and error handling
- CORS configuration
- Environment-based configuration

## 🚀 Live Demo

[View Live Application](https://mern-week4-demo.vercel.app) *(Replace with your actual deployment URL)*

## 📁 Project Structure

```
MERN-week4/
├── backend/
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Post.js              # Blog post schema
│   │   └── Comment.js           # Comment schema
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── posts.js             # Blog post CRUD routes
│   │   └── comments.js          # Comment routes
│   ├── uploads/                 # Image storage directory
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Express server setup
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── CreatePost.jsx   # Create new post form
    │   │   ├── EditPost.jsx     # Edit existing post form
    │   │   ├── PostList.jsx     # Display all posts
    │   │   ├── PostDetail.jsx   # Individual post view
    │   │   ├── Login.jsx        # Login form
    │   │   ├── Register.jsx     # Registration form
    │   │   ├── Profile.jsx      # User profile page
    │   │   └── Footer.jsx       # Site footer
    │   ├── services/
    │   │   └── api.js           # API service functions
    │   ├── AuthContext.jsx      # Authentication context
    │   ├── ThemeContext.jsx     # Theme management context
    │   ├── App.jsx              # Main app component
    │   ├── main.jsx             # App entry point
    │   └── index.css            # Global styles
    ├── package.json
    └── vite.config.js           # Vite configuration
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **multer** - File upload handling
- **cors** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Context API** - State management
- **Vite** - Build tool and dev server

## 📋 Prerequisites

Before running this application, make sure you have:
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Stepho-hub/MERN-week4.git
cd MERN-week4
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Configuration
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-blog
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-blog

JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

#### Start the Backend Server
```bash
npm run dev
# Server will run on http://localhost:5000
```

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../frontend
npm install
```

#### Start the Frontend Development Server
```bash
npm run dev
# Frontend will run on http://localhost:5173
```

### 4. Access the Application

Open your browser and navigate to `http://localhost:5173`

## 📖 Usage Guide

### User Registration & Login
1. Click "Register" to create a new account
2. Fill in username, email, and password
3. Click "Login" to access your account
4. Your welcome message will appear in the navigation

### Creating Blog Posts
1. Log in to your account
2. Click "Create Post" in the navigation
3. Fill in the post details:
   - Title (required)
   - Content (required)
   - Tags (comma-separated, optional)
   - Image (optional)
4. Click "Create Post" to publish

### Managing Your Posts
- **View Profile**: Click "Profile" to see your statistics and posts
- **Edit Posts**: Click the ✏️ icon on your posts to edit them
- **Delete Posts**: Click the 🗑️ icon on your posts to delete them
- **View Posts**: Click on any post title to read the full content

### Interacting with Posts
- **Like Posts**: Click the ❤️ button to like/unlike posts
- **Comment**: Log in and use the comment form at the bottom of posts
- **Theme Toggle**: Click the moon/sun icon (🌙/☀️) to switch themes

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (auth required)
- `PATCH /api/posts/:id` - Update post (auth + ownership required)
- `DELETE /api/posts/:id` - Delete post (auth + ownership required)
- `POST /api/posts/:id/like` - Like/unlike post (auth required)

### Comments
- `GET /api/comments/post/:postId` - Get comments for a post
- `POST /api/comments` - Create comment (auth required)
- `PATCH /api/comments/:id` - Update comment (auth + ownership required)
- `DELETE /api/comments/:id` - Delete comment (auth + ownership required)

## 🎨 Theme System

The application features a comprehensive dark/light theme system:

### Theme Toggle
- Click the theme toggle button in the navigation
- Theme preference is saved in localStorage
- All components automatically adapt to the selected theme

### Theme Coverage
- ✅ Navigation and header
- ✅ All form inputs and buttons
- ✅ Post cards and content
- ✅ User profile and statistics
- ✅ Comments and interactions
- ✅ Footer and links
- ✅ Loading states and messages

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile phones (320px+)
- 📱 Large mobile (480px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1280px+)

### Responsive Features
- **Flexible Navigation**: Menu items wrap on smaller screens
- **Adaptive Layouts**: Grid systems adjust to screen size
- **Touch-Friendly**: Adequate button sizes and spacing
- **Readable Text**: Responsive typography scaling
- **Optimized Images**: Proper image sizing across devices

## 🔒 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Authentication**: Stateless authentication with tokens
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured cross-origin policies
- **File Upload Security**: Restricted file types and sizes
- **Authorization Checks**: Ownership verification for sensitive operations

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB database (local or cloud)
2. Configure environment variables
3. Deploy to services like Heroku, Railway, or Vercel
4. Update CORS settings for production domain

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to services like Vercel, Netlify, or GitHub Pages
3. Configure API base URL for production

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
FRONTEND_URL=https://your-frontend-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Stepho-hub**
- GitHub: [@Stepho-hub](https://github.com/Stepho-hub)
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- React documentation and community
- Tailwind CSS for the amazing utility-first approach
- MongoDB and Mongoose for the robust database solution
- Express.js for the reliable backend framework
- All the open-source contributors who made this possible

---

⭐ **Star this repo if you found it helpful!**

For questions or support, please open an issue on GitHub.
