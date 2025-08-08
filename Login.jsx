// components/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

// Auth Context
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('ownerAuth') === 'true'
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('ownerUser') || 'null')
  );

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('ownerAuth', 'true');
    localStorage.setItem('ownerUser', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('ownerAuth');
    localStorage.removeItem('ownerUser');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Login />;
  }
  return children;
};

// Login Component
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Load from environment
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || process.env.REACT_APP_ADMIN_EMAIL;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || process.env.REACT_APP_ADMIN_PASSWORD;
  const adminName = import.meta.env.VITE_ADMIN_NAME || process.env.REACT_APP_ADMIN_NAME;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const isValid =
        formData.email === adminEmail && formData.password === adminPassword;

      if (isValid) {
        login({
          email: adminEmail,
          name: adminName,
          role: 'owner',
          image: assets.user_profile,
        });
        navigate('/owner');
      } else {
        setError('Invalid email or password. Please try again.');
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <div className="text-center mb-6">
          <img src={assets.logo} alt="Logo" className="h-12 w-auto mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Welcome back</h2>
          <p className="text-gray-600 mt-2">Sign in to access your owner dashboard</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-500/30 outline-none rounded-full py-2.5 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Enter your email"
              required
            />
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-gray-500/30 outline-none rounded-full py-2.5 px-4 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <img
                  src={showPassword ? assets.eye_close_icon : assets.eye_icon}
                  alt="toggle password"
                  className="w-4 h-4 opacity-60 hover:opacity-100"
                />
              </button>
            </div>
          </div>

          <div className="text-right py-4">
            <a href="#" className="text-blue-600 underline hover:text-blue-800 transition">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 py-2.5 rounded-full text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </>
            ) : (
              'Log in'
            )}
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{' '}
          <a href="#" className="text-blue-500 underline hover:text-blue-700 transition">
            Contact Admin
          </a>
        </p>

        {/* Optional Social Logins (non-functional) */}
        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center mt-5 bg-black hover:bg-gray-800 py-2.5 rounded-full text-white transition"
        >
          <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="Apple Logo" />
          Log in with Apple
        </button>

        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 hover:bg-gray-50 py-2.5 rounded-full text-gray-800 transition"
        >
          <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="Google Logo" />
          Log in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
