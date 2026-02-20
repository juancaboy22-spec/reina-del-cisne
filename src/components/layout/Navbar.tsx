"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { toast } from "sonner";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/", label: "Inicio" },
    { href: "/propiedades", label: "Propiedades" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-navy-700 shadow-lg">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Reina del Cisne"
            width={50}
            height={50}
            className="object-contain"
          />
          <div className="hidden sm:block">
            <div className="text-gold-400 text-xs font-semibold tracking-widest uppercase">
              Inmobiliaria
            </div>
            <div className="text-white font-serif text-2xl font-bold leading-tight group-hover:text-gold-400 transition-colors">
              Reina del Cisne
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gold-100 hover:text-gold-400 font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:+593996009652"
            className="flex items-center gap-2 btn-gold text-sm"
            onClick={(e) => {
              if (window.innerWidth > 768) {
                e.preventDefault();
                navigator.clipboard.writeText("+593 99 600 9652");
                toast.success("Número copiado al portapapeles", {
                  description: "+593 99 600 9652",
                });
              }
            }}
          >
            <Phone size={16} /> Llámanos
          </a>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-900 px-4 pb-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-gold-100 hover:text-gold-400 py-2"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
