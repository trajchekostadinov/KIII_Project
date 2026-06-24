import { Box, Typography, Stack } from '@mui/material';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors } from '../../../../theme.ts';

const navItems = [
    { path: '/', label: 'Clients', icon: PeopleAltRoundedIcon },
    { path: '/invoices', label: 'Invoices', icon: DescriptionRoundedIcon },
    { path: '/paid-invoices', label: 'Paid', icon: TaskAltRoundedIcon },
];

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box
            component="nav"
            sx={{
                width: 240,
                flexShrink: 0,
                height: '100vh',
                position: 'sticky',
                top: 0,
                borderRight: `1px solid ${colors.border}`,
                backgroundColor: colors.surface,
                display: 'flex',
                flexDirection: 'column',
                py: 3,
            }}
        >
            <Stack
                direction="row"
                spacing={1.25}
                sx={{ px: 3, mb: 4, cursor: 'pointer', alignItems: 'center' }}
                onClick={() => navigate('/')}
            >
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '8px',
                        backgroundColor: colors.primary,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ReceiptLongRoundedIcon sx={{ color: '#fff', fontSize: 19 }} />
                </Box>
                <Typography
                    sx={{
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        letterSpacing: '-0.02em',
                        color: colors.ink,
                    }}
                >
                    Invoice<span style={{ color: colors.primary }}>Stripe</span>
                </Typography>
            </Stack>

            <Stack spacing={0.5} sx={{ px: 1.5 }}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = location.pathname === item.path;
                    return (
                        <Box
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                px: 2,
                                py: 1.1,
                                borderRadius: 2,
                                cursor: 'pointer',
                                color: active ? colors.primary : colors.muted,
                                backgroundColor: active ? colors.primarySoft : 'transparent',
                                fontWeight: active ? 600 : 500,
                                fontSize: '0.9rem',
                                transition: 'background-color 0.15s, color 0.15s',
                                '&:hover': {
                                    backgroundColor: active ? colors.primarySoft : '#F4F3FB',
                                    color: colors.primary,
                                },
                            }}
                        >
                            <Icon sx={{ fontSize: 19 }} />
                            {item.label}
                        </Box>
                    );
                })}
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ px: 3, pt: 2, borderTop: `1px solid ${colors.border}` }}>
                <Typography sx={{ fontSize: '0.72rem', color: colors.muted }}>
                    Connected to Stripe
                </Typography>
            </Box>
        </Box>
    );
};

export default Sidebar;