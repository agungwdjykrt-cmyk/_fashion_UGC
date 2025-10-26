import React, { useState, useCallback, useEffect } from 'react';
import { generateMarvellaImages } from './services/geminiService';
import type { FormState } from './types';
import { BRAND_TEXT_COLORS, BRAND_TEXT_LAYOUTS, THEMES, ASPECT_RATIOS } from './constants';
import SettingsPanel from './components/SettingsPanel';
import OutputDisplay from './components/OutputDisplay';
import Header from './components/Header';

const App: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    brand_text: 'ALERA',
    product_quantity: 1,
    brand_text_color: BRAND_TEXT_COLORS[0].value,
    brand_text_layout: BRAND_TEXT_LAYOUTS[0].value,
    theme: THEMES[0].value,
    aspect_ratio: ASPECT_RATIOS[0].value,
    reference_images: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<{
    images: string[];
    prompt: string;
  } | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'range' ? parseInt(value, 10) : value;
    setFormState((prevState) => ({ ...prevState, [name]: finalValue }));
  };

  const handleImagesChange = (base64Images: string[]) => {
    setFormState((prevState) => ({ ...prevState, reference_images: base64Images }));
  };

  const populateTemplate = (template: string, data: Record<string, string>): string => {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] || '');
  };

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    setIsPanelOpen(false);

    const selectedTheme = THEMES.find(t => t.value === formState.theme);
    if (!selectedTheme) {
        setError("Gaya sinematik yang dipilih tidak ditemukan. Silakan coba lagi.");
        setIsLoading(false);
        return;
    }
    
    const quantity = formState.product_quantity;
    const quantityText = quantity > 1 ? `${quantity} products` : `a single product`;
    const productDescription = formState.reference_images.length > 0 
      ? `${quantityText} based on the uploaded reference images` 
      : `${quantityText} (e.g., a luxury handbag)`;

    let sceneDescription = selectedTheme.description.replace(/the uploaded product reference/g, productDescription);

    const data = {
      brand_text: formState.brand_text,
      brand_text_color: formState.brand_text_color,
      brand_text_layout: formState.brand_text_layout,
    };
    
    const selectedAspectRatio = ASPECT_RATIOS.find(ar => ar.value === formState.aspect_ratio);
    const aspectRatioDescription = selectedAspectRatio ? selectedAspectRatio.value : "a square 1:1 aspect ratio";
    
    const promptTemplate = `Ultra-realistic cinematic photograph. The scene subtly incorporates the brand name '{{brand_text}}' as part of the environment, styled as {{brand_text_color}} elegant 3D letters. The text is positioned with a '{{brand_text_layout}}' layout, seamlessly blending with the background. The entire scene, including camera, lighting, and mood, is defined as follows: ${sceneDescription}. IMPORTANT: The final image must be in ${aspectRatioDescription}.`;
    
    const populatedPrompt = populateTemplate(promptTemplate, data);
    const finalPrompt = populatedPrompt.trim();
    
    try {
      const imageUrls = await generateMarvellaImages(finalPrompt, formState.reference_images);
      
      setGeneratedContent({
        images: imageUrls,
        prompt: finalPrompt,
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [formState]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onTogglePanel={() => setIsPanelOpen(!isPanelOpen)}
        onToggleTheme={toggleTheme}
        currentTheme={theme}
      />
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <OutputDisplay isLoading={isLoading} content={generatedContent} error={error} />
      </main>
      <footer className="w-full text-center py-6 border-t border-gray-200 dark:border-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">📞 @TITIKOMA | 0812-1398-7999</p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">© 2025 TITIKOMA Visual Systems — Fashion AI for Everyone</p>
      </footer>
      <SettingsPanel 
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        formState={formState}
        handleInputChange={handleInputChange}
        handleImagesChange={handleImagesChange}
        handleGenerate={handleGenerate}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;