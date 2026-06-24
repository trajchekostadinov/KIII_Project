import { Box } from '@mui/material';
import { colors } from '../../../theme.ts';

interface Props {
    status: string;
}

const statusStyles: Record<string, { bg: string; fg: string; label: string }> = {
    DRAFT: { bg: '#F1F1F4', fg: colors.muted, label: 'Draft' },
    SENT: { bg: colors.pendingBg, fg: colors.pending, label: 'Sent' },
    PAID: { bg: colors.successBg, fg: colors.success, label: 'Paid' },
    PENDING: { bg: colors.pendingBg, fg: colors.pending, label: 'Pending' },
    UNPAID: { bg: colors.pendingBg, fg: colors.pending, label: 'Unpaid' },
    OVERDUE: { bg: colors.dangerBg, fg: colors.danger, label: 'Overdue' },
    CANCELLED: { bg: '#F1F1F4', fg: colors.muted, label: 'Cancelled' },
    FAILED: { bg: colors.dangerBg, fg: colors.danger, label: 'Failed' },
};

export default function StatusBadge({ status }: Props) {
    const style = statusStyles[status?.toUpperCase()] ?? {
        bg: '#F1F1F4',
        fg: colors.muted,
        label: status ?? 'Unknown',
    };

    return (
        <Box
            component="span"
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.25,
                py: 0.4,
                borderRadius: '999px',
                backgroundColor: style.bg,
                color: style.fg,
                fontWeight: 700,
                fontSize: '0.72rem',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
            }}
        >
            <Box
                component="span"
                sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: style.fg,
                }}
            />
            {style.label}
        </Box>
    );
}