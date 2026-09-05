import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    return <p className="p-6">No se pudo cargar la información del juego.</p>;
  }

  return (
    <>
    <Header />
    <div>
      <div className="w-full h-80 relative">
        <img
          src={juego.background_image}
          alt={juego.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-16 relative">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800">{juego.name}</h1>
          <p className="text-yellow-500 mt-1">⭐ {juego.rating} / 5</p>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            <span>📅 {juego.released}</span>
            <span>🎮 {juego.platforms?.map(p => p.platform.name).join(', ')}</span>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Descripción</h2>
            <p className="text-gray-600 mt-2 leading-relaxed">
              {juego.description_raw}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {juego.genres?.map((genero) => (
              <span
                key={genero.id}
                className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"
              >
                {genero.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  );
}