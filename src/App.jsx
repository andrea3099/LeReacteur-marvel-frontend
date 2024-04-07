import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Comics from "./Pages/Comics";
import Characters from "./Pages/Characters";
import Favorites from "./Pages/Favorites";
import Character from "./Pages/Character";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Footer from "./Components/Footer";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
library.add(faHeart, faMagnifyingGlass);

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState();
  const [userId, setUserId] = useState();
  const [favoritesAdd, setFavoritesAdd] = useState();
  const [userData, setUserData] = useState();
  const [charactersFav, setCharactersFav] = useState();
  const [comicsFav, setComicsFav] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/favorites`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data);
      setCharactersFav(response.data.favCharacters);
      setComicsFav(response.data.favComics);
    };
    fetchData();
  }, [token, charactersFav, comicsFav]);

  return (
    <Router>
      <Header setToken={setToken} token={token} userId={userId} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/comics"
          element={
            <Comics
              setFavorites={setFavorites}
              setSearch={setSearch}
              setFavoritesAdd={setFavoritesAdd}
              favorites={favorites}
              search={search}
              userId={userId}
              token={token}
              favoritesAdd={favoritesAdd}
              userData={userData}
              comicsFav={comicsFav}
            />
          }
        />
        <Route
          path="/characters"
          element={
            <Characters
              setSearch={setSearch}
              search={search}
              token={token}
              charactersFav={charactersFav}
            />
          }
        />
        <Route path="/comics/:characterId" element={<Character />} />
        <Route
          path="/favorites"
          element={
            <Favorites
              setFavorites={setFavorites}
              favorites={favorites}
              token={token}
              favoritesAdd={favoritesAdd}
            />
          }
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} setUserId={setUserId} />}
        />
        <Route
          path="/signup"
          element={<Signup setToken={setToken} setUserId={setUserId} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
