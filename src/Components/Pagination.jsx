import { useState } from "react";
const Pagination = ({ limit, count, setSkip, skip, data }) => {
  const [nombrePageMax, setNombrePageMax] = useState(10);

  const paginationNumber = [];
  const pageLeft = [];
  for (let i = 1; i <= Math.ceil(count / limit); i++) {
    paginationNumber.push(i);
  }

  for (let i = 1; i < paginationNumber.length && i <= nombrePageMax; i++) {
    pageLeft.push(i);
  }
  return (
    <div className="page-number">
      {nombrePageMax !== 10 && (
        <button
          onClick={() => {
            setNombrePageMax(nombrePageMax - 10);
          }}
        >
          -
        </button>
      )}

      {pageLeft.map((pageNumber) => {
        // console.log(pageNumber);
        return (
          <div key={pageNumber}>
            <button
              onClick={() => {
                setSkip((skip = (pageNumber - 1) * limit));
              }}
            >
              {pageNumber}
            </button>
          </div>
        );
      })}
      {nombrePageMax <= paginationNumber.length && (
        <button
          onClick={() => {
            setNombrePageMax(nombrePageMax + 10);
          }}
        >
          +
        </button>
      )}
    </div>
  );
};

export default Pagination;
