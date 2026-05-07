import { useEffect, useState } from "react";

function Admin({ token }) {
  const [gateaux, setGateaux] = useState([]);
  const [size, setSize] = useState("");
  const [saveur, setSaveur] = useState("");
  const [filling, setFilling] = useState("");
  const [prix, setPrix] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchGateaux = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/gateaux`
    );
    const data = await response.json();
    setGateaux(data);
  };

  useEffect(() => {
    fetchGateaux();
  }, []);

  const resetForm = () => {
    setSize("");
    setSaveur("");
    setFilling("");
    setPrix("");
    setEditId(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const gateau = {
      size,
      saveur,
      filling,
      prix: Number(prix)
    };

    const url = editId
      ? `${import.meta.env.VITE_BACKEND_URL}/api/gateaux/${editId}`
      : `${import.meta.env.VITE_BACKEND_URL}/api/gateaux`;

    const method = editId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(gateau)
    });

    if (response.ok) {
      alert(editId ? "Gâteau modifié!" : "Gâteau ajouté!");
      resetForm();
      fetchGateaux();
    } else {
      alert("Erreur.");
    }
  };

  const modifierGateau = (gateau) => {
    setEditId(gateau._id);
    setSize(gateau.size);
    setSaveur(gateau.saveur);
    setFilling(gateau.filling);
    setPrix(gateau.prix);
  };

  const supprimerGateau = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/gateaux/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    if (response.ok) {
      alert("Gâteau supprimé!");
      fetchGateaux();
    }
  };

  return (
    <div className="page">
      <h1>Admin - Gestion des gâteaux</h1>

      <form onSubmit={submitHandler} className="form">
        <label>Taille</label>
        <input value={size} onChange={(e) => setSize(e.target.value)} required />

        <label>Saveur</label>
        <input value={saveur} onChange={(e) => setSaveur(e.target.value)} required />

        <label>Filling</label>
        <input value={filling} onChange={(e) => setFilling(e.target.value)} required />

        <label>Prix</label>
        <input
          type="number"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          required
        />

        <button type="submit">{editId ? "Modifier" : "Ajouter"}</button>

        {editId && (
          <button type="button" onClick={resetForm}>
            Annuler
          </button>
        )}
      </form>

      <h2>Liste des gâteaux</h2>

      {gateaux.map((gateau) => (
        <div className="cart-item" key={gateau._id}>
          <h3>{gateau.size}</h3>
          <p>Saveur : {gateau.saveur}</p>
          <p>Filling : {gateau.filling}</p>
          <p>Prix : {gateau.prix} $</p>

          <button onClick={() => modifierGateau(gateau)}>Modifier</button>
          <button onClick={() => supprimerGateau(gateau._id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
}

export default Admin;