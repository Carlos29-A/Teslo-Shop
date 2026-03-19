"use client"

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";
import { useRouter } from "next/navigation";


interface Props {
  orderId: string;
  amount: number;
}


export const PayPalButton = ( { orderId, amount }: Props ) => {

  const [{ isPending }] = usePayPalScriptReducer();
  const router = useRouter();

  const roundedAmount = (Math.round(amount * 100))/100;


  if(isPending){
    return (
      <div className="animate-pulse mb-16">
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded mt-2"></div>
      </div>
    )
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions ): Promise<string> => {
    
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: roundedAmount.toString(),
          }
        }
      ]
    })

    const resp = await setTransactionId(transactionId, orderId);

    if(!resp.ok) {
      throw new Error("No se puede actualizar la orden con la transacción");
    }

    return transactionId;
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();

    if( !details ) return;

    const resp = await paypalCheckPayment(details.id ?? '', orderId);

    if( !resp.ok ) {
      alert(resp.message);
      return;
    }

    router.refresh();
  }


  return (
    <div className="relative z-0">
      <PayPalButtons 
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  )
}
