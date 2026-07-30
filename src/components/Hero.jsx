"use client";
import { useState, useEffect } from 'react';

function Hero({ juegosDestacados }) {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (juegosDestacados.length === 0) return;

    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % juegosDestacados.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, [juegosDestacados.length]);

  if (juegosDestacados.length === 0) {
    return <div className="h-96 w-full bg-gray-200 animate-pulse" />;
  }

  const juegoActual = juegosDestacados[indice];

  return (
    <div className="relative h-96 w-full overflow-hidden">
      <img
        src={juegoActual.background_image}
        alt={juegoActual.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8">
        <h2 className="text-4xl font-bold text-white">{juegoActual.name}</h2>
        <p className="text-white mt-2">⭐ {juegoActual.rating}</p>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2">
        {juegosDestacados.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndice(i)}
            className={`w-3 h-3 rounded-full ${i === indice ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;