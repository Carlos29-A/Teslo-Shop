"use server";

import { PayPalOrderStatusResponse } from "@/interfaces";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async ( paypaltransactionId: string, orderId: string ) => {

    const authToken = await getPaypalBearerToken();

    if( !authToken ) {
        return {
            ok: false,
            message: "Error al obtener el token de PayPal",
        }
    }
    const resp = await verifyPaypalPayment(authToken, paypaltransactionId);

    if ( !resp) {
        return {
            ok: false,
            message: "Error al verificar el pago de PayPal",
        }
    }

    const { status } = resp;

    if( status !== 'COMPLETED' ) {
        return {
            ok: false,
            message: "El pago no se ha completado",
        }
    }

    //Todo: Realizar la actualización de la orden en la base de datos
    try{

        await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                isPaid: true,
                paidAt: new Date(),
            }
        })

    //TODO: Revalidar el path
    revalidatePath(`/orders/${orderId}`);

    return {
        ok: true,
        message: "Orden actualizada en la base de datos",
    }
        
    }catch(error){
        console.error(error);
        return {
            ok: false,
            message: "500 - Error al actualizar la orden en la base de datos",
        }
    }
}   


const getPaypalBearerToken = async () : Promise<string | null> => {
    
    
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const oauthUrl = process.env.PAYPAL_OAUTH_URL;

    const base64Token = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
        'utf-8'
    ).toString('base64');
    
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
        "Authorization", 
        `Basic ${base64Token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    };

    try {
        const result = await fetch(oauthUrl ?? '', { ...requestOptions, cache: 'no-store' }).then(res => res.json());
        return result.access_token;

    }catch(error) {
        console.error(error);
        return null;
    }
}


const verifyPaypalPayment = async ( bearerToken: string, paypalTransactionId: string ) :Promise<PayPalOrderStatusResponse | null>=> {
    const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;
    const myHeaders = new Headers();
    myHeaders.append(
        "Authorization", 
        `Bearer ${bearerToken}`
     );

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };


    try {
        const result = await fetch(paypalOrderUrl, requestOptions).then(res => res.json());
        return result;

    }catch(error){
        console.error(error);
        return null;
    }
}