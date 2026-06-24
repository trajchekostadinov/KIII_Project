import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import Header from "./Header/Header.tsx";
import Footer from "./Footer/Footer.tsx";

const Layout = () => {
    return (
        // <Box sx={{
        //     display: 'flex',
        //     flexDirection: 'column',
        //     minHeight: '100vh',
        //     width: '100%',
        // }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%'}}>
            <Header />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;