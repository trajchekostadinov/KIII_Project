// // import './App.css';
// // import HomePage from './pages/HomePage/HomePage.tsx';
// // import { BrowserRouter, Route, Routes } from 'react-router-dom';
// // import Layout from './ui/components/layout/Layout.tsx';
// // import SuccessPage from "./pages/SuccessPage/SuccessPage.tsx";
// // import PaidInvoicesPage from "./pages/PaidInvoicesPage/PaidInvoicesPage.tsx";
// // import InvoicesPage from "./pages/InvoicePage/InvoicePage.tsx";
// // import PaymentSuccess from "./ui/components/PaymentSuccess/PaymentSuccess.tsx";
// // export default function App() {
// //   return (
// //       <BrowserRouter>
// //         <Routes>
// //           <Route path='/' element={<Layout />}>
// //             <Route index element={<HomePage />} />
// //           </Route>
// //             <Route path="/success" element={<SuccessPage />} />
// //             <Route path="/invoices" element={<InvoicesPage />} />
// //             <Route path="/paid-invoices" element={<PaidInvoicesPage />} />
// //             <Route path="/payment-success" element={<PaidInvoicesPage />} />
// //         </Routes>
// //       </BrowserRouter>
// //   );
// // }
//
// import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Layout from './ui/components/layout/Layout.tsx';
// import HomePage from './pages/HomePage/HomePage.tsx';
// import InvoicesPage from './pages/InvoicePage/InvoicePage.tsx';
// import PaidInvoicesPage from './pages/PaidInvoicesPage/PaidInvoicesPage.tsx';
// import SuccessPage from './pages/SuccessPage/SuccessPage.tsx';
//
// export default function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path='/' element={<Layout />}>
//                     <Route index element={<HomePage />} />
//                     <Route path='invoices' element={<InvoicesPage />} />
//                     <Route path='paid-invoices' element={<PaidInvoicesPage />} />
//                 </Route>
//                 <Route path='/payment-success' element={<PaidInvoicesPage />} />
//                 <Route path='/success' element={<SuccessPage />} />
//             </Routes>
//         </BrowserRouter>
//     );
// }


import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import theme from './theme.ts';
import Layout from './ui/components/layout/Layout.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import SuccessPage from './pages/SuccessPage/SuccessPage.tsx';
import PaidInvoicesPage from './pages/PaidInvoicesPage/PaidInvoicesPage.tsx';
import InvoicesPage from './pages/InvoicePage/InvoicePage.tsx';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="invoices" element={<InvoicesPage />} />
                        <Route path="paid-invoices" element={<PaidInvoicesPage />} />
                    </Route>
                    <Route path="/success" element={<SuccessPage />} />
                    <Route path="/payment-success" element={<SuccessPage  />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}