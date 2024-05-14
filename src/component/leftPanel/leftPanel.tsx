//leftPanel.tsx
import React, { useState } from 'react';
import * as ABB from '@abb/abb-common-ux-react'
import 'component/leftPanel/leftPanel.css'
import Card from 'component/card/card';

interface LeftPanelProps{
  isMenuOpen?: boolean;
  translate: (key: string) => string;  
}

const LeftPanel: React.FC<LeftPanelProps> = ({ isMenuOpen, translate }) => {

  const [isBrowseAndChatOpen, setIsBrowseAndChatOpen] = useState<boolean>(true);
  
  const refreshBrowseAndChat = () => {
    setIsBrowseAndChatOpen(!isBrowseAndChatOpen);
    // window.location.reload(); // Refresh the webpage
  };

  return (
    <div> 
      <div className={`leftPanel ${isMenuOpen ? "open" : ""}`}>
        <button className="refreshPageButton" onClick={refreshBrowseAndChat}>
          <ABB.Icon className="chatIcon" name="abb/chat" sizeClass="medium"/> 
          {translate("translateData.leftPanel.newChat")}
        </button>

        <span className="downloadCenterText"> 
          <ABB.Icon className="downloadIcon" name="abb/download" sizeClass="medium"/> 
          {translate("translateData.leftPanel.downloadCenter")}
        </span>
        
        <div className="downloadSummaryMenu">
          <button> {translate("translateData.leftPanel.downloadSummary.commercialSummary")} </button>
          <button> {translate("translateData.leftPanel.downloadSummary.technicalSummary")} </button>
          <button> {translate("translateData.leftPanel.downloadSummary.contractSummary")} </button>
          <button> {translate("translateData.leftPanel.downloadSummary.procurementSummary")} </button>
          <button> {translate("translateData.leftPanel.downloadSummary.otherSummary")} </button>
        </div>
      </div>

      <Card onRefreshBrowseAndChat={isBrowseAndChatOpen} translate={translate}/>

    </div>
  );
}

export default LeftPanel;
