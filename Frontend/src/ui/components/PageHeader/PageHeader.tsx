import { Box, Typography, Stack } from '@mui/material';
import type { ReactNode } from 'react';
import { colors } from '../../../theme.ts';

interface Props {
    title: string;
    subtitle?: string;
    action?: ReactNode;
}

export default function PageHeader({ title, subtitle, action }: Props) {
    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
                mb: 3.5,
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
            }}
        >
            <Box>
                <Typography variant="h5">{title}</Typography>
                {subtitle && (
                    <Typography variant="body2" sx={{ color: colors.muted, mt: 0.4 }}>
                        {subtitle}
                    </Typography>
                )}
            </Box>
            {action}
        </Stack>
    );
}