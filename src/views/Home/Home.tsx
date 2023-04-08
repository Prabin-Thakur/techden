import "./Home.scss";
import Slider from "../../components/Slider/Slider";
import FeaturedProducts from "../../components/TrendingProducts/TrendingProducts";
import ShowCase from "../../components/ShowCase/ShowCase";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Slider />
      <FeaturedProducts type="New" />
      <ShowCase />
      <FeaturedProducts type="Trending" />
    </div>
  );
};

export default Home;
