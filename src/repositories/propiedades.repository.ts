import { createClient } from "@/lib/supabase/server";
import { Propiedad, FiltrosPropiedades } from "@/types";

// Función auxiliar para normalizar imagenes desde diferentes formatos
function normalizeImagenes(imagenes: any): any[] {
  if (!imagenes) return [];

  // Si es string, intenta parsearlo
  if (typeof imagenes === "string") {
    try {
      const parsed = JSON.parse(imagenes);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      // Si es una URL directa como string
      return [{ url: imagenes, publicId: "" }];
    }
  }

  // Si ya es un array
  if (Array.isArray(imagenes)) {
    return imagenes.map((img: any) => {
      if (typeof img === "string") {
        return { url: img, publicId: "" };
      }
      if (typeof img === "object" && img !== null) {
        return {
          url: img.url || img.publicId || "",
          publicId: img.publicId || "",
          ...img,
        };
      }
      return { url: "", publicId: "" };
    });
  }

  // Si es un objeto individual
  if (typeof imagenes === "object" && imagenes !== null) {
    return [
      {
        url: imagenes.url || "",
        publicId: imagenes.publicId || "",
        ...imagenes,
      },
    ];
  }

  return [];
}

export const PropiedadesRepository = {
  async listar(filtros: FiltrosPropiedades = {}): Promise<Propiedad[]> {
    const supabase = await createClient();
    let query = supabase
      .from("propiedades")
      .select("*")
      .eq("disponible", true)
      .order("created_at", { ascending: false });

    if (filtros.tipo) query = query.eq("tipo", filtros.tipo);
    if (filtros.precioMin) query = query.gte("precio", filtros.precioMin);
    if (filtros.precioMax) query = query.lte("precio", filtros.precioMax);
    if (filtros.ciudad) query = query.ilike("ciudad", `%${filtros.ciudad}%`);

    const { data, error } = await query;
    if (error) {
      console.error("PropiedadesRepository.listar:", error);
      return [];
    }

    // Normalizar imagenes en todos los registros
    return (data || []).map((item) => ({
      ...item,
      imagenes: normalizeImagenes(item.imagenes),
    }));
  },

  async listarDestacadas(limite = 3): Promise<Propiedad[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("propiedades")
      .select("*")
      .eq("disponible", true)
      .eq("destacado", true)
      .order("created_at", { ascending: false })
      .limit(limite);

    if (error) {
      console.error("PropiedadesRepository.listarDestacadas:", error);
      return [];
    }

    return (data || []).map((item) => ({
      ...item,
      imagenes: normalizeImagenes(item.imagenes),
    }));
  },

  async obtenerPorId(id: string): Promise<Propiedad | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("propiedades")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(
        "PropiedadesRepository.obtenerPorId - Error:",
        error.message,
        "ID:",
        id,
      );
      return null;
    }

    if (data) {
      data.imagenes = normalizeImagenes(data.imagenes);
    }

    return data;
  },

  async contar(): Promise<number> {
    const supabase = await createClient();
    const { count } = await supabase
      .from("propiedades")
      .select("*", { count: "exact", head: true });
    return count || 0;
  },

  async contarDisponibles(): Promise<number> {
    const supabase = await createClient();
    const { count } = await supabase
      .from("propiedades")
      .select("*", { count: "exact", head: true })
      .eq("disponible", true);
    return count || 0;
  },

  async crear(
    datos: Omit<Propiedad, "id" | "created_at" | "updated_at">,
  ): Promise<{ data: Propiedad | null; error: string | null }> {
    const supabase = await createClient();

    // Obtener el total de propiedades para generar el siguiente código
    const { count } = await supabase
      .from("propiedades")
      .select("*", { count: "exact", head: true });

    const nextNumber = (count || 0) + 1;
    const codigoPropiedad = `PROP-${String(nextNumber).padStart(3, "0")}`;

    // Asegurar que imagenes se guarden en formato correcto
    const datosGuardar = {
      ...datos,
      codigo_propiedad: codigoPropiedad,
      imagenes: Array.isArray(datos.imagenes) ? datos.imagenes : [],
    };

    const { data, error } = await supabase
      .from("propiedades")
      .insert(datosGuardar)
      .select()
      .single();

    if (data) {
      data.imagenes = normalizeImagenes(data.imagenes);
    }

    return { data, error: error?.message || null };
  },

  async actualizar(
    id: string,
    datos: Partial<Propiedad>,
  ): Promise<{ error: string | null }> {
    const supabase = await createClient();

    // Normalizar imagenes si están incluidas
    const datosActualizar = {
      ...datos,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("propiedades")
      .update(datosActualizar)
      .eq("id", id);

    return { error: error?.message || null };
  },

  async listarAdmin(filtros: { busqueda?: string; tipo?: string } = {}): Promise<Propiedad[]> {
    const supabase = await createClient();
    let query = supabase
      .from("propiedades")
      .select("*")
      .order("created_at", { ascending: false });

    if (filtros.tipo) query = query.eq("tipo", filtros.tipo);
    if (filtros.busqueda) {
      query = query.or(
        `titulo.ilike.%${filtros.busqueda}%,codigo_propiedad.ilike.%${filtros.busqueda}%`
      );
    }

    const { data, error } = await query;
    if (error) {
      console.error("PropiedadesRepository.listarAdmin:", error);
      return [];
    }

    return (data || []).map((item) => ({
      ...item,
      imagenes: normalizeImagenes(item.imagenes),
    }));
  },

  async eliminar(id: string): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const { error } = await supabase.from("propiedades").delete().eq("id", id);

    return { error: error?.message || null };
  },
};
