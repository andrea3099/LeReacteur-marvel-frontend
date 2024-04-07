import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ setToken, setUserId }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <main className="container-signup">
      <h2>S'inscrire</h2>
      <form
        className="form-signup"
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const response = await axios.post(
              "http://localhost:3000/user/signup",
              {
                username: username,
                email: email,
                password: password,
              }
            );
            console.log(response.data);
            setData(response.data);
            Cookies.set("userToken", response.data.token, { expires: 7 });
            setToken(response.data.token);
            setUserId(response.data._id);
            navigate("/");
          } catch (error) {
            setErrorMessage(error.response.data);
            console.log(error.response);
          }
        }}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button type="submit">S'inscrire</button>
      </form>
      <span>{errorMessage}</span>
      <Link to="/login" className="link signup-link">
        <span>Tu as déja rejoins ? Connecte toi !</span>
      </Link>
    </main>
  );
};

export default Signup;
