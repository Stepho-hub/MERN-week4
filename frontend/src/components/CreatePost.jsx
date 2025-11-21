import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: '', content: '', tags: '' });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

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

      await postsAPI.create(formDataToSend);
      navigate('/');
    } catch {
      setError('Failed to create post');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg max-w-2xl mx-auto mb-10">
      <h2 className="text-black dark:text-white text-center mb-8 text-3xl">Create New Post</h2>
      {error && <p className="text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border-l-4 border-red-500 dark:border-red-400 mb-5">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
          className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 resize-vertical"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/20 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800/30"
        />
        <button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-none px-4 py-3 rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg mt-3">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;