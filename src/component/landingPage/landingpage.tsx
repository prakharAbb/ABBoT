// import React from "react";
// // import { Card, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./landingpage.css";
// import logo from "../../assets/abb.png";
// // import { Link } from "react-router-dom";
// import summarizer from "../../assets/summarizer.png";
// import library from "../../assets/library.png";
// import * as ABB from '@abb/abb-common-ux-react';
// import '@abb/abb-common-ux-react/styles.css';

// interface LandingPageProps {
//   children: React.ReactNode;
// }

// const LandingPage: React.FC<LandingPageProps> = () => {
//   return (
//     <>
//       <div className="glass-morph-wrapper1">
//         <div className="glass-morph-container1 d-flex flex-column align-items-center justify-content-center">
//           {/* Logo */}
//           <img src={logo} alt="Logo" className="logo-img" />

//           <div className="greeting2">
//             <p>Hi, I am PAEN ABBot</p>
//             <div className="greeting3">
//               <p>How Can I Help You Today?</p>
//             </div>
//           </div>

//           {/* Cards */}
//           <div className="row justify-content-center">
//             <div className="col-md-6 mb-3">
//               {/* First Card */}
//               <Card style={{ width: "60%", marginLeft: "40%" }}>
//                 <Link to="https://library.abb.com/" className="card-link">
//                   <Card.Img
//                     variant="top"
//                     src={library}
//                     alt="library"
//                     className="cardImage"
//                   />
//                   <Card.Body className="d-flex flex-column align-items-center">
//                     <Card.Title className="text-center">
//                       ABB Library Center
//                     </Card.Title>

//                     <Card.Subtitle className="mb-2 text-muted text-center">
//                       Leads to ABB library & chat utility and searchs info from
//                       ABB Library
//                     </Card.Subtitle>

//                     <Button variant="danger">Enter</Button>
//                   </Card.Body>
//                 </Link>
//               </Card>
//             </div>

//             <div className="col-md-6 mb-3">
//               {/* Second Card */}
//               <Card style={{ width: "60%" }}>
//                 <Link to="/commercial" className="card-link">
//                   <Card.Img
//                     variant="top"
//                     src={summarizer}
//                     alt="summarizer"
//                     className="cardImage"
//                   />
//                   <Card.Body className="d-flex flex-column align-items-center">
//                     <Card.Title className="text-center">
//                       ABB Document Summarizer​
//                     </Card.Title>
//                     <Card.Subtitle className="mb-2 text-muted text-center">
//                       PAEN doc summarizer to converse in real time with your
//                       document
//                     </Card.Subtitle>

//                     <Button variant="danger">Enter</Button>
//                   </Card.Body>
//                 </Link>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LandingPage;
export {};