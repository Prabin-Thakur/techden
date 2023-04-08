import "./Home.scss";
import Slider from "../../components/Slider/Slider";
import FeaturedProducts from "../../components/TrendingProducts/TrendingProducts";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Slider />
      <FeaturedProducts type="New" />
      <FeaturedProducts type="Trending" />
    </div>
  );
};

export default Home;
