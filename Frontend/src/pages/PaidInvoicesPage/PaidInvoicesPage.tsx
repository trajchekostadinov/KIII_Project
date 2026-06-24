import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PaidInvoices() {
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState<any[]>([]);

    useEffect(() => {
        loadPaid();
    }, []);

    const loadPaid = async () => {
        try {
            const res = await axios.get("http://localhost:9090/api/invoices?status=PAID");
            setInvoices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ p: 3 }}>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5">Paid Invoices</Typography>

                <Button onClick={() => navigate("/")}>
                    Back to Home
                </Button>
            </Box>

            <Box sx={{ mt: 3 }}>
                {invoices.length === 0 && (
                    <Typography>No paid invoices yet</Typography>
                )}

                {invoices.map((inv) => (
                    <Paper key={inv.id} sx={{ p: 2, mt: 2 }}>
                        <Typography>Invoice #: {inv.invoiceNumber}</Typography>
                        <Typography>Amount: {inv.amount}</Typography>
                        <Typography>Status: {inv.status}</Typography>
                    </Paper>
                ))}
            </Box>

        </Box>
    );
}