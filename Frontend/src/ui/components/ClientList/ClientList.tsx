// // import type { Client } from '../../../api/types/Client.ts';
// // import { Box, Typography, Paper } from '@mui/material';
// // import PersonIcon from '@mui/icons-material/Person';
// // import EmailIcon from '@mui/icons-material/Email';
// // import PhoneIcon from '@mui/icons-material/Phone';
// // import LocationOnIcon from '@mui/icons-material/LocationOn';
// // import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';
// //
// // interface Props {
// //     clients: Client[];
// //     onEdit: (client: Client) => void;
// //     onDelete: (id: number) => void;
// // }
// //
// // export default function ClientList({ clients, onEdit, onDelete }: Props) {
// //     return (
// //         <Box sx={{ p: 3, maxWidth: 900 }}>
// //             <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
// //                 Clients
// //             </Typography>
// //
// //             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
// //                 {clients.map((c) => (
// //                     <Paper key={c.id} elevation={1} sx={{
// //                         px: 3, py: 1.5, borderRadius: 2,
// //                         '&:hover': { backgroundColor: '#f5f3ff' }
// //                     }}>
// //                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
// //                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 180 }}>
// //                                 <PersonIcon fontSize="small" sx={{ color: '#635bff' }} />
// //                                 <Typography fontWeight={600}>{c.name}</Typography>
// //                             </Box>
// //                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 200 }}>
// //                                 <EmailIcon fontSize="small" sx={{ color: '#635bff' }} />
// //                                 <Typography variant="body2" color="text.secondary">{c.email}</Typography>
// //                             </Box>
// //                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 150 }}>
// //                                 <PhoneIcon fontSize="small" sx={{ color: '#635bff' }} />
// //                                 <Typography variant="body2" color="text.secondary">{c.phone}</Typography>
// //                             </Box>
// //                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
// //                                 <LocationOnIcon fontSize="small" sx={{ color: '#635bff' }} />
// //                                 <Typography variant="body2" color="text.secondary">{c.address}</Typography>
// //                             </Box>
// //                             <Box sx={{ display: 'flex', gap: 0.5 }}>
// //                                 <button
// //                                     onClick={() => onEdit(c)}
// //                                     style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 4 }}
// //                                 >
// //                                     <EditIcon fontSize="small" style={{ color: '#635bff' }} />
// //                                 </button>
// //                                 <button
// //                                     onClick={() => onDelete(c.id)}
// //                                     style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 4 }}
// //                                 >
// //                                     <DeleteIcon fontSize="small" style={{ color: 'red' }} />
// //                                 </button>
// //                             </Box>
// //                         </Box>
// //                     </Paper>
// //                 ))}
// //             </Box>
// //         </Box>
// //     );
// // }


import { useState } from "react";
import type { Client } from '../../../api/types/Client.ts';
import {
    Box,
    Typography,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { colors } from '../../../theme.ts';

interface Props {
    clients: Client[];
    onEdit: (id: number, client: Client) => void;
    onDelete: (id: number) => void;
}

function initials(name: string) {
    return name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

export default function ClientList({ clients, onEdit, onDelete }: Props) {
    const [editing, setEditing] = useState<Client | null>(null);

    const handleSave = () => {
        if (!editing) return;
        onEdit(editing.id, editing);
        setEditing(null);
    };

    if (clients.length === 0) {
        return (
            <Box
                sx={{
                    border: `1px dashed ${colors.border}`,
                    borderRadius: 3,
                    py: 8,
                    textAlign: 'center',
                    color: colors.muted,
                }}
            >
                <PersonRoundedIcon sx={{ fontSize: 32, mb: 1, color: colors.border }} />
                <Typography sx={{ fontWeight: 600, color: colors.ink }}>No clients yet</Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Add your first client to start sending invoices.
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Box
                sx={{
                    border: `1px solid ${colors.border}`,
                    borderRadius: 3,
                    overflow: 'hidden',
                    backgroundColor: colors.surface,
                }}
            >
                {clients.map((c, i) => (
                    <Box
                        key={c.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            px: 2.5,
                            py: 1.75,
                            borderBottom: i === clients.length - 1 ? 'none' : `1px solid ${colors.border}`,
                            transition: 'background-color 0.15s',
                            '&:hover': { backgroundColor: '#FAFAFD' },
                            '&:hover .row-actions': { opacity: 1 },
                        }}
                    >
                        <Box
                            sx={{
                                width: 38,
                                height: 38,
                                borderRadius: '10px',
                                backgroundColor: colors.primarySoft,
                                color: colors.primary,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                flexShrink: 0,
                            }}
                        >
                            {initials(c.name)}
                        </Box>

                        <Box sx={{ minWidth: 160, flexShrink: 0 }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '0.92rem' }}>{c.name}</Typography>
                            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                                {c.email}
                            </Typography>
                        </Box>

                        <Box sx={{ minWidth: 130, flexShrink: 0, display: { xs: 'none', sm: 'block' } }}>
                            <Typography variant="body2" className="mono" sx={{ fontSize: '0.85rem' }}>
                                {c.phone || '—'}
                            </Typography>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                            <Typography variant="body2" sx={{ fontSize: '0.85rem' }} noWrap>
                                {c.address || '—'}
                            </Typography>
                        </Box>

                        <Box className="row-actions" sx={{ display: 'flex', gap: 0.5, opacity: { xs: 1, sm: 0 }, transition: 'opacity 0.15s' }}>
                            <Tooltip title="Edit client">
                                <IconButton size="small" onClick={() => setEditing(c)}>
                                    <EditRoundedIcon sx={{ fontSize: 18, color: colors.muted }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete client">
                                <IconButton size="small" onClick={() => onDelete(c.id)}>
                                    <DeleteRoundedIcon sx={{ fontSize: 18, color: colors.danger }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                ))}
            </Box>

            <Dialog open={!!editing} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
                <DialogTitle sx={{ fontWeight: 700 }}>Edit client</DialogTitle>
                <DialogContent>
                    {editing && (
                        <Stack spacing={2} sx={{ mt: 0.5 }}>
                            <TextField
                                label="Name"
                                value={editing.name}
                                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                label="Email"
                                value={editing.email}
                                onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                label="Phone"
                                value={editing.phone}
                                onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                label="Address"
                                value={editing.address}
                                onChange={(e) => setEditing({ ...editing, address: e.target.value })}
                                fullWidth
                            />
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2.5 }}>
                    <Button onClick={() => setEditing(null)} color="inherit">Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>Save changes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}