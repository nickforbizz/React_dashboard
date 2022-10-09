import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Layouts
import Backlayout from './components/applayout/Backlayout';
import Frontlayout from './components/applayout/Frontlayout';

// Frontend Routes
import Home from './pages/home/Home';
import About from './pages/about/About';
import Nopagefound from './pages/nopagefound/Nopagefound';

// Backend Routes
import Homedash from './pages/dashboard/pages/homedash/Homedash';
import Settings from './pages/dashboard/pages/settings/Settings';
import Dashnopagefound from './pages/dashboard/pages/dashnopagefound/Dashnopagefound';
import Notifications from './pages/dashboard/pages/notifications/Notifications';
import Users from './pages/dashboard/pages/users/Users';
import Profile from './pages/dashboard/pages/profile/Profile';
import { ColorModeContext } from './context/ColorModeContext';
import { GlobalStyles } from '@mui/material';
import Login from './pages/login/Login';
import RequireAuth from './components/hooks/RequireAuth';
import PersistLogin from './components/hooks/PersistLogin';

function App() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#03a9f4',
          },
          secondary: {
            main: '#ff80ab',
          },
        },
      }),
    [mode]
  );

  let globalStyle = {};
  mode === 'light'
    ? (globalStyle = {
        input: {
          color: 'dark',
        },
      })
    : (globalStyle = {
        input: {
          color: 'white',
        },
      });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={globalStyle} />
        <Routes>



          <Route path="/" element={<Frontlayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Nopagefound />} />
          </Route>

          <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<Backlayout />}>
              <Route index element={<Homedash />} />
              <Route path="settings" element={<Settings />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="users" element={<Users />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Dashnopagefound />} />
            </Route>
          </Route>
          </Route>


        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
