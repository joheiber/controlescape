"use client";
import { useState, useEffect } from 'react';

import GameCard from '@/components/GameCard';
import Header from '@/components/Header';

export default function Home() {
  const [juegos, setJuegos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    async function obtenerJuegos(id) {
      try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      }
    }

    async function cargarTodo() {
      const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const resultados = await Promise.all(ids.map((id) => obtenerJuegos(id)));
      setJuegos(resultados);
    }

    cargarTodo();
  }, []);

  const juegosFiltrados = juegos.filter((juego) =>
    juego.name.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
    <main >
      <Header />
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar juego..."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {juegosFiltrados.map((juego) => (
          <GameCard key={juego.id} juego={juego} />
        ))}
      </div>
    </main>
  );
}
