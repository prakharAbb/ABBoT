// Footer.tsx
import React from 'react';
import * as ABB from '@abb/abb-common-ux-react'
import './footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-links">
        <a href="/concerns">Raise Concerns</a>
        <a href="/contact">Contact Us</a>
        <a href="/feedback">Feedback</a>
        <a href="/terms">Terms & Conditions</a>
      </div>
      <div className="copyRight">© 2024 ABB</div>
    </footer>
  );
}

export default Footer;

