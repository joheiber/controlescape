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

            <nav className="flex gap-6 items-center">
                <Link href="/" className="hover:text-gray-300">Inicio</Link>
                <a href="" className="hover:text-gray-300">Populares</a>
                <a href="" className="hover:text-gray-300">Últimos lanzamientos</a>
                <a href="" className="hover:text-gray-300">Reseñas</a>

                {status === "loading" ? null : session ? (
                    <>
                        <Link href="/perfil" className="hover:text-gray-300">
                            {session.user.name}
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="hover:text-gray-300"
                        >
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="hover:text-gray-300">
                            Iniciar sesión
                        </Link>
                        <Link href="/registro" className="hover:text-gray-300">
                            Registrarse
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;