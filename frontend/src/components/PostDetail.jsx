import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { postsAPI, commentsAPI } from '../services/api';
import { useTheme } from '../ThemeContext';
import { useAuth } from '../AuthContext';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const { isDark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await postsAPI.getById(id);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentsAPI.getByPost(id);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await postsAPI.like(id);
      setPost(response.data);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await commentsAPI.create({ content: newComment, post: id });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsAPI.delete(id);
        navigate('/');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const isOwner = user && post && user._id === post.author._id;

  if (loading) return <div className={`text-center py-10 text-lg ${isDark ? 'text-white' : 'text-black'}`}>Loading post...</div>;
  if (!post) return <div className={`text-center py-10 text-lg ${isDark ? 'text-white' : 'text-black'}`}>Post not found</div>;

  return (
    <div className={`rounded-xl p-6 shadow-lg mb-10 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <h1 className={`mb-4 text-2xl sm:text-3xl lg:text-4xl ${isDark ? 'text-white' : 'text-black'}`}>{post.title}</h1>
      <p className={`mb-5 text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>By {post.author.username}</p>
      {post.image && (
        <img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt={post.title}
          className="w-full max-w-lg h-64 object-cover rounded-lg mb-5 mx-auto block"
        />
      )}
      <p className={`text-lg leading-relaxed mb-5 ${isDark ? 'text-white' : 'text-black'}`}>{post.content}</p>
      <p className={`px-4 py-2 rounded-2xl inline-block mb-5 ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>🏷️ {post.tags.join(', ')}</p>
      {token && <button className="bg-gradient-to-r from-purple-500 to-blue-400 text-white border-none px-6 py-3 rounded-3xl text-lg font-semibold cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg mb-4" onClick={handleLike}>❤️ Like ({post.likes.length})</button>}

      {isOwner && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <Link to={`/post/${id}/edit`} className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none px-4 sm:px-6 py-3 rounded-3xl text-base sm:text-lg font-semibold cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg no-underline text-center`}>Edit Post</Link>
          <button onClick={handleDelete} className={`bg-gradient-to-r from-red-500 to-red-600 text-white border-none px-4 sm:px-6 py-3 rounded-3xl text-base sm:text-lg font-semibold cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg`}>Delete Post</button>
        </div>
      )}

      <div className="comments-section">
        <h2 className={`mb-5 text-2xl ${isDark ? 'text-white' : 'text-black'}`}>Comments</h2>
        {comments.map(comment => (
          <div key={comment._id} className={`rounded-lg p-4 mb-4 border-l-4 ${isDark ? 'bg-gray-700 border-blue-400' : 'bg-gray-50 border-blue-500'}`}>
            <p className={`mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{comment.content}</p>
            <small className={`italic ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>By {comment.author.username}</small>
          </div>
        ))}

        {token ? (
          <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              required
              className={`p-4 border-2 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:ring-0 ${isDark ? 'border-gray-600 focus:border-blue-400' : 'border-gray-200 focus:border-blue-500'}`}
            />
            <button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-none px-4 py-3 rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg self-start">Post Comment</button>
          </form>
        ) : (
          <p className={`${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Please <Link to="/login" className={`no-underline font-medium hover:underline ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>login</Link> to comment.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;