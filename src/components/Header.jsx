"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
function Header() {

    const [busqueda, setBusqueda] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (busqueda.trim() === '') {
            return;
        }
        const temporizador = setTimeout(() => {
            router.push(`/buscar?q=${busqueda}`);
        }, 500)
        return () => clearTimeout(temporizador);
    }, [busqueda]);

    return (
        <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
                controlEscape
            </Link>

            <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar juego..."
                className="px-3 py-1 rounded text-black bg-white"
            />

            <nav className="flex gap-6">
                <Link href="/" className="hover:text-gray-300">Inicio</Link>
                <a href="" className="hover:text-gray-300">Populares</a>
                <a href="" className="hover:text-gray-300">Últimos lanzamientos</a>
                <a href="" className="hover:text-gray-300">Reseñas</a>
            </nav>
        </header>
    );
}

export default Header;