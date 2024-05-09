// import React, { useState, useEffect } from "react";
// import { LanguageTranslatorProvider } from "../languageTranslator/languageTranslator";
// import "../sideBar/leftPanel.css";
// import * as ABB from '@abb/abb-common-ux-react';
// import APiCallbackend from "./download";

// interface LeftPanelProps {
//   vectorStoreName: string | null;
//   language: string;
// }

// const excelTypes = {
//   commercialExcel: "commercialExcel",
//   technicalExcel: "technicalExcel",
//   contractExcel: "contractExcel",
//   procurementExcel:"procurement",
//   generalExcel: "generalExcel"
// };

// function LeftPanel({
//   vectorStoreName,
//   language,
// }: LeftPanelProps) {
//   const [isDownloading, setIsDownloading] = useState(false);

//   useEffect(() => {

//     if (window.performance.navigation.type === 1) {
//       // Display a toast notification after the page is reloaded
//       <ABB.NotificationContainer
//         notifications={[
//           {
//             id: "success-toast",
//             type: "banner",
//             discreet: false,
//             severity: "success",
//             text: (
//               <LanguageTranslatorProvider
//                 language={language}
//                 keyName="translateData.sideBar.sidebar.newChat"
//               />
//             ),
//             timeout: 3000, // Auto-close after 3 seconds
//           },
//         ]}
//         actionHandler={{ remove: () => {} }} // Provide an empty remove handler
//       />
//     }
//   }, []);

//   // Use handleNewChat to initiate the reload
//   const reloadPage = () => {
//     try {
//       // Reload the page
//       window.location.reload();
//     } catch (error: any) {
//       // Handle errors if needed
//       console.error("Error reloading page:", error.message);
//     }
//   };

//   const DonwloadExcelFile = async (
//     downloadService: any,
//     fileNamePrefix: string
//   ) => {
//     try {
//       if (isDownloading) {
//         return; // Disable download if risk analysis is in progress
//       }

//       setIsDownloading(true);
//       console.log("Download triggered");
//       <ABB.NotificationContainer
//         notifications={[
//           {
//             id: "warning-toast",
//             type: "banner",
//             discreet: false,
//             severity: "warn",
//             text: (
//               <LanguageTranslatorProvider
//                 language={language}
//                 keyName="translateData.sideBar.toasts.downloadInProgress"
//               />
//             ),
//             timeout: undefined, // Do not auto-close
//           },
//         ]}
//         actionHandler={{ remove: () => {} }} // Provide an empty remove handler
//       />
//       const response = await downloadService(vectorStoreName || "");
//       console.log("Response received:", response.data);

//       // Extract the blobname from the response
//       const blobName = response.data.blob_name;
      
//       // Log the blob name for verification
//       console.log("BlobName:", blobName);

//       // Construct the download URL or use it in any way you need
//       const downloadUrl = `https://rfqdocumentstorage.blob.core.windows.net/rfq-downloads/${blobName}`;
      
//       // Use the fetch API to download the file
//       const responseBlob = await fetch(downloadUrl);
//       const blobData = await responseBlob.blob();

//       // Create a download link and trigger the download
//       const downloadLink = document.createElement("a");
//       downloadLink.href = window.URL.createObjectURL(blobData);
//       downloadLink.download = `${fileNamePrefix}_${new Date().toISOString()}.xlsx`;
//       document.body.appendChild(downloadLink);
//       downloadLink.click();
//       document.body.removeChild(downloadLink);

//       console.log("response received :", response);

//       Toast.dismiss();

//       <ABB.NotificationContainer
//         notifications={[
//           {
//             id: "download-success",
//             type: "banner", // Assuming this is a banner notification
//             discreet: false, // Adjust as needed
//             severity: "success", // Assuming this is a success notification
//             text: (
//               <LanguageTranslatorProvider
//                 language={language}
//                 keyName="translateData.sideBar.toasts.downloadComplete"
//               />
//             ), // Assuming this is the success message
//             timeout: 5000, // Auto-close after 5000 milliseconds (5 seconds)
//           },
//         ]}
//         actionHandler={{ remove: () => {} }} // Provide an empty remove handler
//       />
//     } catch (error: any) {
//       // Handle errors
//       console.error("Download error: ", error.message);
//     } finally {
//       setIsDownloading(false); // Enable downloads after completion or failure
//     }
//   };
  
//   const handleTechnicalDownload = () => {
//     DownloadExcelFile(excelTypes.technicalExcel);
//   };
//   const handleLegalDownload = () => {
//     handleDownload(FileUploadService.legalExcel, "Legal");
//   };
//   const handleGeneralDownload = () => {
//     handleDownload(FileUploadService.generalExcel, "General");
//   };
//   const handleProcurementDownload = () => {
//     handleDownload(FileUploadService.procurementExcel, "Procurement");
//   };

// }

//leftPanel.tsx
import React, { useState } from 'react';
import * as ABB from '@abb/abb-common-ux-react'
import '../leftPanel/leftPanel.css'
import TextBox from 'component/textBox/textBox';
import Card from 'component/card/card';

interface LeftPanelProps{
  isMenuOpen?: boolean;
}

const LeftPanel = ( {isMenuOpen}: LeftPanelProps ) => {

  const [isBrowseAndChatOpen, setIsBrowseAndChatOpen] = useState<boolean>(true);
  // isMenuOpen = isMenuOpen ? true : false
  
  const refreshBrowseAndChat = () => {
    setIsBrowseAndChatOpen(!isBrowseAndChatOpen);
    // window.location.reload(); // Refresh the webpage
  };

  return (
    <div> 
      <div className={`leftPanel ${isMenuOpen ? "open" : ""}`}>
        <button className="refreshPageButton" onClick={refreshBrowseAndChat}>
          <ABB.Icon className="chatIcon" name="abb/chat" sizeClass="medium"/> 
          New Chat
        </button>

        <span className="downloadCenterText"> 
          <ABB.Icon className="downloadIcon" name="abb/download" sizeClass="medium"/> 
          Downlaod Center 
        </span>
        
        <div className="downloadSummaryMenu">
          <button> Commercial Summary </button>
          <button> Technical Summary </button>
          <button> Contract Summary </button>
          <button> Procurement Summary </button>
          <button> Other Summary </button>
        </div>
      </div>

      <Card onRefreshBrowseAndChat={isBrowseAndChatOpen}/>

    </div>
  );
}

export default LeftPanel;
