import React from 'react';
import { MoonIcon, SunIcon, SettingsIcon } from './icons';

interface HeaderProps {
    onTogglePanel: () => void;
    onToggleTheme: () => void;
    currentTheme: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ onTogglePanel, onToggleTheme, currentTheme }) => {
    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-20 border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                          UGC FASHION <span className="text-gray-500 dark:text-gray-400 font-medium">- by TITIKOMA</span>
                        </h1>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                         <button
                            onClick={onToggleTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
                            aria-label="Ganti tema"
                        >
                            {currentTheme === 'light' ? <MoonIcon /> : <SunIcon />}
                        </button>
                         <button
                            onClick={onTogglePanel}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
                            aria-label="Buka pengaturan"
                        >
                            <SettingsIcon />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;