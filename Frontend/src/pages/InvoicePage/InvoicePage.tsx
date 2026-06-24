// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //     Box,
// //     Typography,
// //     Paper,
// //     Button,
// //     TextField,
// //     MenuItem
// // } from "@mui/material";
// //
// // export default function InvoicesPage() {
// //     const [invoices, setInvoices] = useState<any[]>([]);
// //     const [clients, setClients] = useState<any[]>([]);
// //     const [loading, setLoading] = useState(true);
// //
// //     const [form, setForm] = useState({
// //         clientId: "",
// //         invoiceNumber: "",
// //         amount: ""
// //     });
// //
// //     useEffect(() => {
// //         loadData();
// //     }, []);
// //
// //     const loadData = async () => {
// //         try {
// //             const [invRes, clientRes] = await Promise.all([
// //                 axios.get("http://localhost:9090/api/invoices"),
// //                 axios.get("http://localhost:9090/api/clients")
// //             ]);
// //
// //             setInvoices(invRes.data);
// //             setClients(clientRes.data);
// //         } catch (err) {
// //             console.error(err);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };
// //
// //     const handleChange = (e: any) => {
// //         setForm({ ...form, [e.target.name]: e.target.value });
// //     };
// //
// //     const createInvoice = async () => {
// //         if (!form.clientId || !form.amount || !form.invoiceNumber) {
// //             alert("Fill all fields");
// //             return;
// //         }
// //
// //         try {
// //             await axios.post("http://localhost:9090/api/invoices", {
// //                 invoiceNumber: form.invoiceNumber,
// //                 amount: Number(form.amount),
// //                 clientId: Number(form.clientId)
// //             });
// //
// //             setForm({ clientId: "", invoiceNumber: "", amount: "" });
// //             loadData();
// //         } catch (err) {
// //             console.error("Create error", err);
// //         }
// //     };
// //
// //     const sendInvoice = async (id: number) => {
// //         try {
// //             await axios.post(`http://localhost:9090/api/invoices/${id}/send`);
// //
// //             alert("Invoice sent to email");
// //             loadData(); // ако сакаш refresh на листата
// //
// //         } catch (err) {
// //             console.error(err);
// //             alert("Failed to send invoice");
// //         }
// //     };
// //
// //     if (loading) return <p>Loading...</p>;
// //
// //     return (
// //         <Box sx={{ p: 3 }}>
// //             <Typography variant="h5">Invoices</Typography>
// //
// //             {/* CREATE INVOICE */}
// //             <Paper sx={{ p: 2, mt: 2 }}>
// //                 <Typography variant="h6">Create Invoice</Typography>
// //
// //                 <TextField
// //                     name="invoiceNumber"
// //                     label="Invoice Number"
// //                     value={form.invoiceNumber}
// //                     onChange={handleChange}
// //                     fullWidth
// //                     sx={{ mt: 2 }}
// //                 />
// //
// //                 <TextField
// //                     name="amount"
// //                     label="Amount"
// //                     value={form.amount}
// //                     onChange={handleChange}
// //                     fullWidth
// //                     sx={{ mt: 2 }}
// //                 />
// //
// //                 <TextField
// //                     select
// //                     name="clientId"
// //                     label="Client"
// //                     value={form.clientId}
// //                     onChange={handleChange}
// //                     fullWidth
// //                     sx={{ mt: 2 }}
// //                 >
// //                     {clients.map((c: any) => (
// //                         <MenuItem key={c.id} value={c.id}>
// //                             {c.name}
// //                         </MenuItem>
// //                     ))}
// //                 </TextField>
// //
// //                 <Button
// //                     variant="contained"
// //                     sx={{ mt: 2 }}
// //                     onClick={createInvoice}
// //                 >
// //                     Add Invoice
// //                 </Button>
// //             </Paper>
// //
// //             {/* LIST */}
// //             <Box sx={{ mt: 4 }}>
// //                 {invoices.length === 0 && <p>No invoices found</p>}
// //
// //                 {invoices.map((inv: any) => (
// //                     <Paper key={inv.id} sx={{ p: 2, mt: 2 }}>
// //                         <p>Invoice #: {inv.invoiceNumber}</p>
// //                         <p>Amount: {inv.amount}</p>
// //                         <p>Status: {inv.status}</p>
// //
// //                         <Button onClick={() => sendInvoice(inv.id)}>
// //                             Send Invoice
// //                         </Button>
// //                     </Paper>
// //                 ))}
// //             </Box>
// //         </Box>
// //     );
// // }
//
import { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    MenuItem,
    Stack,
    CircularProgress,
    InputAdornment,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PageHeader from "../../ui/components/PageHeader/PageHeader.tsx";
import StatusBadge from "../../ui/components/StatusBadge/StatusBadge.tsx";
import { colors } from "../../theme.ts";

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [sendingId, setSendingId] = useState<number | null>(null);

    const [form, setForm] = useState({
        clientId: "",
        invoiceNumber: "",
        amount: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [invRes, clientRes] = await Promise.all([
                axios.get("http://localhost:9090/api/invoices"),
                axios.get("http://localhost:9090/api/clients")
            ]);

            setInvoices(invRes.data);
            setClients(clientRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const createInvoice = async () => {
        if (!form.clientId || !form.amount || !form.invoiceNumber) {
            alert("Fill all fields");
            return;
        }

        try {
            await axios.post("http://localhost:9090/api/invoices", {
                invoiceNumber: form.invoiceNumber,
                amount: Number(form.amount),
                clientId: Number(form.clientId)
            });

            setForm({ clientId: "", invoiceNumber: "", amount: "" });
            loadData();
        } catch (err) {
            console.error("Create error", err);
        }
    };

    const sendInvoice = async (id: number) => {
        setSendingId(id);
        try {
            await axios.post(`http://localhost:9090/api/invoices/${id}/send`);
            loadData();
        } catch (err) {
            console.error(err);
            alert("Failed to send invoice");
        } finally {
            setSendingId(null);
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
                title="Invoices"
                subtitle="Create invoices and send them to your clients"
            />

            <Paper
                variant="outlined"
                sx={{ p: 3, mb: 4, borderRadius: 3, borderColor: colors.border }}
            >
                <Typography sx={{ fontWeight: 700, mb: 2 }}>New invoice</Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                        name="invoiceNumber"
                        label="Invoice number"
                        value={form.invoiceNumber}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        name="amount"
                        label="Amount"
                        value={form.amount}
                        onChange={handleChange}
                        fullWidth
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            },
                        }}
                    />

                    <TextField
                        select
                        name="clientId"
                        label="Client"
                        value={form.clientId}
                        onChange={handleChange}
                        fullWidth
                    >
                        {clients.map((c: any) => (
                            <MenuItem key={c.id} value={c.id}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button
                        variant="contained"
                        onClick={createInvoice}
                        sx={{ flexShrink: 0, px: 3 }}
                    >
                        Create
                    </Button>
                </Stack>
            </Paper>

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
                    <DescriptionRoundedIcon sx={{ fontSize: 32, mb: 1, color: colors.border }} />
                    <Typography sx={{ fontWeight: 600, color: colors.ink }}>No invoices yet</Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                        Create one above to get started.
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
                    {invoices.map((inv: any, i: number) => (
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

                            <Box sx={{ flexGrow: 1 }} />

                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={
                                    sendingId === inv.id
                                        ? <CircularProgress size={14} />
                                        : <SendRoundedIcon sx={{ fontSize: 16 }} />
                                }
                                disabled={sendingId === inv.id}
                                onClick={() => sendInvoice(inv.id)}
                            >
                                {sendingId === inv.id ? "Sending…" : "Send"}
                            </Button>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}