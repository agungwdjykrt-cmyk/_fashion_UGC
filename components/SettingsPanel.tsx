import React from 'react';
import type { FormState } from '../types';
import { BRAND_TEXT_COLORS, BRAND_TEXT_LAYOUTS, THEMES, ASPECT_RATIOS } from '../constants';
import FormField from './FormField';
import SelectField from './SelectField';
import ImageUploadField from './ImageUploadField';
import RangeField from './RangeField';
import { GenerateIcon, XIcon } from './icons';

interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
    formState: FormState;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleImagesChange: (base64Images: string[]) => void;
    handleGenerate: () => void;
    isLoading: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
    isOpen,
    onClose,
    formState,
    handleInputChange,
    handleImagesChange,
    handleGenerate,
    isLoading
}) => {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="settings-panel-title"
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 id="settings-panel-title" className="text-lg font-semibold text-gray-900 dark:text-white">Pengaturan</h2>
                        <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Tutup pengaturan">
                            <XIcon />
                        </button>
                    </div>

                    {/* Form Fields */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <FormField
                            label="Teks Merek di Latar"
                            name="brand_text"
                            value={formState.brand_text}
                            onChange={handleInputChange}
                            placeholder="Contoh: ALERA"
                        />
                         <RangeField
                            label="Jumlah Produk"
                            name="product_quantity"
                            value={formState.product_quantity}
                            onChange={handleInputChange}
                            min={1}
                            max={6}
                        />
                        <SelectField
                            label="Warna Teks Merek"
                            name="brand_text_color"
                            value={formState.brand_text_color}
                            onChange={handleInputChange}
                            options={BRAND_TEXT_COLORS}
                        />
                        <SelectField
                            label="Tata Letak Teks Merek"
                            name="brand_text_layout"
                            value={formState.brand_text_layout}
                            onChange={handleInputChange}
                            options={BRAND_TEXT_LAYOUTS}
                        />
                        <SelectField
                            label="Gaya Sinematik"
                            name="theme"
                            value={formState.theme}
                            onChange={handleInputChange}
                            options={THEMES.map(t => ({ label: t.label, value: t.value }))}
                        />
                        <SelectField
                            label="Rasio Aspek"
                            name="aspect_ratio"
                            value={formState.aspect_ratio}
                            onChange={handleInputChange}
                            options={ASPECT_RATIOS}
                        />
                        <ImageUploadField
                            label="Gambar Referensi (Maks. 6)"
                            description="Membantu AI memahami produk & pencahayaan."
                            onImagesChange={handleImagesChange}
                        />
                    </div>

                    {/* Footer / Action Button */}
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-all duration-200 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Membuat...
                                </>
                            ) : (
                                <>
                                    <GenerateIcon />
                                    Buat 4 Gambar
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsPanel;