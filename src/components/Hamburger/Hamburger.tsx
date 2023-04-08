import { showSideBar } from "../../redux/sideBar/sideBarSlice";
import { useAppDispatch } from "../../redux/hooks";
import "./Hamburger.scss";

const Hamburger: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div
      className="hamburger_container"
      onClick={() => {
        dispatch(showSideBar());
      }}
    >
      <div className="hamburger_lines line1" />
      <div className="hamburger_lines line2" />
    </div>
  );
};

export default Hamburger;
