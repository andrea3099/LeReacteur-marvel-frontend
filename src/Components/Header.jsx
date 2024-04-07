import { Link } from "react-router-dom";
import marvelLogo from "../images/marvel-logo.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({ setToken, token, userId }) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="nav-container">
        <Link className="link menu-nav" to="/comics">
          <div>
            <span>Comics</span>
          </div>
        </Link>
        <Link className="link menu-nav" to="/characters">
          <div>
            <span>Personnages</span>
          </div>
        </Link>
        <Link className="link" to="/">
          <div className="logo-container">
            <img src={marvelLogo} alt="marvel" />
          </div>
        </Link>
        <Link className="link menu-nav" to={token ? `/favorites` : "/signup"}>
          <div>
            <span>Favoris</span>
          </div>
        </Link>
        {token ? (
          <div
            className="menu-nav link "
            onClick={() => {
              Cookies.remove("userToken");
              setToken(null);
              navigate("/");
            }}
          >
            <span>Se déconnecter</span>
          </div>
        ) : (
          <Link className="link menu-nav" to="/signup">
            <div className="login-signup-container">
              <span>Rejoins le multivers</span>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
