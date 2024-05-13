// LanguageSelector.tsx
import React, { useEffect, useRef, useState } from 'react';
import '../header/languageSelector.css'; // Make sure to create a corresponding CSS file for styling
import * as ABB from '@abb/abb-common-ux-react';
import '@abb/abb-common-ux-react/styles.css';

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void;
}

interface Language {
  code: string;
  name: string;
  label: string;
}

const languages: Language[] = [
  { code: 'EN', name: "english", label: 'English' },
  { code: 'FR', name: "french", label: 'Français' },
  { code: 'ES', name: "spanish", label: 'Español' },
  { code: 'DE', name: "german", label: 'Deutsch' },
  { code: 'IT', name: "italian", label: 'Italiano' },
  { code: 'JP', name: "japanese", label: '日本語'}
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const languageSelectorRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (language: Language): void => {
    onLanguageChange(language.name);
    setCurrentLanguage(language);
    setMenuOpen(false);  // Close the menu after selection
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (languageSelectorRef.current && !languageSelectorRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="language-selector" ref={languageSelectorRef}>
      <span className="language-code">{currentLanguage.code}</span>
      <ABB.Icon 
        className="language-icon"
        name="abb/globe" 
        sizeClass="medium" 
        onClick={() => setMenuOpen(!menuOpen)}
      />
      {menuOpen && (
        <div className="language-dropdown">
          {languages.map(lang => (
            <div
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={currentLanguage === lang ? "selected-language" : ""}
            >
              {lang.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

