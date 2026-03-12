import { Title } from '@/components';
import Link from 'next/link';

const departamentos = [
  'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho',
  'Cajamarca', 'Callao', 'Cusco', 'Huancavelica', 'Huánuco',
  'Ica', 'Junín', 'La Libertad', 'Lambayeque', 'Lima',
  'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura',
  'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali',
];

export default function AddressPage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

      <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left">

        <Title title="Dirección de entrega" subtitle="Ingresa los datos para el envío dentro de Perú" />

        <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">

          <div className="flex flex-col mb-2">
            <span>Nombres</span>
            <input
              type="text"
              placeholder="Ej: Juan Carlos"
              className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Apellidos</span>
            <input
              type="text"
              placeholder="Ej: Pérez García"
              className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>DNI / Documento de identidad</span>
            <input
              type="text"
              maxLength={ 12 }
              placeholder="Ej: 12345678"
              className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Teléfono</span>
            <div className="flex">
              <span className="flex items-center px-3 bg-gray-300 rounded-l-md text-gray-600 text-sm">
                +51
              </span>
              <input
                type="tel"
                maxLength={ 9 }
                placeholder="Ej: 987654321"
                className="p-2  rounded-r-md bg-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex flex-col mb-2">
            <span>Departamento</span>
            <select className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">[ Seleccione ]</option>
              { departamentos.map(dep => (
                <option key={ dep } value={ dep }>{ dep }</option>
              )) }
            </select>
          </div>

          <div className="flex flex-col mb-2">
            <span>Provincia</span>
            <input
              type="text"
              placeholder="Ej: Lima"
              className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Distrito</span>
            <input
              type="text"
              placeholder="Ej: Miraflores"
              className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Código postal</span>
            <input
              type="text"
              maxLength={ 5 }
              placeholder="Ej: 15074"
              className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col mb-2 sm:col-span-2">
            <span>Dirección</span>
            <input
              type="text"
              placeholder="Ej: Av. Larco 345"
              className="p-2  rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col mb-2 sm:col-span-2">
            <span>Referencia (opcional)</span>
            <input
              type="text"
              placeholder="Ej: Frente al parque, edificio azul"
              className="p-2  rounded-md bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col mb-2 sm:mt-5">
            <Link
              href="/checkout"
              className="btn-primary flex w-full sm:w-1/2 justify-center"
            >
              Siguiente
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}