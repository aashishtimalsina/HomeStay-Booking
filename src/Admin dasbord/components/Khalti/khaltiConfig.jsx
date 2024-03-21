import myKey from "./khaltiKey";

let config = {
    // replace this key with yours
    "publicKey": "test_public_key_d577b97ec4b54691a1abfeef62a5218e",
    "productIdentity": "9808733193",
    "productName": "HomeStay",
    "productUrl": "http://localhost:5173",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

export default config;