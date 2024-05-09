// //APiCallBackend.tsx
// // import { EXCEL_API_BASE_URL } from "../sideBar/env";

// // const handleError = (error: any): void => {
// //   console.error("Error:", error.message);
// //   throw error;
// // };

// // const APiCallBackend = async (
// //   endpoint: string,
// //   storedVectorStoreName: string
// // ): Promise<any> => {
// //   try {
// //     const response = await fetch(`${EXCEL_API_BASE_URL}/${endpoint}`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         vectorStoreName: storedVectorStoreName,
// //       }),
// //     });

// //     if (!response.ok) {
// //       throw new Error(`HTTP error! Status: ${response.status}`);
// //     }

// //     const responseData = await response.json();

// //     if (!responseData || !responseData.blob_name) {
// //       throw new Error("Invalid server response. Missing 'blob_name'.");
// //     }

// //     const blobName = responseData.blob_name;

// //     return { data: responseData, blobName };
// //   } catch (error) {
// //     handleError(error);
// //   }
// // };

// // const commercialExcel = async (storedVectorStoreName: string): Promise<any> => {
// //   return fetchExcelFile("commercialExcel", storedVectorStoreName);
// // };

// // const technicalExcel = async (storedVectorStoreName: string): Promise<any> => {
// //   return fetchExcelFile("technicalExcel", storedVectorStoreName);
// // };

// // const legalExcel = async (storedVectorStoreName: string): Promise<any> => {
// //   return fetchExcelFile("legalExcel", storedVectorStoreName);
// // };

// // const generalExcel = async (storedVectorStoreName: string): Promise<any> => {
// //   return fetchExcelFile("generalExcel", storedVectorStoreName);
// // };

// // const procurementExcel = async (
// //   storedVectorStoreName: string
// // ): Promise<any> => {
// //   return fetchExcelFile("procurementExcel", storedVectorStoreName);
// // };

// // export default APiCallBackend;

// // APiCallBackend.tsx
// import { EXCEL_API_BASE_URL } from "../sideBar/env";
// import React, { useState, useEffect } from "react";
// import { LanguageTranslatorProvider } from "../languageTranslator/languageTranslator";
// import "../sideBar/leftPanel.css";
// import * as ABB from '@abb/abb-common-ux-react';

// const handleError = (error: any): void => {
//   console.error("Error:", error.message);
//   throw error;
// };

// interface DownloadExcelFileProps {
//   endpoint: string;
//   // vectorStoreName: string | null;
//   language: string;
// }

// const excelTypes = {
//   commercialExcel: "commercialExcel",
//   technicalExcel: "technicalExcel",
//   contractExcel: "contractExcel",
//   procurementExcel:"procurement",
//   generalExcel: "generalExcel"
// };
//   // storedVectorStoreName: string,
//   // downloadService: any,
//   // fileNamePrefix: string,
//   // setIsDownloading: (value: boolean) => void,
//   // vectorStoreName: string, // assuming vectorStoreName is defined somewhere
//    // assuming language is defined somewhere

// const DownloadExcelFile = async ({ endpoint,  language }: DownloadExcelFileProps): Promise<any> => {
//   const [isDownloading, setIsDownloading] = useState(false);

//   try {
//     const response = await fetch(`${EXCEL_API_BASE_URL}/${endpoint}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         vectorStoreName: storedVectorStoreName,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const responseData = await response.json();

//     if (!responseData || !responseData.blob_name) {
//       throw new Error("Invalid server response. Missing 'blob_name'.");
//     }

//     const blobName = responseData.blob_name;

//     return { data: responseData, blobName };
//   } catch (error: any) {
//     handleError(error);
//   }

//   try {
//     if (isDownloading) {
//       return; // Disable download if it is already in progress
//     }

//     setIsDownloading(true);
//     console.log("Download triggered");
//     <ABB.NotificationContainer
//       notifications={[
//         {
//           id: "warning-toast",
//           type: "banner",
//           discreet: false,
//           severity: "warn",
//           text: (
//             <LanguageTranslatorProvider
//               language={language}
//               keyName="translateData.sideBar.toasts.downloadInProgress"
//             />
//           ),
//           timeout: undefined, // Do not auto-close
//         },
//       ]}
//       actionHandler={{ remove: () => {} }} // Provide an empty remove handler
//     />
//     const response = await downloadService(vectorStoreName || "");
//     console.log("Response received:", response.data);

//     // Extract the blobname from the response
//     const blobName = response.data.blob_name;
    
//     // Log the blob name for verification
//     console.log("BlobName:", blobName);

//     // Construct the download URL or use it in any way you need
//     const downloadUrl = `https://rfqdocumentstorage.blob.core.windows.net/rfq-downloads/${blobName}`;
    
//     // Use the fetch API to download the file
//     const responseBlob = await fetch(downloadUrl);
//     const blobData = await responseBlob.blob();

//     // Create a download link and trigger the download
//     const downloadLink = document.createElement("a");
//     downloadLink.href = window.URL.createObjectURL(blobData);
//     downloadLink.download = `${fileNamePrefix}_${new Date().toISOString()}.xlsx`;
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);

//     console.log("response received :", response);

//     // Toast.dismiss();

//     <ABB.NotificationContainer
//       notifications={[
//         {
//           id: "download-success",
//           type: "banner", // Assuming this is a banner notification
//           discreet: false, // Adjust as needed
//           severity: "success", // Assuming this is a success notification
//           text: (
//             <LanguageTranslatorProvider
//               language={language}
//               keyName="translateData.sideBar.toasts.downloadComplete"
//             />
//           ), // Assuming this is the success message
//           timeout: 5000, // Auto-close after 5000 milliseconds (5 seconds)
//         },
//       ]}
//       actionHandler={{ remove: () => {} }} // Provide an empty remove handler
//     />
//   } catch (error: any) {
//     // Handle errors
//     console.error("Download error: ", error.message);
//   } finally {
//     setIsDownloading(false); // Enable downloads after completion or failure
//   }

 
// };

// export default APiCallBackend;
