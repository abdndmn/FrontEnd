import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const StarshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ship, setShip] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/starships/${id}/`)
      .then((res) => res.json())
      .then((data) => setShip(data));
  }, [id]);

  return (
    <div>
      <button onClick={() => navigate(-1)}>Geri Dön</button>
      {ship ? (
        <div>
          <h2>{ship.name}</h2>
          <p>
            <strong>Model:</strong> {ship.model}
          </p>
          <p>
            <strong>Passengers:</strong> {ship.passengers}
          </p>
          <p>
            <strong>Max Speed:</strong> {ship.max_atmosphering_speed}
          </p>
          <p>
            <strong>Manufacturer:</strong> {ship.manufacturer}
          </p>
          <p>
            <strong>Crew:</strong> {ship.crew}
          </p>
          <p>
            <strong>Cargo Capacity:</strong> {ship.cargo_capacity}
          </p>
        </div>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  );
};

export default StarshipDetail;