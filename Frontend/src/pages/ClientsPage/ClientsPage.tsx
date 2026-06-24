import { useClients } from '../../hooks/useClients.ts';
import ClientList from '../../ui/components/ClientList/ClientList.tsx';

export default function ClientPage() {
    const { clients, loading, error, updateClient, deleteClient } = useClients();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <ClientList
            clients={clients}
            onEdit={(client) => updateClient(client.id, client)}
            onDelete={deleteClient}

        />
    );
}