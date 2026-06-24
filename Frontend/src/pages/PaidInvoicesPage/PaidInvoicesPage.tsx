// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Box, Button, Typography, Paper } from "@mui/material";
// // import { useNavigate } from "react-router-dom";
// //
// // export default function PaidInvoices() {
// //     const navigate = useNavigate();
// //     const [invoices, setInvoices] = useState<any[]>([]);
// //
// //     useEffect(() => {
// //         loadPaid();
// //     }, []);
// //
// //     const loadPaid = async () => {
// //         try {
// //             const res = await axios.get("http://localhost:9090/api/invoices?status=PAID");
// //             setInvoices(res.data);
// //         } catch (err) {
// //             console.error(err);
// //         }
// //     };
// //
// //     return (
// //         <Box sx={{ p: 3 }}>
// //
// //             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// //                 <Typography variant="h5">Paid Invoices</Typography>
// //
// //                 <Button onClick={() => navigate("/")}>
// //                     Back to Home
// //                 </Button>
// //             </Box>
// //
// //             <Box sx={{ mt: 3 }}>
// //                 {invoices.length === 0 && (
// //                     <Typography>No paid invoices yet</Typography>
// //                 )}
// //
// //                 {invoices.map((inv) => (
// //                     <Paper key={inv.id} sx={{ p: 2, mt: 2 }}>
// //                         <Typography>Invoice #: {inv.invoiceNumber}</Typography>
// //                         <Typography>Amount: {inv.amount}</Typography>
// //                         <Typography>Status: {inv.status}</Typography>
// //                     </Paper>
// //                 ))}
// //             </Box>
// //
// //         </Box>
// //     );
// // }
//


import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, CircularProgress } from "@mui/material";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import PageHeader from "../../ui/components/PageHeader/PageHeader.tsx";
import StatusBadge from "../../ui/components/StatusBadge/StatusBadge.tsx";
import { colors } from "../../theme.ts";

export default function PaidInvoices() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPaid();
    }, []);

    const loadPaid = async () => {
        try {
            const res = await axios.get("http://localhost:9090/api/invoices?status=PAID");
            setInvoices(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <PageHeader
                title="Paid invoices"
                subtitle={`${invoices.length} invoice${invoices.length === 1 ? "" : "s"} settled`}
            />

            {invoices.length === 0 ? (
                <Box
                    sx={{
                        border: `1px dashed ${colors.border}`,
                        borderRadius: 3,
                        py: 8,
                        textAlign: "center",
                        color: colors.muted,
                    }}
                >
                    <TaskAltRoundedIcon sx={{ fontSize: 32, mb: 1, color: colors.border }} />
                    <Typography sx={{ fontWeight: 600, color: colors.ink }}>No paid invoices yet</Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                        Paid invoices will show up here once a client completes payment.
                    </Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        border: `1px solid ${colors.border}`,
                        borderRadius: 3,
                        overflow: "hidden",
                        backgroundColor: colors.surface,
                    }}
                >
                    {invoices.map((inv, i) => (
                        <Box
                            key={inv.id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                px: 2.5,
                                py: 1.75,
                                borderBottom: i === invoices.length - 1 ? "none" : `1px solid ${colors.border}`,
                                "&:hover": { backgroundColor: "#FAFAFD" },
                            }}
                        >
                            <Typography className="mono" sx={{ fontWeight: 600, minWidth: 110 }}>
                                #{inv.invoiceNumber}
                            </Typography>
                            <Typography className="mono" sx={{ minWidth: 100, color: colors.ink, fontWeight: 600 }}>
                                ${Number(inv.amount).toFixed(2)}
                            </Typography>
                            <Box sx={{ minWidth: 110 }}>
                                <StatusBadge status={inv.status} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}
