
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L12 8.88l-6.64-6.64a1.21 1.21 0 0 0-1.72 0L2.36 3.64a1.21 1.21 0 0 0 0 1.72L8.88 12l-6.52 6.52a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.21 1.21 0 0 0 1.72 0L12 15.12l6.64 6.64a1.21 1.21 0 0 0 1.72 0l1.28-1.28a1.21 1.21 0 0 0 0-1.72L15.12 12l6.52-6.52a1.21 1.21 0 0 0 0-1.72z" />
            </svg>
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            Gemini Image Fusion
            </h1>
        </div>
      </div>
    </header>
  );
};
