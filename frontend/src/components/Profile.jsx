import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI, authAPI } from '../services/api';
import { useTheme } from '../ThemeContext';
import { useAuth } from '../AuthContext';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchUserProfile();
    fetchUserPosts();
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await authAPI.getMe();
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await postsAPI.getAll();
      // Filter posts by current user
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser) {
        const filteredPosts = response.data.filter(post => post.author._id === currentUser._id);
        setUserPosts(filteredPosts);
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mb-4 ${isDark ? 'border-indigo-400' : 'border-indigo-600'}`}></div>
      <p className={`text-lg ${isDark ? 'text-white' : 'text-black'}`}>Loading profile...</p>
    </div>
  );

  if (!user) return (
    <div className={`text-center py-20 text-lg ${isDark ? 'text-white' : 'text-black'}`}>
      Please <Link to="/login" className={`no-underline font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>login</Link> to view your profile.
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
      {/* Profile Header */}
      <div className={`rounded-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-10 shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center text-xl sm:text-2xl lg:text-3xl font-bold ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="text-center sm:text-left">
            <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{user.username}</h1>
            <p className={`text-sm sm:text-base lg:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{user.email}</p>
            <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className={`text-center p-3 sm:p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{userPosts.length}</div>
            <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Posts</div>
          </div>
          <div className={`text-center p-3 sm:p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              {userPosts.reduce((total, post) => total + post.likes.length, 0)}
            </div>
            <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Total Likes</div>
          </div>
          <div className={`text-center p-3 sm:p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              {userPosts.reduce((total, post) => total + (post.commentCount || 0), 0)}
            </div>
            <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Total Comments</div>
          </div>
        </div>
      </div>

      {/* User's Posts */}
      <div>
        <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-black'}`}>Your Posts</h2>

        {userPosts.length === 0 ? (
          <div className={`text-center py-8 sm:py-12 rounded-xl ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
            <p className="text-base sm:text-lg mb-4">You haven't created any posts yet.</p>
            <Link
              to="/create"
              className={`inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold no-underline transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg text-sm sm:text-base ${isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {userPosts.map(post => (
              <div key={post._id} className={`rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border`}>
                {post.image && (
                  <img
                    src={`http://localhost:5000/uploads/${post.image}`}
                    alt={post.title}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3 sm:mb-4"
                  />
                )}
                <h3 className={`text-lg sm:text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                  <Link to={`/post/${post._id}`} className={`no-underline ${isDark ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600'}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className={`text-xs sm:text-sm mb-3 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {post.content.substring(0, 120)}...
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 text-xs sm:text-sm">
                  <div className={`flex items-center gap-3 sm:gap-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span>❤️ {post.likes.length}</span>
                    <span>💬 {post.commentCount || 0}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/post/${post._id}/edit`}
                      className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium no-underline transition-colors ${isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;