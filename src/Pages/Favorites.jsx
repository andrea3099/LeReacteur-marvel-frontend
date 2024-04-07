import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Favorites = ({ token, favoritesAdd }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}user/favorites`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      setIsLoading(false);
      console.log(response.data.favComics);
    };
    fetchData();
  }, [token]);
  return isLoading ? (
    <span>Loading..</span>
  ) : (
    <div className="favorites-content">
      <div className="list-favoris">
        <span>Vos comics favoris</span>
      </div>
      <div className="favorites-comics">
        {data.favComics.map((comicsfav) => {
          return (
            <div key={comicsfav._id} className="favoris-container ">
              <div className="div-character favoris-comics">
                <p className="title">{comicsfav.comics_title}</p>
                <div>
                  <img src={comicsfav.comics_picture} alt="comics" />
                </div>
              </div>
            </div>
          );
        })}
        <div className="favorites-content">
          <div className="list-favoris">
            <span>Vos personnages favoris</span>
          </div>
          <div className="favorites-comics">
            {data.favCharacters.map((charactersfav) => {
              return (
                <div key={charactersfav._id} className="favoris-container">
                  <div className="div-character favoris-comics">
                    <p className="title">{charactersfav.characters_name}</p>
                    <div>
                      <img
                        src={charactersfav.characters_picture}
                        alt="characters"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
