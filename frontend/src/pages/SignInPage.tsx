import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { mockLogin } from '../api/mockAuth';
import toast from 'react-hot-toast';

const SignInPage = () => {
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token, user } = await mockLogin(formData.emailOrPhone, formData.password);
      login(token, user);
      toast.success("Login successful!");
      
      if (!localStorage.getItem('shiksha_language_selected')) {
        navigate('/language-select');
      } else {
        navigate('/dashboard/timeline');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex gap-6 px-4 py-12 bg-gray-50">
      {/* Demo Credentials Info */}
      <div className="hidden lg:flex lg:w-1/3 flex-col gap-6">
        <div className="card shadow-lg border border-gray-100 bg-green-50 border-green-200 p-6 rounded-lg h-fit sticky top-20">
          <h3 className="text-lg font-bold text-green-900 mb-4">🎯 Quick Demo Access</h3>
          
          <div className="space-y-3 mb-4">
            <div className="bg-white rounded p-3 border border-green-200">
              <p className="text-xs text-gray-500 font-semibold mb-1">Phone Number</p>
              <p className="text-sm font-mono text-gray-800">+91 9876543210</p>
            </div>
            
            <div className="bg-white rounded p-3 border border-green-200">
              <p className="text-xs text-gray-500 font-semibold mb-1">Password</p>
              <p className="text-sm font-mono text-gray-800">password123</p>
            </div>
          </div>

          <div className="border-t border-green-200 pt-3 mb-3">
            <p className="text-xs text-gray-500 font-semibold mb-2">Or try email:</p>
            <p className="text-xs font-mono text-gray-700">teacher@example.com</p>
            <p className="text-xs font-mono text-gray-700">password123</p>
          </div>

          <button
            type="button"
            onClick={() => setFormData({ emailOrPhone: '+91 9876543210', password: 'password123' })}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded font-medium py-2 transition-colors text-sm"
          >
            Fill Demo Credentials
          </button>
        </div>
      </div>

      <div className="w-full lg:w-2/3 max-w-md card shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">Sign In</h2>
          <p className="text-sm text-gray-500 mt-2">Welcome back to Shiksha Saathi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number or Email</label>
            <input 
              type="text" 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              value={formData.emailOrPhone}
              onChange={(e) => setFormData({...formData, emailOrPhone: e.target.value})}
              placeholder="e.g. +91 9876543210"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-sm text-[var(--color-primary)] hover:underline">Forgot Password?</a>
            </div>
            <input 
              type="password" 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary py-2.5 flex justify-center items-center"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <div className="h-px bg-gray-300 flex-grow"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="h-px bg-gray-300 flex-grow"></div>
        </div>

        <div className="mt-6 space-y-3">
          <button type="button" className="w-full btn-outline flex justify-center items-center gap-2 py-2.5 bg-white">
            Sign in with Google
          </button>
          <button type="button" className="w-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] rounded-md font-medium flex justify-center items-center gap-2 py-2.5 hover:bg-orange-50 transition-colors">
            Sign in with DIKSHA
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <div className="h-px bg-gray-300 flex-grow"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="h-px bg-gray-300 flex-grow"></div>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormData({ emailOrPhone: '+91 9876543210', password: 'password123' });
            toast.success("Demo credentials filled! Click Sign In to continue.");
          }}
          className="mt-2 w-full border border-[var(--color-accent)] text-[var(--color-accent)] rounded-md font-medium py-2 text-sm flex justify-center items-center gap-2 hover:bg-orange-50 transition-colors"
        >
          🎯 Fill Demo Credentials
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-[var(--color-accent)] font-medium hover:underline">Register</Link>
        </p>

        <div className="lg:hidden mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-green-900 mb-3">🎯 Quick Demo Access</p>
          <p className="text-xs text-gray-700 mb-2"><strong>Phone:</strong> +91 9876543210</p>
          <p className="text-xs text-gray-700 mb-3"><strong>Password:</strong> password123</p>
          <button
            type="button"
            onClick={() => setFormData({ emailOrPhone: '+91 9876543210', password: 'password123' })}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded font-medium py-2 text-sm transition-colors"
          >
            Fill & Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
