import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './utils/AuthContext';
import { NotificationProvider } from './utils/NotificationContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
