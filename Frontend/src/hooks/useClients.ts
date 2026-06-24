import { useEffect, useState } from "react";
import type { Client } from "../api/types/Client.ts";
import {
    getAllClients,
    updateClient as apiUpdate,
    deleteClient as apiDelete,
    createClient as apiCreate
} from "../api/clientApi/clientApi.ts";

export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            setLoading(true);
            const data = await getAllClients();
            setClients(data);
        } catch {
            setError("Failed to load clients");
        } finally {
            setLoading(false);
        }
    };

    const updateClient = async (id: number, client: Client) => {
        await apiUpdate(id, client);
        await fetchClients();
    };

    const deleteClient = async (id: number) => {
        await apiDelete(id);
        await fetchClients();
    };

    const createClient = async (client: Client) => {
        const createClient = async (client: Client) => {
            await apiCreate(client);
            await fetchClients(); // ← fetchni od baza, kako kaj update/delete
        };

    };

    return {
        clients,
        loading,
        error,
        fetchClients,
        updateClient,
        deleteClient,
        createClient
    };
}