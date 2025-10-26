import React, { useState, useCallback } from 'react';
import { UploadIcon, XIcon } from './icons';

interface ImageUploadFieldProps {
  label: string;
  description: string;
  onImagesChange: (base64Images: string[]) => void;
  maxFiles?: number;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ label, description, onImagesChange, maxFiles = 6 }) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const newPreviews: string[] = [];
    const filesToProcess = Array.from(files).slice(0, maxFiles - previews.length);

    if (filesToProcess.length === 0) return;

    let processedCount = 0;

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        newPreviews.push(base64String);
        processedCount++;
        if (processedCount === filesToProcess.length) {
          const updatedPreviews = [...previews, ...newPreviews];
          setPreviews(updatedPreviews);
          onImagesChange(updatedPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  }, [onImagesChange, maxFiles, previews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = ''; // Reset input to allow re-uploading the same file
  };

  const handleRemoveImage = useCallback((indexToRemove: number) => {
    const updatedPreviews = previews.filter((_, index) => index !== indexToRemove);
    setPreviews(updatedPreviews);
    onImagesChange(updatedPreviews);
  }, [previews, onImagesChange]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
      <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">{description}</p>
      
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-2">
          {previews.map((src, index) => (
            <div key={index} className="relative group aspect-square">
              <img src={src} alt={`Pratinjau referensi ${index + 1}`} className="w-full h-full object-cover rounded-md border border-gray-300 dark:border-gray-600" />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Hapus gambar ${index + 1}`}
              >
                <XIcon />
              </button>
            </div>
          ))}
        </div>
      )}

      {previews.length < maxFiles && (
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <UploadIcon />
            <div className="flex text-sm text-gray-600 dark:text-gray-400">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Unggah file</span>
                <input 
                  id="file-upload" 
                  name="file-upload" 
                  type="file" 
                  className="sr-only" 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  multiple 
                />
              </label>
              <p className="pl-1">atau seret ke sini</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">{previews.length} / {maxFiles} gambar. PNG, JPG.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;