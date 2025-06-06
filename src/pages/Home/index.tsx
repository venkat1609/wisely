import React from "react";
import Hero from "../../components/Hero/index.tsx";
import Navbar from "../../components/Navbar/index.tsx";
import Features from "../../components/Features/index.tsx";

import "./index.css";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
};

export default Home;
