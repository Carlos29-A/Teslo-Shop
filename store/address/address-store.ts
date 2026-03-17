import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    address : {
        name: string;
        lastName: string;
        dni: string;
        phone: string;
        department: string;
        province: string;
        district: string;
        postalCode: string;
        address: string;
        reference?: string;
    };
    //Methods
    saveAddress: (address: State['address']) => void;
}


export const useAddressStore = create<State>()(
    persist(
        (set, get) => ({
            address: {
                name: '',
                lastName: '',
                dni: '',
                phone: '',
                department: '',
                province: '',
                district: '',
                postalCode: '',
                address: '',
            },
            saveAddress: (address: State['address']) => {
                set({ address });
            },
        }),
        {
            name: 'address',
        }
    )
)