import homeImg from "../images/marvel-home.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="main-home-container">
      <div className="main-container center">
        <div className="image-home-container">
          <img src={homeImg} alt="home-comics" />
          <div className="div-survol">
            <div
              onClick={() => {
                navigate("/comics/5fcf9533d8a2480017b91a00");
              }}
            ></div>
            <div
              onClick={() => {
                navigate("/comics/5fcf9326d8a2480017b9165f");
              }}
            ></div>
            <div
              onClick={() => {
                navigate("/comics/5fcf94dcd8a2480017b91974");
              }}
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
