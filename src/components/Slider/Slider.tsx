import { useState, useEffect } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import "./Slider.scss";

const data = [
  "https://images.pexels.com/photos/3756750/pexels-photo-3756750.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/821738/pexels-photo-821738.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/11484000/pexels-photo-11484000.jpeg?auto=compress&cs=tinysrgb&w=1600",
];

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((currentSlide) =>
        currentSlide === 3 ? 0 : currentSlide + 1
      );
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 3 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 3 ? 0 : (prev) => prev + 1);
  };

  return (
    <div className="slider-container">
      <div
        className="container"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <img src={data[0]} alt="" />
        <img src={data[1]} alt="" />
        <img src={data[2]} alt="" />
        <img src={data[3]} alt="" />
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <WestOutlinedIcon />
        </div>
        <div className="icon" onClick={nextSlide}>
          <EastOutlinedIcon />
        </div>
      </div>
      <div className="text-container">
        <div className="big-text">Exclusive</div>
        <div className="big-text item2">Products</div>
        <div className="line"></div>
        <div className="small-text">
          shop now <KeyboardDoubleArrowRightRoundedIcon className="arrow" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
