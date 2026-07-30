"use client";
import { useState, useEffect } from 'react';

import GameCard from '@/components/GameCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';


export default function Home() {
  const [juegos, setJuegos] = useState([]);

  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    async function obtenerJuegos({ ordering = '', pageSize = 20 } = {}) {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&ordering=${ordering}&page_size=${pageSize}`
        );
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error("Error al obtener juegos:", error);
        return [];
      }
    }

    async function cargarTodo() {
      const listado = await obtenerJuegos({ pageSize: 20 });
      const destacadosData = await obtenerJuegos({ ordering: '-added', pageSize: 5 });
      setJuegos(listado);
      setDestacados(destacadosData);
    }

    cargarTodo();
  }, []);


  return (
    <main className="flex flex-col">
      <Header />
      <Hero juegosDestacados={destacados} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">

        {juegos.map((juego) => (
          <GameCard key={juego.id} juego={juego} />
        ))}

      </div>

      <Footer />
    </main>
  );
}
