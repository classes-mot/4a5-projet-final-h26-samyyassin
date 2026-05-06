import { useState } from "react";

function CreateCake({ ajouterAuPanier }) {
  const [size, setSize] = useState("6 pouces");
  const [saveur, setSaveur] = useState("vanille");
  const [filling, setFilling] = useState("fraise");
  const [quantite, setQuantite] = useState(1);

  const calculerPrix = () => {
    let prix = 0;

    if (size === "4 pouces") prix = 35;
    if (size === "6 pouces") prix = 60;
    if (size === "8 pouces") prix = 85;

    if (filling === "nutella") prix += 8;
    if (filling === "framboise") prix += 5;

    return prix * quantite;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const gateau = {
      size,
      saveur,
      filling,
      quantite,
      prix: calculerPrix()
    };

    ajouterAuPanier(gateau);
    alert("Gâteau ajouté au panier!");
  };

  return (
    <div className="page">
      <h1>Créer ton gâteau</h1>

      <form onSubmit={handleSubmit} className="form">
        <label>Taille</label>
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option>4 pouces</option>
          <option>6 pouces</option>
          <option>8 pouces</option>
        </select>

        <label>Saveur</label>
        <select value={saveur} onChange={(e) => setSaveur(e.target.value)}>
          <option>vanille</option>
          <option>chocolat</option>
          <option>red velvet</option>
          <option>funfetti</option>
        </select>

        <label>Filling</label>
        <select value={filling} onChange={(e) => setFilling(e.target.value)}>
          <option>fraise</option>
          <option>framboise</option>
          <option>nutella</option>
          <option>vanille</option>
        </select>

        <label>Quantité</label>
        <input
          type="number"
          min="1"
          value={quantite}
          onChange={(e) => setQuantite(Number(e.target.value))}
        />

        <h3>Total : {calculerPrix()} $</h3>

        <button type="submit">Ajouter au panier</button>
      </form>
    </div>
  );
}

export default CreateCake;