import { HashRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import theme from './theme';
import AppLayout from './components/AppLayout';
import DurationCalculator from './pages/Tools/DurationCalculator';
import ImageConverter from './pages/Tools/ImageConverter';
import ImageTools from './pages/Tools/ImageTools';
import CalculatorTools from './pages/Tools/CalculatorTools';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="calculators" element={<CalculatorTools />} />
            <Route
              path="calculators/duration"
              element={<DurationCalculator />}
            />

            <Route path="images" element={<ImageTools />} />
            <Route path="images/converter" element={<ImageConverter />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
