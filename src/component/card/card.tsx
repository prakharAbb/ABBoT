// Card.tsx
import React, { useEffect, useState } from 'react';
import './card.css'; // Create corresponding CSS file for styling
import * as ABB from "@abb/abb-common-ux-react"
import BrowseFile from 'component/browse/browse';
import WelcomeBox from 'component/welcome/welcome';

interface Props {
    onRefreshBrowseAndChat: boolean;
}

const Cards: React.FC<Props> = ({onRefreshBrowseAndChat}) => {
    const [isBrowseOpen, setIsBrowseOpen] = useState<boolean>(false);
    const [isCardClicked , setIsCardClicked] = useState<number | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

    const handleCategory = (cardIndex: number, department: string) => {
        setIsCardClicked(cardIndex);
        setSelectedDepartment(department);
        setIsBrowseOpen(true);
    };

    useEffect(() => {
        setIsCardClicked(null);
        setIsBrowseOpen(false);
    }, [onRefreshBrowseAndChat]);

    return (
        <div>                        
            {isBrowseOpen && (
                <h1 className="title">
                    How can I help you today ?
                </h1>
            )}

            <div className="cardMenu">
                <div 
                    className={`card ${isCardClicked === 0 ? "clicked" : ""}`}
                    onClick={() => handleCategory(0, "Commercial")}
                >
                    <ABB.Icon 
                        className="icon"
                        name="abb/object" 
                        sizeClass="medium"
                    /> 
                    <h1> Commercial </h1>
                    <span>Specifies commercial terms</span>
                </div>

                <div 
                    className={`card ${isCardClicked === 1 ? "clicked" : ""}`}
                    onClick={() => handleCategory(1, "Technical")}
                >
                    <ABB.Icon 
                        className="icon"
                        name="abb/robot-cabinet" 
                        sizeClass="medium"
                    /> 
                    <h1>Technical</h1>
                    <span>Defines scope of supply & solution aspects</span>
                </div>
                
                <div 
                    className={`card ${isCardClicked === 2 ? "clicked" : ""}`}
                    onClick={() => handleCategory(2, "Contract")}
                >
                    <ABB.Icon 
                        className="icon"
                        name="abb/reports" 
                        sizeClass="medium"
                    /> 
                    <h1>Contract</h1>
                    <span>Outlines Terms and Conditions</span>
                </div>
                
                <div 
                    className={`card ${isCardClicked === 3 ? "clicked" : ""}`}
                    onClick={() => handleCategory(3, "Procurement")}
                >
                    <ABB.Icon 
                        className="icon"
                        name="abb/hierarchy" 
                        sizeClass="medium"
                    /> 
                    <h1>Procurement</h1>
                    <span>Document Summarization, Supplier negotiations</span>
                </div>        
                
                <div 
                    className={`card ${isCardClicked === 4 ? "clicked" : ""}`}
                    onClick={() => handleCategory(4, "Others")}
                >
                    <ABB.Icon 
                        className="icon"
                        name="abb/settings" 
                        sizeClass="medium"
                    /> 
                    <h1>Others</h1>
                    <span>Document Intelligence (eg. Engineering, Others)</span>
                </div>
            </div>

            {!isBrowseOpen && <WelcomeBox />}
            
            {isBrowseOpen && <BrowseFile selectedDepartment={selectedDepartment}/>} 

        </div>
    );
}

export default Cards;
