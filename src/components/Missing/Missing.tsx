import { Link } from "react-router-dom";
import notFound from "../../assets/svgs/notFound.svg";
import "./Missing.scss";

const Missing: React.FC = () => {
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
