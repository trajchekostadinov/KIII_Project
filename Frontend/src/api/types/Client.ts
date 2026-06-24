export interface Invoice {
    id: number;
    amount?: number;
    status?: string;
}

export interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
    invoices?: Invoice[];
}