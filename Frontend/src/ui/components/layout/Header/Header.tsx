import { AppBar, Box, Button, Toolbar,Typography } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useNavigate } from 'react-router-dom';

const pages = [
    // { path: '/clients', name: 'Clients' },
    // { path: '/payments', name: 'Payments' },
    { path: '/invoices', name: 'Invoices' },
    { path: '/paid-invoices', name: 'Paid Invoices' },
];

const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" sx={{ backgroundColor: '#635bff' }}>
            <Toolbar>
                <ReceiptLongIcon sx={{ mr: 1 }} />
                <Typography
                    variant="h6"
                    onClick={() => navigate('/')}
                    sx={{
                        color: 'white',
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        letterSpacing: 1,
                        mr: 4,
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.15)',
                        },
                    }}
                >
                    Invoice-Stripe
                </Typography>

                <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                    {pages.map((page) => (
                        <Button
                            key={page.name}
                            onClick={() => navigate(page.path)}
                            sx={{
                                color: 'white',
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.15)',
                                },
                            }}
                        >
                            {page.name}
                        </Button>

                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;