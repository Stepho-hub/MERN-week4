import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useTheme } from '../ThemeContext';

const EditPost = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', content: '', tags: '' });
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    fetchPost();
  }, [navigate, id]);

  const fetchPost = async () => {
    try {
      const response = await postsAPI.getById(id);
      const post = response.data;
      setFormData({
        title: post.title,
        content: post.content,
        tags: post.tags.join(', ')
      });
      setCurrentImage(post.image);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('tags', formData.tags);
      if (image) {
        formDataToSend.append('image', image);
      }

      await postsAPI.update(id, formDataToSend);
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post');
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mb-4 ${isDark ? 'border-indigo-400' : 'border-indigo-600'}`}></div>
      <p className={`text-lg ${isDark ? 'text-white' : 'text-black'}`}>Loading post...</p>
    </div>
  );

  return (
    <div className={`p-10 rounded-xl shadow-lg max-w-2xl mx-auto mb-10 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-center mb-8 text-3xl ${isDark ? 'text-white' : 'text-black'}`}>Edit Post</h2>
      {error && <p className={`p-3 rounded-lg border-l-4 mb-5 ${isDark ? 'text-red-400 bg-red-900/20 border-red-400' : 'text-red-500 bg-red-50 border-red-500'}`}>{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className={`p-4 border-2 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:ring-0 ${isDark ? 'border-gray-600 focus:border-blue-400' : 'border-gray-200 focus:border-blue-500'}`}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
          className={`p-4 border-2 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:ring-0 resize-vertical ${isDark ? 'border-gray-600 focus:border-blue-400' : 'border-gray-200 focus:border-blue-500'}`}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className={`p-4 border-2 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:ring-0 ${isDark ? 'border-gray-600 focus:border-blue-400' : 'border-gray-200 focus:border-blue-500'}`}
        />
        {currentImage && (
          <div className="mb-4">
            <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Current Image:</p>
            <img
              src={`http://localhost:5000/uploads/${currentImage}`}
              alt="Current"
              className="w-full max-w-xs h-32 object-cover rounded-lg"
            />
          </div>
        )}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className={`p-4 border-2 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:ring-0 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold ${isDark ? 'border-gray-600 focus:border-blue-400 file:bg-blue-900/20 file:text-blue-300 hover:file:bg-blue-800/30' : 'border-gray-200 focus:border-blue-500 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'}`}
        />
        <div className="flex gap-4">
          <button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-none px-4 py-3 rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg flex-1">Update Post</button>
          <button type="button" onClick={() => navigate(`/post/${id}`)} className={`border-2 px-4 py-3 rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg flex-1 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;