// // import { useEffect, useState } from "react";
// // import { useSearchParams } from "react-router-dom";
// // import { Box, Typography, CircularProgress } from "@mui/material";
// // import axios from "axios";
// //
// // export default function SuccessPage() {
// //     const [searchParams] = useSearchParams();
// //     const token = searchParams.get("token");
// //
// //     const [loading, setLoading] = useState(true);
// //     const [message, setMessage] = useState("");
// //
// //     useEffect(() => {
// //         const confirmPayment = async () => {
// //             try {
// //                 await axios.post(
// //                     `http://localhost:9090/api/payments/pay/success?token=${token}`
// //                 );
// //                 setMessage("Payment successful 🎉");
// //             } catch (err) {
// //                 setMessage("Payment confirmation failed ❌");
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //
// //         if (token) confirmPayment();
// //     }, [token]);
// //
// //     if (loading) {
// //         return (
// //             <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
// //                 <CircularProgress />
// //             </Box>
// //         );
// //     }
// //
// //     return (
// //         <Box sx={{ textAlign: "center", mt: 10 }}>
// //             <Typography variant="h4">{message}</Typography>
// //         </Box>
// //     );
// // }
//

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { colors } from "../../theme.ts";

export default function SuccessPage() {
    const navigate = useNavigate();
    const [status, setStatus] = useState<"processing" | "done">("processing");

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token");

        if (token) {
            axios.post(
                `http://localhost:9090/api/invoices/pay/success?token=${token}`
            ).then(() => {
                setStatus("done");
                setTimeout(() => navigate("/paid-invoices"), 1200);
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
            {status === "processing" ? (
                <>
                    <CircularProgress />
                    <Typography sx={{ color: colors.muted, fontWeight: 500 }}>
                        Confirming your payment with Stripe…
                    </Typography>
                </>
            ) : (
                <>
                    <CheckCircleRoundedIcon sx={{ fontSize: 48, color: colors.success }} />
                    <Typography variant="h6">Payment confirmed</Typography>
                    <Typography sx={{ color: colors.muted }}>Redirecting to your paid invoices…</Typography>
                </>
            )}
        </Box>
    );
}