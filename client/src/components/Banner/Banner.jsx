import "./banner.scss";
import { MdFeaturedPlayList } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner">
      <h1>
        We enable people to share their daily life <span>Stunning Recipes</span>
      </h1>

      <div className="banner-flex">
        <div className="left">
          <div className="promotion">
            <p>Feature your food</p>{" "}
            <span>
              <MdFeaturedPlayList />
            </span>
          </div>
          <div className="banner-text">
            <p>
              Take your Food Experience to next Level through Foodhub's Blogging
              Feature
            </p>
          </div>
          <button>
            <span>Get Started</span> - It's Free!
          </button>
          <div className="img-container">
            <img src="/person.png" alt="" />
            <img src="/person2.PNG" alt="" />
            <img src="/person3.PNG" alt="" />
            <img src="/person4.PNG" alt="" />
            <img src="/person5.PNG" alt="" />
            <img src="/person6.PNG" alt="" />
            <img src="/person7.PNG" alt="" />
          </div>
        </div>

        <div className="right">
          <img src="/food-bg.png" alt="Foodhub" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
