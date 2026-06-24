// // import {
// //     Box,
// //     CircularProgress,
// //     Button,
// //     TextField,
// //     Dialog,
// //     DialogTitle,
// //     DialogContent,
// //     DialogActions
// // } from "@mui/material";
// //
// // import ClientList from "../../ui/components/ClientList/ClientList.tsx";
// // import { useClients } from "../../hooks/useClients.ts";
// // import { useState } from "react";
// //
// // export default function HomePage() {
// //     const {
// //         clients,
// //         loading,
// //         error,
// //         createClient,
// //         updateClient,
// //         deleteClient
// //     } = useClients();
// //
// //     const [open, setOpen] = useState(false);
// //
// //     const [form, setForm] = useState({
// //         name: "",
// //         email: "",
// //         phone: "",
// //         address: ""
// //     });
// //
// //     const handleOpen = () => setOpen(true);
// //     const handleClose = () => setOpen(false);
// //
// //     const handleCreate = async () => {
// //         if (!form.name || !form.email) return;
// //
// //         await createClient(form);
// //
// //         setForm({
// //             name: "",
// //             email: "",
// //             phone: "",
// //             address: ""
// //         });
// //
// //         handleClose();
// //     };
// //
// //     if (loading) {
// //         return (
// //             <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
// //                 <CircularProgress />
// //             </Box>
// //         );
// //     }
// //
// //     if (error) return <p>{error}</p>;
// //
// //     return (
// //         <Box sx={{ p: 3, maxWidth: 900 }}>
// //
// //             <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
// //                 <Button
// //                     variant="contained"
// //                     onClick={handleOpen}
// //                     sx={{ backgroundColor: "#635bff" }}
// //                 >
// //                     Add Client
// //                 </Button>
// //             </Box>
// //
// //             <ClientList
// //                 clients={clients}
// //                 onEdit={updateClient}
// //                 onDelete={deleteClient}
// //             />
// //
// //             <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
// //                 <DialogTitle>Add New Client</DialogTitle>
// //
// //                 <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
// //                     <TextField
// //                         label="Name"
// //                         value={form.name}
// //                         onChange={(e) => setForm({ ...form, name: e.target.value })}
// //                     />
// //
// //                     <TextField
// //                         label="Email"
// //                         value={form.email}
// //                         onChange={(e) => setForm({ ...form, email: e.target.value })}
// //                     />
// //
// //                     <TextField
// //                         label="Phone"
// //                         value={form.phone}
// //                         onChange={(e) => setForm({ ...form, phone: e.target.value })}
// //                     />
// //
// //                     <TextField
// //                         label="Address"
// //                         value={form.address}
// //                         onChange={(e) => setForm({ ...form, address: e.target.value })}
// //                     />
// //                 </DialogContent>
// //
// //                 <DialogActions>
// //                     <Button onClick={handleClose}>Cancel</Button>
// //
// //                     <Button
// //                         variant="contained"
// //                         onClick={handleCreate}
// //                         sx={{ backgroundColor: "#635bff" }}
// //                     >
// //                         Save
// //                     </Button>
// //                 </DialogActions>
// //             </Dialog>
// //
// //         </Box>
// //     );
// // }
//
//

import {
    Box,
    CircularProgress,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import ClientList from "../../ui/components/ClientList/ClientList.tsx";
import PageHeader from "../../ui/components/PageHeader/PageHeader.tsx";
import { useClients } from "../../hooks/useClients.ts";
import { useState } from "react";
import { colors } from "../../theme.ts";

export default function HomePage() {
    const {
        clients,
        loading,
        error,
        createClient,
        updateClient,
        deleteClient
    } = useClients();

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreate = async () => {
        if (!form.name || !form.email) return;

        await createClient(form);

        setForm({
            name: "",
            email: "",
            phone: "",
            address: ""
        });

        handleClose();
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ color: colors.danger, fontWeight: 500 }}>
                Couldn't load clients. {error}
            </Box>
        );
    }

    return (
        <Box>
            <PageHeader
                title="Clients"
                subtitle={`${clients.length} client${clients.length === 1 ? "" : "s"} on file`}
                action={
                    <Button
                        variant="contained"
                        startIcon={<AddRoundedIcon />}
                        onClick={handleOpen}
                    >
                        Add client
                    </Button>
                }
            />

            <ClientList
                clients={clients}
                onEdit={updateClient}
                onDelete={deleteClient}
            />

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{ fontWeight: 700 }}>Add new client</DialogTitle>

                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 0.5 }}>
                        <TextField
                            label="Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Phone"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Address"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            fullWidth
                        />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2.5 }}>
                    <Button onClick={handleClose} color="inherit">Cancel</Button>
                    <Button variant="contained" onClick={handleCreate}>
                        Save client
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}