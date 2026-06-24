import { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    MenuItem
} from "@mui/material";

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
        try {
            await axios.post(`http://localhost:9090/api/invoices/${id}/send`);

            alert("Invoice sent to email");
            loadData(); // ако сакаш refresh на листата

        } catch (err) {
            console.error(err);
            alert("Failed to send invoice");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5">Invoices</Typography>

            {/* CREATE INVOICE */}
            <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="h6">Create Invoice</Typography>

                <TextField
                    name="invoiceNumber"
                    label="Invoice Number"
                    value={form.invoiceNumber}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mt: 2 }}
                />

                <TextField
                    name="amount"
                    label="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mt: 2 }}
                />

                <TextField
                    select
                    name="clientId"
                    label="Client"
                    value={form.clientId}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    {clients.map((c: any) => (
                        <MenuItem key={c.id} value={c.id}>
                            {c.name}
                        </MenuItem>
                    ))}
                </TextField>

                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={createInvoice}
                >
                    Add Invoice
                </Button>
            </Paper>

            {/* LIST */}
            <Box sx={{ mt: 4 }}>
                {invoices.length === 0 && <p>No invoices found</p>}

                {invoices.map((inv: any) => (
                    <Paper key={inv.id} sx={{ p: 2, mt: 2 }}>
                        <p>Invoice #: {inv.invoiceNumber}</p>
                        <p>Amount: {inv.amount}</p>
                        <p>Status: {inv.status}</p>

                        <Button onClick={() => sendInvoice(inv.id)}>
                            Send Invoice
                        </Button>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
}