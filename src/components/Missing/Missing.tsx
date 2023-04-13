import { useEffect } from "react";
import { Link } from "react-router-dom";
import notFound from "../../assets/svgs/notFound.svg";
import "./Missing.scss";

const Missing: React.FC = () => {
  //to make sure when page first loads you are on top of the page
  useEffect(() => {
    window.scrollTo(0, 0); // scrolls to the top of the page
  }, []);

  return (
    <>
      <div className="missing-container">
        <div className="missing-image">
          <img src={notFound} alt="404notFound" />
        </div>
        <Link to="/" className="missing-go-back">
          Visit Homepage
        </Link>
      </div>
    </>
  );
};

export default Missing;
