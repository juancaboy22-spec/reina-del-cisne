import { createClient } from "@/lib/supabase/server";
import { Propiedad, FiltrosPropiedades } from "@/types";

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
    return data || [];
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
    return data || [];
  },

  async obtenerPorId(id: string): Promise<Propiedad | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("propiedades")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("PropiedadesRepository.obtenerPorId:", error);
      return null;
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

    const { data, error } = await supabase
      .from("propiedades")
      .insert({ ...datos, codigo_propiedad: codigoPropiedad })
      .select()
      .single();

    return { data, error: error?.message || null };
  },

  async actualizar(
    id: string,
    datos: Partial<Propiedad>,
  ): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const { error } = await supabase
      .from("propiedades")
      .update({ ...datos, updated_at: new Date().toISOString() })
      .eq("id", id);

    return { error: error?.message || null };
  },

  async eliminar(id: string): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const { error } = await supabase.from("propiedades").delete().eq("id", id);

    return { error: error?.message || null };
  },
};
