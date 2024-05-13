// Footer.tsx
import React from 'react';
import * as ABB from '@abb/abb-common-ux-react'
import './footer.css';
import { Translator } from 'component/translator/translator';

interface FooterProps {
  language: string;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className='footer'>
      <div className="footer-links">
        <a href="/concerns"> <Translator language={language} keyName="translateData.footer.raiseConcern" /> </a>
        <a href="/contact"> <Translator language={language} keyName="translateData.footer.contactUs" /> </a>
        <a href="/feedback"> <Translator language={language} keyName="translateData.footer.feedback" /> </a>
        <a href="/terms"> <Translator language={language} keyName="translateData.footer.termsAndConditions" /> </a>
      </div>
      <div className="copyRight"> <Translator language={language} keyName="translateData.footer.copyRight" /> </div>
    </footer>
  );
}

export default Footer;

