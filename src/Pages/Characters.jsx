import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../Components/Pagination";

const Characters = ({ search, setSearch, token, charactersFav }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);
  const [name, setName] = useState("");
  const [count, setCount] = useState();

  // const [charactersFav, setCharactersFav] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}characters`,
          {
            params: {
              limit: limit,
              skip: skip,
              name: search,
            },
          }
        );
        setData(response.data);
        setIsLoading(false);
        setCount(response.data.count);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [limit, skip, name, search, count]);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <main className="main-characters-container">
      <div className="search-paginate">
        <div className="research-bar">
          <input
            type="text"
            id="search"
            placeholder="Rechercher.."
            name="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <label htmlFor="search">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </label>
        </div>

        <Pagination
          limit={limit}
          count={count}
          setSkip={setSkip}
          skip={skip}
          data={data}
        />
      </div>
      <section className="container-characters">
        {data.results.map((character) => {
          const routeCharacterId = `/character/${character._id}`;
          const picture =
            `${character.thumbnail.path}/portrait_uncanny` +
            `.${character.thumbnail.extension}`;
          return (
            <div key={character._id} className="favoris-container">
              {token && charactersFav.length === 0 && (
                <div
                  className="favoris"
                  onClick={async () => {
                    try {
                      const response = await axios.put(
                        `${
                          import.meta.env.VITE_API_URL
                        }user/favorites/characters`,
                        {
                          id: character._id,
                          characters_name: character.name,
                          characters_description: character.description,
                          characters_picture: picture,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                          },
                        }
                      );
                    } catch (error) {
                      console.log(error.response.data);
                    }
                  }}
                >
                  <FontAwesomeIcon icon="fa-heart" className="white" />
                </div>
              )}

              {charactersFav.map((favoris, index) => {
                return (
                  <div key={index}>
                    {token && favoris.characters_id !== character._id && (
                      <div
                        className="favoris"
                        onClick={async () => {
                          try {
                            const response = await axios.put(
                              `${
                                import.meta.env.VITE_API_URL
                              }user/favorites/characters`,
                              {
                                id: character._id,
                                characters_name: character.name,
                                characters_description: character.description,
                                characters_picture: picture,
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  "Content-Type": "application/json",
                                },
                              }
                            );
                          } catch (error) {
                            console.log(error.response.data);
                          }
                        }}
                      >
                        <FontAwesomeIcon icon="fa-heart" className="white" />
                      </div>
                    )}
                  </div>
                );
              })}
              {charactersFav.map((favoris, index) => {
                return (
                  <div key={index}>
                    {token && favoris.characters_id === character._id && (
                      <div className="favoris">
                        <FontAwesomeIcon icon="fa-heart" className="red" />
                      </div>
                    )}
                  </div>
                );
              })}
              <Link className="div-character link" to={routeCharacterId}>
                <span className="title name">{character.name}</span>
                <div className="picture">
                  <img src={picture} alt="characters" />
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Characters;
