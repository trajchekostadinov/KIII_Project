// // import { Outlet } from 'react-router-dom';
// //
// // import { Box } from '@mui/material';
// // import Header from "./Header/Header.tsx";
// // import Footer from "./Footer/Footer.tsx";
// //
// // const Layout = () => {
// //     return (
// //         // <Box sx={{
// //         //     display: 'flex',
// //         //     flexDirection: 'column',
// //         //     minHeight: '100vh',
// //         //     width: '100%',
// //         // }}>
// //         <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%'}}>
// //             <Header />
// //             <Box sx={{ flexGrow: 1, p: 3 }}>
// //                 <Outlet />
// //             </Box>
// //             <Footer />
// //         </Box>
// //     );
// // };
// //
// // export default Layout;
//
//

import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar/Sidebar.tsx';

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, p: { xs: 2.5, md: 4 }, maxWidth: 1200 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;