import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';

function App() {
  const { token, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className={`max-w-7xl mx-auto p-3 sm:p-5 rounded-2xl shadow-xl min-h-screen w-full ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <nav className={`p-3 md:p-4 rounded-xl mb-6 sm:mb-10 flex flex-wrap justify-between items-center gap-4 shadow-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'}`}>
        <div className="flex items-center gap-5">
          <Link to="/" className="text-black dark:text-white no-underline font-semibold px-4 py-2 rounded-3xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:-translate-y-1">Post Blog</Link>
          <Link to="/" className="text-black dark:text-white no-underline font-semibold px-4 py-2 rounded-3xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:-translate-y-1">Home</Link>
          {token && <Link to="/create" className="text-black dark:text-white no-underline font-semibold px-4 py-2 rounded-3xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:-translate-y-1">Create Post</Link>}
          {token && <Link to="/profile" className="text-black dark:text-white no-underline font-semibold px-4 py-2 rounded-3xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:-translate-y-1">Profile</Link>}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="text-black dark:text-white no-underline font-semibold px-4 py-2 rounded-3xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:-translate-y-1 bg-transparent border-none cursor-pointer">
            {isDark ? '☀️' : '🌙'}
          </button>
          {token ? (
            <div className="flex items-center gap-4">
              <span className="text-black dark:text-white font-medium">Welcome, {user?.username || 'User'}</span>
              <button onClick={handleLogout} className="text-black dark:text-blue-600 no-underline font-semibold px-4 py-2 rounded-3xl transition-all duration-300 hover:bg-gray-900 dark:hover:bg-gray-700 transform hover:-translate-y-1">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-black dark:text-black no-underline font-semibold px-4 py-2 rounded-3xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:-translate-y-1">Login</Link>
              <Link to="/register" className="text-black dark:text-white no-underline font-semibold px-4 py-2 rounded-3xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:-translate-y-1">Register</Link>
            </div>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
