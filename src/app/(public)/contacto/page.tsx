import ContactForm from "@/components/contact/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para más información sobre nuestras propiedades en Loja, Ecuador.",
};

export default function ContactoPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Contáctanos</h1>
        <p className="text-gray-600 text-center mb-8">
          Estamos aquí para ayudarte a encontrar tu propiedad ideal
        </p>

        <ContactForm />

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Ubicación</h3>
            <p className="text-gray-600">Loja, Ecuador</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
            <p className="text-gray-600">+593 99 600 9652</p>
          </div>
        </div>
      </div>
    </div>
  );
}
