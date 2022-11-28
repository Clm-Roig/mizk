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
import ImageCropper from './pages/Tools/ImageCropper';
import About from './pages/About';
import ColorConverter from './pages/Tools/Colors/ColorConverter';
import ColorTools from './pages/Tools/ColorTools';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />
            <Route path="calculators" element={<CalculatorTools />} />
            <Route
              path="calculators/duration"
              element={<DurationCalculator />}
            />

            <Route path="images" element={<ImageTools />} />
            <Route path="images/convert" element={<ImageConverter />} />
            <Route path="images/crop" element={<ImageCropper />} />

            <Route path="encoders-decoders" element={<EncoderDecoderTools />} />
            <Route
              path="encoders-decoders/base64"
              element={<Base64EncoderDecoder />}
            />

            <Route path="colors" element={<ColorTools />} />
            <Route path="colors/converter" element={<ColorConverter />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
