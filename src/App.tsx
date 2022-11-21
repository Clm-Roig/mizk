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
import EncoderDecoderTools from './pages/Tools/EncoderDecoderTools';
import Base64EncoderDecoder from './pages/Tools/Base64EncoderDecoder';

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

            <Route path="encoders-decoders" element={<EncoderDecoderTools />} />
            <Route
              path="encoders-decoders/base64"
              element={<Base64EncoderDecoder />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
