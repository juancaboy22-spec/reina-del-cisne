'use client'
import { MessageCircle } from 'lucide-react'
 
export default function WhatsAppButton() {
  const number  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const message = encodeURIComponent(
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
    'Hola, estoy interesado en una propiedad'
  )
  const url = `https://wa.me/${number}?text=${message}`
 
  return (
    <a href={url} target='_blank' rel='noopener noreferrer'
       aria-label='Chatear por WhatsApp'
       className='fixed bottom-6 right-6 z-50
                  bg-green-500 hover:bg-green-600
                  text-white rounded-full p-4 shadow-2xl
                  flex items-center gap-2 group transition-all duration-300
                  hover:pr-6 overflow-hidden'>
      <MessageCircle size={28} className='shrink-0' />
      <span className='max-w-0 group-hover:max-w-xs transition-all
                       duration-300 whitespace-nowrap overflow-hidden text-sm font-semibold'>
        Escríbenos
      </span>
    </a>
  )
}
