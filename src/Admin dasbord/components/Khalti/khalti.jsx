import React from "react";
import KhaltiCheckout from "khalti-checkout-web";

import config from "./khaltiConfig";

export default function Khalti() {
  let checkout = new KhaltiCheckout(config);
  return (
    <div>
      <button
        onClick={() => checkout.show({ amount: 1000 })}
        className=" bg-primary-7 hover:bg-white hover:text-primary-7 text-white transition-all duration-700  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Pay Via Khalti
      </button>
    </div>
  );
}
