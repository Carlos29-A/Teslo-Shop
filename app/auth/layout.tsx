import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  /* Verificar si el usuario está autenticado y si es así, redirigir a la página de inicio */
  const session = await auth()
  if( session) {
    redirect('/')

  }
  return (
    <main className='flex justify-center '>
        <div className='w-full sm:w-[350px] px-10'>
          { children}
        </div>
    </main>
  )
}