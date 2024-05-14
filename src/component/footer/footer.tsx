// Footer.tsx
import React from 'react';
import * as ABB from '@abb/abb-common-ux-react'
import './footer.css';

interface FooterProps {
  translate: (key: string) => string;
}

const Footer: React.FC<FooterProps> = ({ translate }) => {
  return (
    <footer className='footer'>
      <div className="footer-links">
        <a href="/concerns"> {translate("translateData.footer.raiseConcern")} </a>
        <a href="/contact"> {translate("translateData.footer.contactUs")} </a>
        <a href="/feedback"> {translate("translateData.footer.feedback")} </a>
        <a href="/terms"> {translate("translateData.footer.termsAndConditions")} </a>
      </div>
      <div className="copyRight"> {translate("translateData.footer.copyRight")} </div>
    </footer>
  );
}

export default Footer;

