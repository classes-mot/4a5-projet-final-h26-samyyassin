import { useState } from "react";

function Commander({ panier, setPanier }) {
  const [email, setEmail] = useState("");

  const total = panier.reduce((somme, item) => somme + item.prix, 0);

  const envoyerCommande = async (e) => {
    e.preventDefault();

    const commande = {
      email,
      items: panier,
      total
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(commande)
      });

      if (response.ok) {
        alert("Commande envoyée avec succès!");
        setPanier([]);
        setEmail("");
      } else {
        alert("Erreur lors de la commande.");
      }
    } catch (error) {
      console.log(error);
      alert("Impossible de contacter le serveur.");
    }
  };

  return (
    <div className="page">
      <h1>Passer une commande</h1>

      {panier.length === 0 ? (
        <p>Ton panier est vide.</p>
      ) : (
        <form onSubmit={envoyerCommande} className="form">
          <label>Email</label>
          <input
            type="email"
            placeholder="client@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <h3>Total à payer : {total} $</h3>

          <button type="submit">Envoyer la commande</button>
        </form>
      )}
    </div>
  );
}

export default Commander;