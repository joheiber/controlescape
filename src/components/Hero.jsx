"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

function Hero({ juegosDestacados }) {
  
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (juegosDestacados.length === 0) return;
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % juegosDestacados.length);
    }, 6000);
    return () => clearInterval(intervalo);
  }, [juegosDestacados.length]);

  if (juegosDestacados.length === 0) {
    return <div className="h-[600px] w-full bg-gray-900 animate-pulse" />;
  }

  const juegoActual = juegosDestacados[indice];

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <img
        src={juegoActual.background_image}
        alt={juegoActual.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

      <div className="absolute bottom-16 left-8 max-w-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-px bg-red-600" />
          <span className="text-red-500 text-xs font-bold tracking-widest uppercase">
            Destacado de la semana
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">
          {juegoActual.name}
        </h1>

        <div className="flex items-center gap-3 text-sm text-gray-300 mb-6">
          <span className="flex items-center gap-1 text-yellow-500 font-bold">
            ⭐ {juegoActual.rating}
          </span>
          <span className="text-gray-600">|</span>
          <span>{juegoActual.platforms?.[0]?.platform.name}</span>
        </div>

        <Link
          href={`/juegos/${juegoActual.id}`}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-3 rounded-md transition-colors"
        >
          LEER ANÁLISIS →
        </Link>
      </div>

      <div className="absolute bottom-8 right-8 flex items-center gap-3">
        {juegosDestacados.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndice(i)}
            className={`h-0.5 transition-all ${i === indice ? 'w-8 bg-red-600' : 'w-4 bg-gray-600'
              }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;