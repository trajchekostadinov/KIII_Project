    import axios from "axios";
    import type { Client } from "../types/Client.ts";

    const API_URL = "http://localhost:9090/api/clients";



    export const getAllClients = async (): Promise<Client[]> => {
        const response = await axios.get<Client[]>(API_URL);
        return response.data;
    };

    export const updateClient = async (id: number, client: Client): Promise<Client> => {
        const response = await axios.put<Client>(`${API_URL}/${id}`, client);
        return response.data;
    };
    // export const createClient = async (client: Client): Promise<Client> => {
    //     const response = await axios.post<Client>(API_URL, client);
    //     return response.data;
    // };
    export const createClient = async (
        client: Omit<Client, "id" | "createdAt">
    ): Promise<Client> => {
        const response = await axios.post<Client>(API_URL, client);
        return response.data;
    };

    export const deleteClient = async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    };