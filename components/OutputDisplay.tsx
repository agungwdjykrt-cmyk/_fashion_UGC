import React from 'react';
import { DownloadIcon, ImageIcon, SettingsIcon } from './icons';

interface OutputDisplayProps {
  isLoading: boolean;
  content: {
    images: string[];
    prompt: string;
  } | null;
  error: string | null;
}

const OutputPlaceholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center py-10">
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">UGC FASHION - by TITIKOMA</h2>
            <p className="text-base text-gray-500 dark:text-gray-400 mt-1">AI Visual Tool untuk Katalog UMKM Fashion.</p>
        </div>
        <div className="p-6 bg-gray-200 dark:bg-gray-800 rounded-full mb-6">
            <ImageIcon />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">4 gambar sinematik Anda akan muncul di sini</h3>
        <p className="text-base text-gray-500 dark:text-gray-400 mt-2 mb-4 flex items-center justify-center">
            Klik ikon pengaturan <SettingsIcon /> di pojok kanan atas untuk memulai.
        </p>
        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
          <p>⚡ Cukup satu klik!!</p>
          <p>🧾 Solusi katalog cepat untuk semua UMKM fashion.</p>
        </div>
    </div>
);

const LoadingState: React.FC = () => (
    <div className="max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-2 gap-4">
            {Array(4).fill(0).map((_, i) => (
                <div key={i} className="w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse"></div>
            ))}
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-6 text-sm font-medium animate-pulse text-center">Mempersiapkan keajaiban visual...</p>
    </div>
);

const OutputDisplay: React.FC<OutputDisplayProps> = ({ isLoading, content, error }) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <div className="max-w-2xl mx-auto mt-4 text-center text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20 p-4 rounded-lg border border-red-300 dark:border-red-500/30">{error}</div>
  }

  if (!content || content.images.length === 0) {
    return <OutputPlaceholder />;
  }
  
  const handleDownload = (imageUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ugc_fashion_${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="grid grid-cols-2 gap-4">
        {content.images.map((image, index) => (
          <div key={index} className="relative group aspect-square">
            <img src={image} alt={`Generated image ${index + 1}`} className="w-full h-full object-cover rounded-xl shadow-lg border border-gray-200 dark:border-gray-700" />
            <button
                onClick={() => handleDownload(image, index)}
                title="Unduh Gambar"
                className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-white"
            >
                <DownloadIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutputDisplay;