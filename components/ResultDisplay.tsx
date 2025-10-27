
import React from 'react';

interface ResultDisplayProps {
  resultImage: string | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg font-semibold text-gray-300">Your vision is being created...</p>
        <p className="text-sm text-gray-400">This may take a moment.</p>
    </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultImage, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return (
        <div className="text-center text-red-400 bg-red-900/50 border border-red-500 p-4 rounded-lg">
          <p className="font-bold">An error occurred:</p>
          <p>{error}</p>
        </div>
      );
    }
    if (resultImage) {
      return (
        <div className="w-full max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Generated Result</h2>
            <img 
                src={`data:image/png;base64,${resultImage}`} 
                alt="Generated result" 
                className="w-full h-auto object-contain rounded-xl shadow-lg shadow-purple-900/20" 
            />
        </div>
      );
    }
    return (
        <div className="text-center text-gray-500">
            <p>Upload two images and provide a prompt to see the magic happen here!</p>
        </div>
    );
  };
  
  return (
    <div className="w-full min-h-[400px] bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl p-8 flex items-center justify-center">
        {renderContent()}
    </div>
  );
};
