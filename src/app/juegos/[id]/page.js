export default async function DetalleJuego({ params }) {
  const { id } = await params;

  async function obtenerDetalleJuego(id) {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
      );
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el detalle del juego:", error);
      return null;
    }
  }

  const juego = await obtenerDetalleJuego(id);

  if (!juego) {
    return <p>No se pudo cargar la información del juego.</p>;
  }

  return (
    <div className="p-6">
      <img
        src={juego.background_image}
        alt={juego.name}
        className="w-full h-80 object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{juego.name}</h1>
      <p className="text-gray-600 mt-2">⭐ {juego.rating}</p>
    </div>
  );
}