import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Accueil from "./pages/Accueil";
import CreateCake from "./pages/CreateCake";
import Menu from "./pages/Menu";
import Panier from "./pages/Panier";
import Commander from "./pages/Commander";
import Login from "./pages/Login";

import translations from "./translations";

function App() {
  const [panier, setPanier] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [lang, setLang] = useState(localStorage.getItem("lang") || "fr");

  const t = translations[lang];

  const ajouterAuPanier = (gateau) => {
    setPanier([...panier, gateau]);
  };

  const supprimerDuPanier = (index) => {
    setPanier(panier.filter((item, i) => i !== index));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const changerLangue = () => {
    const nouvelleLangue = lang === "fr" ? "en" : "fr";
    setLang(nouvelleLangue);
    localStorage.setItem("lang", nouvelleLangue);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <h2>Cake Custom</h2>

        <Link to="/">{t.home}</Link>
        <Link to="/create">{t.create}</Link>
        <Link to="/menu">{t.menu}</Link>
        <Link to="/panier">
          {t.cart} ({panier.length})
        </Link>
        <Link to="/commander">{t.order}</Link>

        {token ? (
          <button onClick={logout}>{t.logout}</button>
        ) : (
          <Link to="/login">{t.login}</Link>
        )}

        <button onClick={changerLangue}>
          {lang === "fr" ? "EN" : "FR"}
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Accueil t={t} />} />
        <Route
          path="/create"
          element={<CreateCake ajouterAuPanier={ajouterAuPanier} t={t} />}
        />
        <Route path="/menu" element={<Menu t={t} />} />
        <Route
          path="/panier"
          element={
            <Panier
              panier={panier}
              supprimerDuPanier={supprimerDuPanier}
              t={t}
            />
          }
        />
        <Route
          path="/commander"
          element={<Commander panier={panier} setPanier={setPanier} t={t} />}
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;