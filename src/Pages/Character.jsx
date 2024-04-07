import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Character = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { characterId } = useParams();
  const [picture, setPicture] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/${characterId}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        setPicture(
          `${response.data.thumbnail.path}/portrait_uncanny` +
            `.${response.data.thumbnail.extension}`
        );
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [characterId]);
  return isLoading ? (
    <span>Loading..</span>
  ) : (
    <main>
      <section>
        <div className="character-comics-div">
          <div className="character-comics-img">
            <img src={picture} alt="character" />
          </div>
          <div className="info-character">
            <span>{data.name}</span>
            <span>{data.description && data.description}</span>
          </div>
        </div>
        <div className="comics-character-div">
          {data.comics.map((comics) => {
            const picture =
              `${comics.thumbnail.path}/portrait_incredible` +
              `.${comics.thumbnail.extension}`;
            return (
              <div key={comics._id}>
                <div>
                  <img src={picture} alt="comics" />
                </div>
                <span>{comics.title}</span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Character;
