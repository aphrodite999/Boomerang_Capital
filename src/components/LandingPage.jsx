import React from "react";
import Dao from "./landing-page/Dao";
import Farming from "./landing-page/Farming";
import Footer from "./landing-page/Footer";
import Header from "./landing-page/Header";
import HowItWork from "./landing-page/HowItWork";
import HeroSection from "./landing-page/HeroSection";
import Offering from "./landing-page/Offering";
import Roadmap from "./landing-page/Roadmap";
import Tokenomics from "./landing-page/Tokenomics";
import WhyUs from "./landing-page/WhyUs";

const LandingPage = () => {
  return (
    <div className="md:-ml-64">
      <Header />
      <HeroSection />
      <Offering />
      <WhyUs />
      <HowItWork />
      <Tokenomics />
      <Farming />
      <Dao />
      <Roadmap />
      <Footer />
    </div>
  );
};

export default LandingPage;
