import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../Components/Pagination";

const Comics = ({ setSearch, search, token, comicsFav }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comics`,
          {
            params: {
              limit: limit,
              skip: skip,
              title: search,
            },
          }
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        setCount(response.data.count);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [limit, skip, search, count]);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <main className="main-comics-container">
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
      <section className="container-comics">
        {data.results.map((comics) => {
          const picture =
            `${comics.thumbnail.path}/portrait_uncanny` +
            `.${comics.thumbnail.extension}`;
          return (
            <div key={comics._id} className="div-comic">
              <span className="title">{comics.title}</span>
              <div className="picture">
                <img src={picture} alt="comics" />
              </div>
              {comics.description && (
                <span className="description">Description </span>
              )}

              <span className="content">{comics.description}</span>

              {comicsFav.length === 0 && (
                <div
                  className="favoris"
                  onClick={async () => {
                    try {
                      const response = await axios.put(
                        `${import.meta.env.VITE_API_URL}/user/favorites/comics`,
                        {
                          id: comics._id,
                          comics_title: comics.title,
                          comics_description: comics.description,
                          comics_picture: picture,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                          },
                        }
                      );
                      // console.log(userData);
                      // console.log(response.data);
                    } catch (error) {
                      console.log(error.response.data);
                    }
                  }}
                >
                  <FontAwesomeIcon icon="fa-heart" className="white" />
                </div>
              )}
              {comicsFav.map((favoris, index) => {
                return (
                  <div key={index}>
                    {favoris.comics_id !== comics._id && (
                      <div
                        className="favoris"
                        onClick={async () => {
                          try {
                            const response = await axios.put(
                              `${
                                import.meta.env.VITE_API_URL
                              }/user/favorites/comics`,
                              {
                                id: comics._id,
                                comics_title: comics.title,
                                comics_description: comics.description,
                                comics_picture: picture,
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  "Content-Type": "application/json",
                                },
                              }
                            );
                            // console.log(userData);
                            // console.log(response.data);
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
              {comicsFav.map((favoris, index) => {
                return (
                  <div key={index}>
                    {favoris.comics_id === comics._id && (
                      <div className="favoris">
                        <FontAwesomeIcon icon="fa-heart" className="red" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Comics;
