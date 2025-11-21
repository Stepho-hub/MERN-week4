import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { authAPI } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.register(formData);
       login(response.data.token, response.data.user);
       navigate('/');
     } catch {
       setError('Registration failed');
     }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg max-w-md mx-auto mb-10">
      <h2 className="text-black dark:text-white text-center mb-8 text-3xl">Register</h2>
      {error && <p className="text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border-l-4 border-red-500 dark:border-red-400 mb-5">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0"
        />
        <button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-none px-4 py-3 rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg mt-3">Register</button>
      </form>
      <div className="text-center mt-5">
        <p>Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 no-underline font-medium hover:underline">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;