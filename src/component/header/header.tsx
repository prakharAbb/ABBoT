//header.tsx
import React, { useState } from 'react';
import * as ABB from '@abb/abb-common-ux-react';
import '../header/header.css'; // Make sure to create a corresponding CSS file for styling
import '@abb/abb-common-ux-react/styles.css';
import logoImage from '../../assets/abb.png';
import LanguageSelector from './languageSelector';
import LeftPanel from '../leftPanel/leftPanel';
import Footer from 'component/footer/footer';
import { Translator } from 'component/translator/translator';

const Header: React.FC = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("english"); // Default language is English

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  console.log({isMenuOpen});

  return (
    <div>
      <LeftPanel isMenuOpen={isMenuOpen} language={language}/>
      <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
        <button className="menu-toggle" onClick={toggleMenu}>
          <div className="menu-icon"/>
          <div className="menu-icon"/>
          <div className="menu-icon"/>          
        </button>
        <img src={logoImage} alt='Logo' className='logo-image'/>
        <h3 className='header-content'> <Translator language={language} keyName="translateData.header.product" /> </h3>
        <LanguageSelector onLanguageChange={handleLanguageChange} />
      </header>
      <Footer language={language}/>
    </div>
  );
}

export default Header;
