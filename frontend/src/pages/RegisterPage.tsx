import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockRegister } from '../api/mockAuth';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ 
    fullName: '', emailOrPhone: '', password: '', 
    state: '', subject: '', grade: '', schoolType: '' 
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token, user } = await mockRegister(formData);
      login(token, user);
      toast.success("Registration successful! Welcome to Shiksha Saathi.");
      navigate('/language-select');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-2xl card shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">Register as a Teacher</h2>
          <p className="text-sm text-gray-500 mt-2">Join 9.7M teachers on Shiksha Saathi</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email / Phone</label>
            <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md" value={formData.emailOrPhone} onChange={e => setFormData({...formData, emailOrPhone: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required className="w-full px-3 py-2 border border-gray-300 rounded-md" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select required className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})}>
              <option value="">Select State</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="UP">Uttar Pradesh</option>
              <option value="TamilNadu">Tamil Nadu</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School Type</label>
            <select required className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" value={formData.schoolType} onChange={e => setFormData({...formData, schoolType: e.target.value})}>
              <option value="">Select Type</option>
              <option value="Government">Government</option>
              <option value="Government-Aided">Government-Aided</option>
              <option value="KVS">KVS</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select required className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
              <option value="">Select Subject</option>
              <option value="Maths">Maths</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
            <select required className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})}>
              <option value="">Select Grade</option>
              <option value="1">Class 1</option>
              <option value="5">Class 5</option>
              <option value="8">Class 8</option>
              <option value="10">Class 10</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-2 mt-4">
            <button type="submit" disabled={loading} className="w-full btn-primary py-3 flex justify-center items-center text-lg">
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/signin" className="text-[var(--color-primary)] font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
