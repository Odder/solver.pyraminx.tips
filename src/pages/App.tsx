import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CssBaseline, createTheme, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

export default function App({ children }: any) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          Odder{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </ThemeProvider>
  );
}