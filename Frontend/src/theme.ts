import { createTheme } from '@mui/material/styles';

export const colors = {
    primary: '#5046E5',
    primaryHover: '#4338CA',
    primarySoft: '#EEECFD',
    ink: '#0F172A',
    muted: '#64748B',
    pageBg: '#F7F7FC',
    surface: '#FFFFFF',
    border: '#E6E4F2',
    success: '#0F9D67',
    successBg: '#E6F7EF',
    danger: '#DC2626',
    dangerBg: '#FDECEC',
    pending: '#B45309',
    pendingBg: '#FEF3E2',
};

const theme = createTheme({
    palette: {
        primary: {
            main: colors.primary,
            dark: colors.primaryHover,
            light: colors.primarySoft,
            contrastText: '#FFFFFF',
        },
        error: { main: colors.danger },
        success: { main: colors.success },
        warning: { main: colors.pending },
        background: {
            default: colors.pageBg,
            paper: colors.surface,
        },
        text: {
            primary: colors.ink,
            secondary: colors.muted,
        },
        divider: colors.border,
    },
    typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        h4: { fontWeight: 700, letterSpacing: '-0.02em', color: colors.ink },
        h5: { fontWeight: 700, letterSpacing: '-0.015em', color: colors.ink },
        h6: { fontWeight: 600, letterSpacing: '-0.01em', color: colors.ink },
        body1: { color: colors.ink },
        body2: { color: colors.muted },
        button: { fontWeight: 600, textTransform: 'none' },
    },
    shape: { borderRadius: 10 },
    shadows: [
        'none',
        '0 1px 2px rgba(15, 23, 42, 0.04)',
        '0 1px 3px rgba(15, 23, 42, 0.06)',
        '0 2px 4px rgba(15, 23, 42, 0.06)',
        '0 2px 8px rgba(15, 23, 42, 0.08)',
        '0 4px 10px rgba(15, 23, 42, 0.08)',
        '0 4px 12px rgba(15, 23, 42, 0.10)',
        '0 6px 16px rgba(15, 23, 42, 0.10)',
        '0 6px 16px rgba(15, 23, 42, 0.10)',
        '0 8px 20px rgba(15, 23, 42, 0.10)',
        '0 8px 20px rgba(15, 23, 42, 0.10)',
        '0 10px 24px rgba(15, 23, 42, 0.12)',
        '0 10px 24px rgba(15, 23, 42, 0.12)',
        '0 12px 28px rgba(15, 23, 42, 0.12)',
        '0 12px 28px rgba(15, 23, 42, 0.12)',
        '0 14px 32px rgba(15, 23, 42, 0.14)',
        '0 14px 32px rgba(15, 23, 42, 0.14)',
        '0 16px 36px rgba(15, 23, 42, 0.14)',
        '0 16px 36px rgba(15, 23, 42, 0.14)',
        '0 18px 40px rgba(15, 23, 42, 0.16)',
        '0 18px 40px rgba(15, 23, 42, 0.16)',
        '0 20px 44px rgba(15, 23, 42, 0.16)',
        '0 20px 44px rgba(15, 23, 42, 0.16)',
        '0 22px 48px rgba(15, 23, 42, 0.18)',
        '0 22px 48px rgba(15, 23, 42, 0.18)',
    ],
    components: {
        MuiButton: {
            styleOverrides: {
                root: { borderRadius: 8, paddingInline: 16, boxShadow: 'none' },
                contained: {
                    boxShadow: 'none',
                    '&:hover': { boxShadow: '0 4px 10px rgba(80, 70, 229, 0.25)' },
                },
            },
        },
        MuiPaper: {
            styleOverrides: { root: { backgroundImage: 'none' } },
        },
        MuiTextField: {
            defaultProps: { size: 'small' },
        },
        MuiOutlinedInput: {
            styleOverrides: { root: { borderRadius: 8 } },
        },
        MuiChip: {
            styleOverrides: {
                root: { fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.02em' },
            },
        },
    },
});

export default theme;