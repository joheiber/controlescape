"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleCredentialsLogin(e) {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Iniciar sesión</h1>

      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          Continuar con Google
        </button>
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          Continuar con GitHub
        </button>
      </div>

      <hr className="mb-6" />

      <form onSubmit={handleCredentialsLogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-900 text-white rounded-lg"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}