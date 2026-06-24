import type { Client } from '../../../api/types/Client.ts';
import { Box, Typography, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    clients: Client[];
    onEdit: (client: Client) => void;
    onDelete: (id: number) => void;
}

export default function ClientList({ clients, onEdit, onDelete }: Props) {
    return (
        <Box sx={{ p: 3, maxWidth: 900 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Clients
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {clients.map((c) => (
                    <Paper key={c.id} elevation={1} sx={{
                        px: 3, py: 1.5, borderRadius: 2,
                        '&:hover': { backgroundColor: '#f5f3ff' }
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 180 }}>
                                <PersonIcon fontSize="small" sx={{ color: '#635bff' }} />
                                <Typography fontWeight={600}>{c.name}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 200 }}>
                                <EmailIcon fontSize="small" sx={{ color: '#635bff' }} />
                                <Typography variant="body2" color="text.secondary">{c.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 150 }}>
                                <PhoneIcon fontSize="small" sx={{ color: '#635bff' }} />
                                <Typography variant="body2" color="text.secondary">{c.phone}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                                <LocationOnIcon fontSize="small" sx={{ color: '#635bff' }} />
                                <Typography variant="body2" color="text.secondary">{c.address}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                <button
                                    onClick={() => onEdit(c)}
                                    style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 4 }}
                                >
                                    <EditIcon fontSize="small" style={{ color: '#635bff' }} />
                                </button>
                                <button
                                    onClick={() => onDelete(c.id)}
                                    style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 4 }}
                                >
                                    <DeleteIcon fontSize="small" style={{ color: 'red' }} />
                                </button>
                            </Box>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
}