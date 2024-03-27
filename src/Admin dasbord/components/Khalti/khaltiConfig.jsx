import Cookies from "js-cookie";
import webApi from "../../../Config/config";
import myKey from "./khaltiKey";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal)
const config = {
    
    // replace this key with yours
    "publicKey": "test_public_key_d577b97ec4b54691a1abfeef62a5218e",
    "productIdentity": "9808733193",
    "productName": "HomeStay",
    "productUrl": webApi.apiUrl,
    "eventHandler": {
        onSuccess (payload) {
            Cookies.set('paymentStatus','Success');
             MySwal.fire({
                icon: 'success',
                title: 'Payment Successfull',
               });

        },
        // onError handler is optional
        onError (error) {
            Cookies.set('paymentStatus','Error');
            console.log(payload);
        },
        onClose () {

            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

export default config;