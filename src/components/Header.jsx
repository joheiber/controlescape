"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from "next/link";

function Header() {
    const [busqueda, setBusqueda] = useState('');
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (busqueda.trim() === '') return;
        const temporizador = setTimeout(() => {
            router.push(`/buscar?q=${busqueda}`);
        }, 500)
        return () => clearTimeout(temporizador);
    }, [busqueda]);

    return (
        <header className="bg-black border-b border-gray-800 px-8 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-black tracking-tight">
                control<span className="text-red-600">Escape</span>
            </Link>

            <div className="relative w-full max-w-md mx-8">
                <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar juegos, noticias..."
                    className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
            </div>

            <nav className="flex items-center gap-8 text-sm font-medium">
                <Link href="/" className="text-white hover:text-red-500 transition-colors">Inicio</Link>
                <a href="" className="text-gray-400 hover:text-red-500 transition-colors">Populares</a>
                <a href="" className="text-gray-400 hover:text-red-500 transition-colors">Lanzamientos</a>
                <a href="" className="text-gray-400 hover:text-red-500 transition-colors">Reseñas</a>

                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-800">
                    {status === "loading" ? null : session ? (
                        <>
                            <Link href="/perfil" className="text-gray-300 hover:text-white">
                                {session.user.name}
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="text-gray-400 hover:text-red-500"
                            >
                                Salir
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-300 hover:text-white">
                                Iniciar sesión
                            </Link>
                            <Link
                                href="/registro"
                                className="border border-red-600 text-red-500 px-4 py-1.5 rounded-md text-xs font-bold hover:bg-red-600 hover:text-white transition-colors"
                            >
                                REGISTRARSE
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;