import { HashRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import theme from './theme';
import AppLayout from './components/AppLayout';
import DurationCalculator from './pages/Tools/Calculators/DurationCalculator';
import ImageConverter from './pages/Tools/ImageConverter';
import ImageTools from './pages/Tools/ImageTools';
import CalculatorConverterTools from './pages/Tools/CalculatorConverterTools';
import EncoderDecoderTools from './pages/Tools/EncoderDecoderTools';
import Base64EncoderDecoder from './pages/Tools/Base64EncoderDecoder';
import ImageCropper from './pages/Tools/ImageCropper';
import About from './pages/About';
import ColorConverter from './pages/Tools/Colors/ColorConverter';
import ColorTools from './pages/Tools/ColorTools';
import StringTools from './pages/Tools/StringTools';
import StringReplacer from './pages/Tools/Strings/StringReplacer';
import WordCounter from './pages/Tools/Strings/WordCounter';
import TemperatureConverter from './pages/Tools/Calculators/TemperatureConverter';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />
            <Route
              path="calculators-converters"
              element={<CalculatorConverterTools />}
            />
            <Route
              path="calculators-converters/duration"
              element={<DurationCalculator />}
            />
            <Route
              path="calculators-converters/temperature"
              element={<TemperatureConverter />}
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

            <Route path="strings" element={<StringTools />} />
            <Route path="strings/replacer" element={<StringReplacer />} />
            <Route path="strings/word-counter" element={<WordCounter />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
