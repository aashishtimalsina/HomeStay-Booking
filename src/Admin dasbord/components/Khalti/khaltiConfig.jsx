import webApi from "../../../Config/config";
import myKey from "./khaltiKey";

const config = {
    // replace this key with yours
    "publicKey": "test_public_key_d577b97ec4b54691a1abfeef62a5218e",
    "productIdentity": "9808733193",
    "productName": "HomeStay",
    "productUrl": webApi.apiUrl,
    "eventHandler": {
        onSuccess (payload) {
            
            console.log(payload);
        },
        // onError handler is optional
        onError (error) {
            console.log(payload);
        },
        onClose () {

            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

export default config;