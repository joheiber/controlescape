function GameCard({ juego }) {
  const { name, rating } = juego;
  

  const imagen = juego.background_image ?? "https://via.placeholder.com/150";

  return (
    <div className="card">
      <img src={imagen} alt={name} />
      <h2>{name}</h2>
      <p>Rating: {rating}</p>
    </div>
  );
}

export default GameCard;