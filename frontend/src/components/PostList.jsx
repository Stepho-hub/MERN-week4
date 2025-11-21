import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useTheme } from '../ThemeContext';
import { useAuth } from '../AuthContext';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.getAll();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsAPI.delete(postId);
        setPosts(posts.filter(post => post._id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mb-4 ${isDark ? 'border-indigo-400' : 'border-indigo-600'}`}></div>
      <p className={`text-lg ${isDark ? 'text-white' : 'text-black'}`}>Loading posts...</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className={`w-full mb-6 sm:mb-10 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center uppercase tracking-wide ${isDark ? 'text-white' : 'text-black'}`}>
        Blog Posts
        <span className={`block w-24 h-1 bg-gradient-to-r mx-auto mt-4 rounded-full ${isDark ? 'from-indigo-400 to-purple-500' : 'from-indigo-500 to-purple-600'}`}></span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post._id} className={`rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border flex flex-col overflow-hidden group ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            {post.image && (
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            )}
            <div className="flex-1">
              <h2 className={`mb-2 text-xl font-bold leading-tight ${isDark ? 'text-white' : 'text-black'}`}><Link to={`/post/${post._id}`} className={`transition-colors duration-200 ${isDark ? 'hover:text-indigo-400' : 'hover:text-indigo-500'}`}>{post.title}</Link></h2>
              <p className={`font-semibold mb-2 text-sm ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`}>By {post.author.username}</p>
              <p className={`mb-4 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>{post.content.substring(0, 120)}...</p>
            </div>
            <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t gap-3 sm:gap-0 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className={`flex items-center gap-1 font-medium text-sm ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                <span className="text-lg">❤️</span> {post.likes.length}
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3">
                {user && user._id === post.author._id && (
                  <>
                    <Link
                      to={`/post/${post._id}/edit`}
                      className={`text-sm font-medium transition-colors duration-200 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                      title="Edit post"
                      onClick={(e) => e.stopPropagation()}
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(post._id);
                      }}
                      className={`text-sm font-medium transition-colors duration-200 ${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
                      title="Delete post"
                    >
                      🗑️
                    </button>
                  </>
                )}
                <Link to={`/post/${post._id}`} className={`flex items-center gap-1 font-medium text-sm transition-colors duration-200 ${isDark ? 'text-indigo-400 hover:text-indigo-200' : 'text-indigo-700 hover:text-indigo-900'}`}>
                  <span className="text-lg">💬</span> {post.commentCount || 0}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;