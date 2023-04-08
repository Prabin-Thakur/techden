import "./ShowCase.scss";
import { Link } from "react-router-dom";

const ShowCase: React.FC = () => {
  return (
    <div className="showcase-container">
      <div className="col">
        <div className="row small">
          <img
            src="https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="audio"
          />
          <button>
            <Link className="link" to="/products/1">
              Audio
            </Link>
          </button>
        </div>
        <div className="row small">
          <img
            src="https://images.pexels.com/photos/4126815/pexels-photo-4126815.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="pc"
          />
          <button>
            <Link to="/products/1" className="link">
              Pc
            </Link>
          </button>
        </div>
      </div>
      <div className="col">
        <div className="row large-vertical">
          {" "}
          <img
            src="https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="smartphone"
          />
          <button>
            <Link to="/products/1" className="link">
              Smartphone
            </Link>
          </button>
        </div>
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col">
            <div className="row small">
              <img
                src="https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="audio"
              />
              <button>
                <Link to="/products/1" className="link">
                  Audio
                </Link>
              </button>
            </div>
          </div>
          <div className="col">
            <div className="row small">
              {" "}
              <img
                src="https://images.pexels.com/photos/11484000/pexels-photo-11484000.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="wearables"
              />
              <button>
                <Link to="/products/1" className="link">
                  Wearables
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row large-horizontal">
          <img
            src="https://images.pexels.com/photos/1203819/pexels-photo-1203819.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="camera"
          />
          <button>
            <Link to="/products/1" className="link">
              Camera
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
