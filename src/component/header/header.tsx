//header.tsx
import React, { useState } from 'react';
import * as ABB from '@abb/abb-common-ux-react';
import '../header/header.css'; // Make sure to create a corresponding CSS file for styling
import '@abb/abb-common-ux-react/styles.css';
import logoImage from '../../assets/abb.png';
import LanguageSelector from './languageSelector';
import LeftPanel from '../leftPanel/leftPanel';

const Header: React.FC = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  console.log({isMenuOpen});

  return (
    <div>
      <LeftPanel isMenuOpen={isMenuOpen} />
      <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
        <button className="menu-toggle" onClick={toggleMenu}>
          <div className="menu-icon"/>
          <div className="menu-icon"/>
          <div className="menu-icon"/>          
        </button>
        <img src={logoImage} alt='Logo' className='logo-image'/>
        <h3 className='header-content'> PAEN ABBoT </h3>
        <LanguageSelector/>
      </header>
    </div>
  );
}

export default Header;

// const Header: React.FC = () => {
//   return (
//     <div className="header-container">
//         <ABB.AppHeader>
//             <ABB.Link href='/'>
//                 <img src={logoImage} alt='Logo' className='logo-image'/>
//             </ABB.Link>
//             <div className="logo-info">
//                 <span>|</span>
//                 <span>PAEN ABBoT</span>
//             </div>
//             <LanguageSelector/>
//         </ABB.AppHeader>
//     </div>
//   );
// };

// export default Header;
