// WelcomeBox.tsx
import React from 'react';
import 'component/welcome/welcome.css';

interface WelcomeBoxProps {
    translate: (key: string) => string;
}

const WelcomeBox: React.FC<WelcomeBoxProps> = ({ translate }) => {
    return (
        <div className="welcomeBox">
            <span> {translate("translateData.welcome.greeting")} </span>
            <p> {translate("translateData.welcome.clickDept")} </p>
        </div>
    );
}

export default WelcomeBox;
