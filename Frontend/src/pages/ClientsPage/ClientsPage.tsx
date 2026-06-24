// import { useClients } from '../../hooks/useClients.ts';
// import ClientList from '../../ui/components/ClientList/ClientList.tsx';
//
// export default function ClientPage() {
//     const { clients, loading, error, updateClient, deleteClient } = useClients();
//
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;
//
//     return (
//         <ClientList
//             clients={clients}
//             onEdit={(client) => updateClient(client.id, client)}
//             onDelete={deleteClient}
//
//         />
//     );
// }

import { Box, CircularProgress } from "@mui/material";
import { useClients } from '../../hooks/useClients.ts';
import ClientList from '../../ui/components/ClientList/ClientList.tsx';
import PageHeader from "../../ui/components/PageHeader/PageHeader.tsx";
import { colors } from "../../theme.ts";

export default function ClientPage() {
    const { clients, loading, error, updateClient, deleteClient } = useClients();

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Box sx={{ color: colors.danger, fontWeight: 500 }}>{error}</Box>;
    }

    return (
        <Box>
            <PageHeader title="Clients" subtitle={`${clients.length} client${clients.length === 1 ? "" : "s"} on file`} />
            <ClientList
                clients={clients}
                onEdit={updateClient}
                onDelete={deleteClient}
            />
        </Box>
    );
}