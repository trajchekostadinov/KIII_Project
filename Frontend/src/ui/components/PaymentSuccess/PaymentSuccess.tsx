import { useEffect } from "react";
import axios from "axios";

export default function PaymentSuccess() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            axios.post("http://localhost:9090/api/invoices/pay/success?token=" + token)
                .then(() => {
                    window.location.href = "/paid-invoices";
                });
        }
    }, []);

    return <h1>Payment successful 🎉</h1>;
}