import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate('/chat');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            create a new account
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          label="Email address"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
        >
          Sign in
        </Button>
      </form>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Demo: Use any email and password to sign in
      </div>
    </div>
  );
};