
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { ResultDisplay } from './components/ResultDisplay';
import { generateImage } from './services/geminiService';
import type { UploadedFile } from './types';
import { blobToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [image1, setImage1] = useState<UploadedFile | null>(null);
  const [image2, setImage2] = useState<UploadedFile | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!image1 || !image2 || !prompt) {
      setError('Please upload two images and provide a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const [base64Image1, base64Image2] = await Promise.all([
        blobToBase64(image1.file),
        blobToBase64(image2.file)
      ]);
      
      const generatedImgData = await generateImage(
        { data: base64Image1, mimeType: image1.file.type },
        { data: base64Image2, mimeType: image2.file.type },
        prompt
      );
      
      if (generatedImgData) {
        setResultImage(generatedImgData);
      } else {
        setError('The model did not return an image. Please try a different prompt.');
      }

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [image1, image2, prompt]);
  
  const isButtonDisabled = !image1 || !image2 || !prompt || isLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-1 flex justify-center">
            <ImageUpload image={image1} onImageChange={setImage1} title="First Photo" />
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6 items-center lg:pt-16 order-first lg:order-none">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what the two subjects should do..."
              className="w-full h-32 p-4 bg-gray-800 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 resize-none placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              onClick={handleGenerate}
              disabled={isButtonDisabled}
              className="w-full px-6 py-3 font-bold text-white rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-purple-600 to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transform hover:scale-105 disabled:transform-none"
            >
              {isLoading ? 'Generating...' : 'Generate Image'}
            </button>
          </div>

          <div className="lg:col-span-1 flex justify-center">
            <ImageUpload image={image2} onImageChange={setImage2} title="Second Photo" />
          </div>
        </div>

        <div className="mt-12">
           <ResultDisplay resultImage={resultImage} isLoading={isLoading} error={error} />
        </div>
      </main>
    </div>
  );
};

export default App;
