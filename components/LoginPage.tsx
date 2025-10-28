
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (userData: { name: string; email: string }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onLogin({ name, email });
    }
  };

  const isButtonDisabled = !name || !email;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-purple-900/10">
        <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L12 8.88l-6.64-6.64a1.21 1.21 0 0 0-1.72 0L2.36 3.64a1.21 1.21 0 0 0 0 1.72L8.88 12l-6.52 6.52a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.21 1.21 0 0 0 1.72 0L12 15.12l6.64 6.64a1.21 1.21 0 0 0 1.72 0l1.28-1.28a1.21 1.21 0 0 0 0-1.72L15.12 12l6.52-6.52a1.21 1.21 0 0 0 0-1.72z" />
                </svg>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                Gemini Image Fusion
                </h1>
            </div>
            <p className="text-gray-400">Enter your details to begin your creative journey.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 placeholder-gray-400"
              placeholder="e.g., Ada Lovelace"
              aria-label="Full Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 placeholder-gray-400"
              placeholder="you@example.com"
              aria-label="Email Address"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isButtonDisabled}
              className="w-full mt-2 px-6 py-3 font-bold text-white rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transform hover:scale-105 disabled:transform-none"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
