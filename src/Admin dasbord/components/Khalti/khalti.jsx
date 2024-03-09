import React from 'react'
import KhaltiCheckout from "khalti-checkout-web";
import config from './khaltiConfig';

export default function khalti() {
let checkout = new KhaltiCheckout(config);
  return (
    <div>
        <button onClick={()=> checkout.show({amount: 1000})}>
            Pay Via Khalti
        </button>  
    </div>
  )
}
