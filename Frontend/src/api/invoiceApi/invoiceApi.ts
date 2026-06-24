import axios from "axios";

export const getPaidInvoices = async () => {
    const res = await axios.get(
        "http://localhost:9090/api/invoices?status=PAID"
    );
    return res.data;
};