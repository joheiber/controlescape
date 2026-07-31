import Link from 'next/link';

function GameCard({ juego }) {
  const { name, rating } = juego;
  

  const imagen = juego.background_image ?? "https://via.placeholder.com/150";

  return (
    <Link href={`/juegos/${juego.id}`} className="no-underline">
      <div className="card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img src={imagen} alt={name} className="w-full h-48 object-cover" />
         <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 truncate">{name}</h2>
          <p className="text-sm text-gray-500 mt-1">⭐ {rating}</p>
      </div>
    </div>
     </Link>
  );
}

export default GameCard;