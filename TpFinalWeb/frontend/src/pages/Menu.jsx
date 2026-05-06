function Menu() {
  return (
    <div className="page">
      <h1>Menu</h1>

      <div className="cards">
        <div className="card">
          <h2>4 pouces</h2>
          <p>Petit gâteau personnalisé</p>
          <h3>35 $</h3>
        </div>

        <div className="card">
          <h2>6 pouces</h2>
          <p>Format classique pour plusieurs portions</p>
          <h3>60 $</h3>
        </div>

        <div className="card">
          <h2>8 pouces</h2>
          <p>Grand gâteau pour événements</p>
          <h3>85 $</h3>
        </div>
      </div>
    </div>
  );
}

export default Menu;