import React from "react";
import "./index.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          <span>All Your Money,</span>
          <br></br>
          <span>Organized Wisely.</span>
        </h1>
        <p>
          Track expenses, plan goals, manage debts, and grow your wealth — all
          in one simple app.
        </p>
        <button className="hero-button">Start Tracking Now</button>
      </div>
    </section>
  );
};

export default Hero;
