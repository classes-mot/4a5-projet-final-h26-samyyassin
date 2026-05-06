function Panier({ panier, supprimerDuPanier }) {
  const total = panier.reduce((somme, item) => somme + item.prix, 0);

  return (
    <div className="page">
      <h1>Ton panier</h1>

      {panier.length === 0 ? (
        <p>Ton panier est vide.</p>
      ) : (
        <>
          {panier.map((item, index) => (
            <div className="cart-item" key={index}>
              <h3>Gâteau {item.size}</h3>
              <p>Saveur : {item.saveur}</p>
              <p>Filling : {item.filling}</p>
              <p>Quantité : {item.quantite}</p>
              <p>Prix : {item.prix} $</p>
              <button onClick={() => supprimerDuPanier(index)}>Supprimer</button>
            </div>
          ))}

          <h2>Total : {total} $</h2>
        </>
      )}
    </div>
  );
}

export default Panier;