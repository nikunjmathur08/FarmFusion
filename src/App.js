import React from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Services from "./components/Services";
import Solutions from "./components/Solutions";
import Footer from "./components/Footer";
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Services />
      <Solutions />
      <Footer />
    </div>
  );
}

export default App;
