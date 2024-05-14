// Card.tsx
import React, { useEffect, useState } from 'react';
import './card.css'; // Create corresponding CSS file for styling
import * as ABB from "@abb/abb-common-ux-react"
import BrowseFile from 'component/browse/browse';
import WelcomeBox from 'component/welcome/welcome';

interface CardsProps {
    onRefreshBrowseAndChat: boolean;
    translate: (key: string) => string;
}

interface CardInfo {
    department: string;
    iconName: string;
}

const cardData: CardInfo[] = [
    { department: "commercial", iconName:"abb/object" },
    { department: "technical", iconName:"abb/robot-cabinet" },
    { department: "contract", iconName:"abb/reports" },
    { department: "procurement", iconName:"abb/hierarchy" },
    { department: "others", iconName:"abb/settings" }
];

const Cards: React.FC<CardsProps> = ({onRefreshBrowseAndChat, translate}) => {
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
                    {translate("translateData.howCanIHelp")}
                </h1>
            )}

            <div className="cardMenu">
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className={`card ${isCardClicked === index ? "clicked" : ""}`}
                        onClick={() => handleCategory(index, card.department)}
                    >
                        <ABB.Icon
                            className="icon"
                            name={card.iconName}
                            sizeClass="medium"
                        />
                        <h1> {translate(`translateData.cards.title.${card.department}`)} </h1>
                        <span> {translate(`translateData.cards.description.${card.department}`)} </span>
                    </div>
                ))}
            </div>

            {!isBrowseOpen && <WelcomeBox translate={translate} />}
            
            {isBrowseOpen && <BrowseFile selectedDepartment={selectedDepartment} translate={translate} />} 

        </div>
    );
}

export default Cards;
