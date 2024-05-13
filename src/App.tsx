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
// import Sidebar from './component/sideBar/ab';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <LeftPanel /> <Sidebar /> */}
      {/* <Cards/> */}
      {/* <Chat /> */}
      {/* <BrowseFile /> */}
      {/* <WelcomeBox /> */}
      {/* <TextBox /> */}
      {/* <Footer/> */}
    </div>
  );
}

export default App;
