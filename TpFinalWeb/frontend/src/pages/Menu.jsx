import { useEffect, useState } from "react";

function Menu({ t }) {
  const [gateaux, setGateaux] = useState([]);

  useEffect(() => {
    const fetchGateaux = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/gateaux`
        );
        const data = await response.json();
        setGateaux(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGateaux();
  }, []);

  return (
    <div className="page">
      <h1>{t.menu}</h1>

      <div className="cards">
        {gateaux.length === 0 ? (
          <p>Aucun gâteau disponible.</p>
        ) : (
          gateaux.map((gateau) => (
            <div className="card" key={gateau._id}>
              <h2>{gateau.size}</h2>
              <p>{t.flavor} : {gateau.saveur}</p>
              <p>Filling : {gateau.filling}</p>
              <h3>{gateau.prix} $</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Menu;