//header.tsx
import React, { useState } from 'react';
import '../header/header.css'; // Make sure to create a corresponding CSS file for styling
import '@abb/abb-common-ux-react/styles.css';
import logoImage from '../../assets/abb.png';
import SelectLanguage from './selectLanguage';
import LeftPanel from '../leftPanel/leftPanel';
import Footer from 'component/footer/footer';
import Translator from 'component/translator/translate';
import LoginButton from 'component/authentication/LoginButton';

const Header: React.FC = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("english"); // Default language is English

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  const translate = Translator({ language: language });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  console.log({isMenuOpen});

  return (
    <div>
      <LeftPanel isMenuOpen={isMenuOpen} translate={translate}/>
      <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
        <button className="menu-toggle" onClick={toggleMenu}>
          <div className="menu-icon"/>
          <div className="menu-icon"/>
          <div className="menu-icon"/>          
        </button>
        <img src={logoImage} alt='Logo' className='logo-image'/>
        <h3 className='header-content'> {translate("translateData.header.product")} </h3>
        <SelectLanguage onLanguageChange={handleLanguageChange} />
      </header>
      <LoginButton /> 
      <Footer translate={translate}/>
    </div>
  );
}

export default Header;
