"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, TreePine, Home } from "lucide-react";

const FILTERS = [
  { label: "Todos", value: "", icon: LayoutGrid },
  { label: "Lotes", value: "lote", icon: TreePine },
  { label: "Casas", value: "casa", icon: Home },
];

export function PropertyFilters({ total }: { total: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tipoActivo = searchParams.get("tipo") ?? "";

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("tipo", value);
    } else {
      params.delete("tipo");
    }
    router.push(`/propiedades?${params.toString()}`);
  };

  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Tabs de filtro */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit">
          {FILTERS.map(({ label, value, icon: Icon }) => {
            const activo = tipoActivo === value;
            return (
              <button
                key={value}
                onClick={() => handleFilter(value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activo
                    ? "bg-navy-700 text-white shadow-sm"
                    : "text-gray-500 hover:text-navy-700 hover:bg-white"
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            );
          })}
        </div>

        {/* Contador */}
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-navy-700">{total}</span>{" "}
          {total === 1 ? "propiedad encontrada" : "propiedades encontradas"}
        </p>
      </div>
    </div>
  );
}
