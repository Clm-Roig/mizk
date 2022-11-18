import { HashRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import theme from './theme';
import AppLayout from './components/AppLayout';
import DurationCalculator from './pages/DurationCalculator';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculators">
              <Route path="duration" element={<DurationCalculator />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
