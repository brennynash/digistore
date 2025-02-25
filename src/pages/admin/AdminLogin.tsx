import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertCircle } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { useAuth } from '../../hooks/useAuth';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-black grid-pattern flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
          <p className="text-white/60 mt-2">Secure authentication required</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 text-red-400 flex items-center gap-2">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full glass-effect text-white font-medium py-3 rounded-lg
              flex items-center justify-center gap-2
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}
            `}
          >
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </GlassCard>
    </div>
  );
};