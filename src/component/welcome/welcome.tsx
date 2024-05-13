// WelcomeBox.tsx
import React from 'react';
import './welcome.css';
import { Translator } from 'component/translator/translator';

interface WelcomeBoxProps {
    language: string;
}

const WelcomeBox: React.FC<WelcomeBoxProps> = ({language}) => {
    return (
        <div className="welcomeBox">
            <span> <Translator language={language} keyName="translateData.welcome.greeting" /> </span>
            <p> <Translator language={language} keyName="translateData.welcome.clickDept" /> </p>
        </div>
    );
}

export default WelcomeBox;
