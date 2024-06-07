import '@mantine/core/styles.css';
import { AppShell, MantineProvider } from '@mantine/core';
import '@twa-dev/sdk';
import { Wallet } from './components/Wallet';
import { useTheme } from './theme';

function App() {
  const { isDarkTheme, toggleTheme } = useTheme();
  return (
    <MantineProvider>
      <AppShell
        style={{
          backgroundColor: isDarkTheme ? '#2c272e' : 'white',
          background: isDarkTheme
            ? 'linear-gradient(135deg, #2c272e, black)'
            : 'linear-gradient(135deg, #cce8f9, white)'
        }}
      >
        <AppShell.Main>
          <Wallet isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
