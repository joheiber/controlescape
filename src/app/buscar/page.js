"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BarraFiltros from '@/components/BarraFiltros';
import GameCard from '@/components/GameCard';
import Header from '@/components/Header';

export default function Buscar() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [genero, setGenero] = useState('todos');
  const [plataforma, setPlataforma] = useState('todos');

  const NOMBRES_PLATAFORMAS = {
    '4': 'PC',
    '187': 'PlayStation 5',
    '1': 'Xbox One',
    '18': 'PlayStation 4',
  };
  const GENEROS = [
    { slug: 'todos', nombre: 'Todos' },
    { slug: 'action', nombre: 'Acción' },
    { slug: 'adventure', nombre: 'Aventura' },
    { slug: 'rpg', nombre: 'RPG' },
    { slug: 'strategy', nombre: 'Estrategia' },
    { slug: 'shooter', nombre: 'Disparos' },
    { slug: 'puzzle', nombre: 'Puzzle' },
    { slug: 'racing', nombre: 'Carreras' },
    { slug: 'sports', nombre: 'Deportes' },
    { slug: 'simulation', nombre: 'Simulación' },
    { slug: 'indie', nombre: 'Indie' },
    { slug: 'casual', nombre: 'Casual' },
    { slug: 'family', nombre: 'Familiar' },
    { slug: 'fighting', nombre: 'Pelea' },
    { slug: 'platformer', nombre: 'Plataformas' },
  ];

  useEffect(() => {
    async function buscarJuegos() {
      if (!query) return;
      setCargando(true);
      const filtroGenero = genero !== 'todos' ? `&genres=${genero}` : '';
      const filtroPlataforma = plataforma !== 'todos' ? `&platforms=${plataforma}` : '';

      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${query}&page=${pagina}${filtroGenero}${filtroPlataforma}`
        );
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        setResultados(data.results);

        const paginas = Math.ceil(data.count / 20);
        setTotalPaginas(paginas > 0 ? paginas : 1);
      } catch (error) {
        console.error("Error al buscar juegos:", error);
        setResultados([]);
      } finally {
        setCargando(false);
      }
    }

    buscarJuegos();
  }, [query, pagina, genero, plataforma]);

  useEffect(() => {
    setPagina(1);
  }, [query, genero, plataforma]);

  function handleFiltroGenero(nuevoGenero) {
    setGenero(nuevoGenero);
  }
  function handleFiltroPlataforma(nuevaPlataforma) {
    setPlataforma(nuevaPlataforma);
  }

  return (
    <>
      <Header />
      <BarraFiltros
        opciones={GENEROS.map(g => g.slug)}
        etiquetas={Object.fromEntries(GENEROS.map(g => [g.slug, g.nombre]))}
        filtroActivo={genero}
        onFiltrar={handleFiltroGenero}
      />
      <BarraFiltros
        opciones={['todos', '4', '187', '1', '18']}
        etiquetas={{ todos: 'TODOS', '4': 'PC', '187': 'PS5', '1': 'XBOX ONE', '18': 'PS4' }}
        filtroActivo={plataforma}
        onFiltrar={handleFiltroPlataforma}
      />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {`Resultados para: "${query}"`}
        </h1>

        {cargando ? (
          <p className="mt-4 text-gray-500">Buscando...</p>
        ) : resultados.length === 0 ? (
          <p className="mt-4 text-gray-500">No se encontraron juegos.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {resultados.map((juego) => (
                <GameCard key={juego.id} juego={juego} />
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                .slice(Math.max(0, pagina - 3), pagina + 2)
                .map((numeroPagina) => (
                  <button
                    key={numeroPagina}
                    onClick={() => setPagina(numeroPagina)}
                    className={`px-3 py-1 rounded-lg ${numeroPagina === pagina
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    {numeroPagina}
                  </button>
                ))}
            </div>
          </>
        )}
      </div>
    </>

  );
}