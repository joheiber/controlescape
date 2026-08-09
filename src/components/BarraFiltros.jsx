"use client";

import { useState } from 'react';

function BarraFiltros({ opciones, juegos, campoFiltro, onFiltrar }) {
  const [filtroActivo, setFiltroActivo] = useState('todos');

  const conteos = opciones.reduce((acc, opcion) => {
    acc[opcion] = opcion === 'todos'
      ? juegos.length
      : juegos.filter((j) => j[campoFiltro] === opcion).length;
    return acc;
  }, {});

  function handleClick(opcion) {
    setFiltroActivo(opcion);
    onFiltrar(opcion);
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {opciones.map((opcion) => (
        <button
          key={opcion}
          onClick={() => handleClick(opcion)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
            filtroActivo === opcion
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {opcion.toUpperCase()}
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            filtroActivo === opcion ? 'bg-red-800' : 'bg-gray-700'
          }`}>
            {conteos[opcion]}
          </span>
        </button>
      ))}
    </div>
  );
}

export default BarraFiltros;