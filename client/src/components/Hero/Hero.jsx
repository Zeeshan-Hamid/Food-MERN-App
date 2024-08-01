import "./hero.scss";

import SplineHero from "../SplineHero/SplineHero";
const Hero = () => {
  return (
    <div className="heroContainer">
      <div className="hero">
        <SplineHero />
      </div>
    </div>
  );
};

export default Hero;
