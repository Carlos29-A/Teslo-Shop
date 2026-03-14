import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];
    
    getTotalItems: () => number;
    
    addProductToCart: (product: CartProduct) => void;
    updateCartQuantity: (product: CartProduct, quantity: number) => void;
    // updateCartQuantity
    removeProductFromCart: (product: CartProduct) => void;
    subTotal : () => number;
    tax : () => number;
    total : () => number;
}


export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],
    
            //Methods
            addProductToCart: (product: CartProduct) => {
                const { cart } = get();
            
                //1.- Revisar si el producto ya existe en el carrito
                const productInCart = cart.some( p => p.id === product.id && p.sizes === product.sizes);
    
                if(!productInCart){
                    return set({
                        cart: [...cart, product]
                    })
                }
    
                // 2.- Se que el producto existe en el carrito por lo tanto solo actualizo la cantidad
                const updatedProducts = cart.map((item) => {
                    if (item.id === product.id && item.sizes === product.sizes){
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity
                        }
                    }
                    return item;
                })
                set({
                    cart: updatedProducts
                })
            },
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((acc, item) => acc + item.quantity, 0);
            },
            updateCartQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();
                const updatedProducts = cart.map((item) => {
                    if (item.id === product.id && item.sizes === product.sizes){
                        return {
                            ...item,
                            quantity: quantity
                        }
                    }
                    return item;
                })
                set({
                    cart: updatedProducts
                })
            },
            removeProductFromCart: (product: CartProduct) => {
                const { cart } = get();
                const updatedProducts = cart.filter((item) => item.id !== product.id || item.sizes !== product.sizes);
                return set({
                    cart: updatedProducts
                })
            },
            subTotal: () => {
                const { cart } = get();
                return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            },
            tax: () => {
                return get().subTotal() * 0.15;
            },
            total: () => {
                return get().subTotal() + get().tax();
            }
        })
        ,{
            name: "shopping-cart",
        }
    )
    
)