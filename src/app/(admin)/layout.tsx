"use client";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-navy-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-serif">
              Panel Administrativo
            </h1>
            <Link
              href="/"
              className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <Home size={18} />
              Ir al Inicio
            </Link>
          </div>
        </div>
      </div>

      <nav className="bg-navy-700 border-b-4 border-gold-400">
        <div className="container mx-auto px-4 py-4 flex gap-8">
          <Link
            href="/admin/dashboard"
            className="text-gold-400 hover:text-gold-300 transition-colors font-semibold text-lg"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/propiedades"
            className="text-gold-400 hover:text-gold-300 transition-colors font-semibold text-lg"
          >
            Propiedades
          </Link>
          <Link
            href="/admin/contactos"
            className="text-gold-400 hover:text-gold-300 transition-colors font-semibold text-lg"
          >
            Contactos
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
