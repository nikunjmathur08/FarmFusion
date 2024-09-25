import React from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Services from "./components/Services";
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Services />
    </div>
  );
}

export default App;
