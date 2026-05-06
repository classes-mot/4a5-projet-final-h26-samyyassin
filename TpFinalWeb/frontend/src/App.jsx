import { useState } from "react";
import Accueil from "./pages/Accueil";
import CreateCake from "./pages/CreateCake";
import Menu from "./pages/Menu";
import Panier from "./pages/Panier";
import Commander from "./pages/Commander";

function App() {
  const [page, setPage] = useState("accueil");
  const [panier, setPanier] = useState([]);

  const ajouterAuPanier = (gateau) => {
    setPanier([...panier, gateau]);
  };

  const supprimerDuPanier = (index) => {
    const nouveauPanier = panier.filter((item, i) => i !== index);
    setPanier(nouveauPanier);
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Cake Custom</h2>
        <button onClick={() => setPage("accueil")}>Accueil</button>
        <button onClick={() => setPage("create")}>Créer</button>
        <button onClick={() => setPage("menu")}>Menu</button>
        <button onClick={() => setPage("panier")}>
          Panier ({panier.length})
        </button>
        <button onClick={() => setPage("commander")}>Commander</button>
      </nav>

      {page === "accueil" && <Accueil />}
      {page === "create" && <CreateCake ajouterAuPanier={ajouterAuPanier} />}
      {page === "menu" && <Menu />}
      {page === "panier" && (
        <Panier panier={panier} supprimerDuPanier={supprimerDuPanier} />
      )}
      {page === "commander" && <Commander panier={panier} setPanier={setPanier} />}
    </div>
  );
}

export default App;