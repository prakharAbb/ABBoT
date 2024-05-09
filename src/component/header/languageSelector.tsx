// import React, { useEffect, useRef, useState } from 'react';
// import '../header/languageSelector.css'; // Make sure to create a corresponding CSS file for styling
// import * as ABB from '@abb/abb-common-ux-react';
// import '@abb/abb-common-ux-react/styles.css';

// interface Language {
//   code: string;
//   label: string;
// }

// const languages: Language[] = [
//   { code: 'EN', label: 'English' },
//   { code: 'FR', label: 'Français' },
//   { code: 'ES', label: 'Español' },
//   { code: 'DE', label: 'Deutsch' },
//   { code: 'IT', label: 'Italiano' },
//   { code: 'JP', label: '日本語'}
// ];

// const LanguageSelector: React.FC = () => {
//   const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
//   const [menuOpen, setMenuOpen] = useState<boolean>(false);
//   const languageSelectorRef = useRef<HTMLDivElement>(null);


//   const handleLanguageChange = (language: Language): void => {
//     setCurrentLanguage(language);
//     setMenuOpen(false);  // Close the menu after selection
//   };

//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       if (languageSelectorRef.current && !languageSelectorRef.current.contains(event.target as Node)) {
//         setMenuOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleOutsideClick);

//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, []);

//     return (
//         <div className="language-selector" ref={languageSelectorRef}>
//             <span className="language-code">{currentLanguage.code}</span>
            // <ABB.Icon 
            // className="language-icon"
            // name="abb/globe" 
            // sizeClass="medium" 
            // onClick={() => setMenuOpen(!menuOpen)}
            // />
//             {menuOpen && (
//             <ABB.Menu 
//                 className="language-dropdown"   
//                 isOpen={menuOpen} 
//                 onClick={() => setMenuOpen(false)}
//                 onSelect={({ id }) => handleLanguageChange(languages.find(lang => lang.code === id)!)}
//             >
//                 {languages.map(lang => (
//                     <ABB.MenuItem 
//                         key={lang.code} 
//                         itemId={lang.code} 
//                         text={lang.label} 
//                         onSelect={() => handleLanguageChange(lang)}
//                     />
//                 ))}
//             </ABB.Menu>
//             )}
//         </div>
//   );
// };

// export default LanguageSelector;


// LanguageSelector.tsx
import React, { useEffect, useRef, useState } from 'react';
import '../header/languageSelector.css'; // Make sure to create a corresponding CSS file for styling
import * as ABB from '@abb/abb-common-ux-react';
import '@abb/abb-common-ux-react/styles.css';

interface Language {
  code: string;
  label: string;
}

const languages: Language[] = [
  { code: 'EN', label: 'English' },
  { code: 'FR', label: 'Français' },
  { code: 'ES', label: 'Español' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'IT', label: 'Italiano' },
  { code: 'JP', label: '日本語'}
];

const LanguageSelector: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const languageSelectorRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (language: Language): void => {
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

