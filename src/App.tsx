import React from 'react';
import './App.css';
import Header from './component/header/header'
// import  LeftPanel from './component/sideBar/leftPanel';
import Footer from 'component/footer/footer';
import TextBox from 'component/textBox/textBox';
import Cards from 'component/card/card';
import BrowseFile from 'component/browse/browse';
import Chat from 'component/chat/chat';
import WelcomeBox from 'component/welcome/welcome';
import LoginButton from 'component/authentication/LoginButton';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from 'component/authentication/authConfig';
// import Sidebar from './component/sideBar/ab';

const msalInstance = new PublicClientApplication(msalConfig);


const App: React.FC = () => {
// function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <div className="App">
        <Header />
        {/* <LeftPanel /> <Sidebar /> */}
        {/* <Cards/> */}
        {/* <Chat /> */}
        {/* <BrowseFile /> */}
        {/* <WelcomeBox /> */}
        {/* <TextBox /> */}
        {/* <Footer/> */}
        {/* <LoginButton /> */}
      </div>
    </MsalProvider>
  );
}

export default App;
