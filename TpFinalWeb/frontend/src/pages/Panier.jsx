function Panier({ panier, supprimerDuPanier, t }) {
  const total = panier.reduce((somme, item) => somme + item.prix, 0);

  return (
    <div className="page">
      <h1>{t.yourCart}</h1>

      {panier.length === 0 ? (
        <p>{t.emptyCart}</p>
      ) : (
        <>
          {panier.map((item, index) => (
            <div className="cart-item" key={index}>
              <h3>Gâteau {item.size}</h3>
              <p>{t.flavor} : {item.saveur}</p>
              <p>Filling : {item.filling}</p>
              <p>{t.quantity} : {item.quantite}</p>
              <p>Prix : {item.prix} $</p>
              <button onClick={() => supprimerDuPanier(index)}>Supprimer</button>
            </div>
          ))}

          <h2>{t.total} : {total} $</h2>
        </>
      )}
    </div>
  );
}

export default Panier;