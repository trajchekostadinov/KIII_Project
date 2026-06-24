// import { useEffect } from "react";
// import axios from "axios";
//
// export default function PaymentSuccess() {
//     useEffect(() => {
//         const params = new URLSearchParams(window.location.search);
//         const token = params.get("token");
//
//         if (token) {
//             axios.post("http://localhost:9090/api/invoices/pay/success?token=" + token)
//                 .then(() => {
//                     window.location.href = "/paid-invoices";
//                 });
//         }
//     }, []);
//
//     return <h1>Payment successful 🎉</h1>;
// }

import { useEffect } from "react";
import axios from "axios";
import { Box, Typography, CircularProgress } from "@mui/material";
import { colors } from "../../../theme.ts";

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

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                backgroundColor: colors.pageBg,
            }}
        >
            <CircularProgress />
            <Typography sx={{ color: colors.muted, fontWeight: 500 }}>
                Finalizing your payment…
            </Typography>
        </Box>
    );
}