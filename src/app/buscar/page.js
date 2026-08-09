"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import GameCard from '@/components/GameCard';

import Header from '@/components/Header';

export default function Buscar() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function buscarJuegos() {
      if (!query) return;

      setCargando(true);
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${query}`
        );
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        setResultados(data.results);
      } catch (error) {
        console.error("Error al buscar juegos:", error);
        setResultados([]);
      } finally {
        setCargando(false);
      }
    }

    buscarJuegos();
  }, [query]);

  return (
    <>
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">
        </h1>

        {cargando ? (
          <p className="mt-4 text-gray-500">Buscando...</p>
        ) : resultados.length === 0 ? (
          <p className="mt-4 text-gray-500">No se encontraron juegos.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {resultados.map((juego) => (
              <GameCard key={juego.id} juego={juego} />
            ))}
          </div>
        )}
      </div> </>

  );
}