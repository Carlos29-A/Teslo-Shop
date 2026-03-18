import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { auth } from '@/auth';
import { getUserAddrss } from '@/actions';
import { Address } from '@/interfaces';



export default async function AddressPage() {
  
  const session = await auth();
  

  const userAddress = await getUserAddrss(session?.user?.id as string)



  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

      <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left">

        <Title title="Dirección de entrega" subtitle="Ingresa los datos para el envío dentro de Perú" />

        <AddressForm userAddress={ userAddress as Address } />
      </div>
    </div>
  );
}