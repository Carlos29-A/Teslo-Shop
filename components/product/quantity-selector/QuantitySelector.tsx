"use client";

import { IoMdAddCircleOutline } from "react-icons/io";
import { IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity : number;
    onQuantityChange: ( quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {

    const onQuantityChanged = ( value : number ) => {
        if ( quantity + value < 1 ) return;
        onQuantityChange( quantity + value );
    }
  
    return (
        <div className="flex">
            <button onClick={ () => onQuantityChanged( -1 ) } className="cursor-pointer">
                <IoRemoveCircleOutline  size={ 30 } />
            </button>

            <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
                { quantity }
            </span>

            <button onClick={ () => onQuantityChanged( 1 ) } className="cursor-pointer">
                <IoMdAddCircleOutline  size={ 30 } />
            </button>
        </div>
    )
}
