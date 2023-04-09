import "./ShowCase.scss";
import { Link } from "react-router-dom";

const ShowCase: React.FC = () => {
  return (
    <div className="showcase-container">
      <div className="showcase-left">
        <div className="small">
          <div className="small-box">
            <img
              src="https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="audio"
            />
            <div className="button">
              <Link className="link" to="/audio">
                Audio
              </Link>
            </div>
          </div>
          <div className="small-box">
            <img
              src="https://images.pexels.com/photos/4126815/pexels-photo-4126815.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="pc"
            />
            <div className="button">
              <Link to="/pc" className="link">
                Pc
              </Link>
            </div>
          </div>
        </div>
        <div className="large-vertical">
          <img
            src="https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="smartphone"
          />
          <div className="button">
            <Link to="/smartphone" className="link">
              Smartphone
            </Link>
          </div>
        </div>
      </div>
      <div className="showcase-right">
        <div className="small">
          <div className="small-box">
            <img
              src="https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="audio"
            />
            <div className="button">
              <Link to="/audio" className="link">
                Audio
              </Link>
            </div>
          </div>
          <div className="small-box">
            <img
              src="https://images.pexels.com/photos/11484000/pexels-photo-11484000.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="wearables"
            />
            <div className="button">
              <Link to="/wearable" className="link">
                Wearable
              </Link>
            </div>
          </div>
        </div>
        <div className="large-horizontal">
          <img
            src="https://images.pexels.com/photos/1203819/pexels-photo-1203819.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="camera"
          />
          <div className="button">
            <Link to="/camera" className="link">
              Camera
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
