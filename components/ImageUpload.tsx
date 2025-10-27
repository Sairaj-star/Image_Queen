
import React, { useCallback, useRef } from 'react';
import type { UploadedFile } from '../types';

interface ImageUploadProps {
  image: UploadedFile | null;
  onImageChange: (file: UploadedFile | null) => void;
  title: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ image, onImageChange, title }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (image?.previewUrl) {
        URL.revokeObjectURL(image.previewUrl);
      }
      onImageChange({
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  }, [image, onImageChange]);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (image?.previewUrl) {
      URL.revokeObjectURL(image.previewUrl);
    }
    onImageChange(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-300">{title}</h2>
        <div 
            className="relative w-full aspect-square bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-gray-700 transition-all duration-300 group overflow-hidden"
            onClick={handleClick}
        >
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            {image ? (
                <>
                    <img src={image.previewUrl} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                        <button
                            onClick={handleRemove}
                            className="absolute top-2 right-2 p-2 bg-black bg-opacity-60 rounded-full text-white hover:bg-red-600 transition-colors"
                            aria-label="Remove image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-400 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2">Click to upload</p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
                </div>
            )}
        </div>
    </div>
  );
};
