"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Home, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  const handleLogout = () => {
    setIsLoggingOut(true);
    supabase.auth.signOut().finally(() => {
      router.push("/admin/login");
    });
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-navy-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-serif">
              Panel Administrativo
            </h1>
            <Link
              href="/"
              className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            >
              <Home size={18} />
              Ir al Inicio
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-navy-700 border-b-4 border-gold-400">
        <div className="container mx-auto px-4 py-4 flex gap-8 items-center">
          <Link
            href="/admin/dashboard"
            className="text-gold-400 hover:text-gold-300 transition-all duration-300 font-semibold text-lg relative group"
          >
            Dashboard
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/admin/propiedades"
            className="text-gold-400 hover:text-gold-300 transition-all duration-300 font-semibold text-lg relative group"
          >
            Propiedades
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/admin/contactos"
            className="text-gold-400 hover:text-gold-300 transition-all duration-300 font-semibold text-lg relative group"
          >
            Contactos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-300 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="ml-auto flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut size={18} />
            {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 animate-fadeIn">
        {children}
      </main>
    </div>
  );
}
