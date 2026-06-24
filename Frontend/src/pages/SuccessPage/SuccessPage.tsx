// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { Box, Typography, CircularProgress } from "@mui/material";
// import axios from "axios";
//
// export default function SuccessPage() {
//     const [searchParams] = useSearchParams();
//     const token = searchParams.get("token");
//
//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");
//
//     useEffect(() => {
//         const confirmPayment = async () => {
//             try {
//                 await axios.post(
//                     `http://localhost:9090/api/payments/pay/success?token=${token}`
//                 );
//                 setMessage("Payment successful 🎉");
//             } catch (err) {
//                 setMessage("Payment confirmation failed ❌");
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         if (token) confirmPayment();
//     }, [token]);
//
//     if (loading) {
//         return (
//             <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }
//
//     return (
//         <Box sx={{ textAlign: "center", mt: 10 }}>
//             <Typography variant="h4">{message}</Typography>
//         </Box>
//     );
// }
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token");

        if (token) {
            axios.post(
                `http://localhost:9090/api/invoices/pay/success?token=${token}`
            ).then(() => {
                navigate("/paid-invoices");
            });
        }
    }, []);

    return <h2>Processing Stripe payment...</h2>;
}