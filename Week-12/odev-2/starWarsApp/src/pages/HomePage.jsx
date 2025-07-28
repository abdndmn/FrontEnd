import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [starships, setStarships] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`https://swapi.dev/api/starships/?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Veri geldi:", data.results); 
        setStarships((prev) => [...prev, ...data.results]);
      });
  }, [page]);

  const handleSearch = () => {
    fetch(`https://swapi.dev/api/starships/?search=${search}`)
      .then((res) => res.json())
      .then((data) => setStarships(data.results));
  };

  return (
    <div>
      <h1>Star Wars Ships</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Name / Model"
      />
      <button onClick={handleSearch}>Filtrele</button>

      <div className="ship-grid">
        {starships.map((ship) => {
          const id = ship.url.split("/")[5];
          return (
            <Link key={id} to={`/starship/${id}`} className="ship-card">
              <div>
                <h3>{ship.name}</h3>
                <p>{ship.model}</p>
                <p>Hyperdrive Rating: {ship.hyperdrive_rating}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <button onClick={() => setPage((prev) => prev + 1)}>Daha Fazla</button>
    </div>
  );
};

export default HomePage;