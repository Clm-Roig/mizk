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
import TextTools from './pages/Tools/TextTools';
import StringReplacer from './pages/Tools/Text/StringReplacer';
import WordCounter from './pages/Tools/Text/WordCounter';
import TemperatureConverter from './pages/Tools/Calculators/TemperatureConverter';
import {
  CALCULATOR_CONVERTER,
  COLOR,
  ENCODER_DECODER,
  IMAGE,
  TEXT,
} from './data/toolTypes.ts';
import MinMaxFinder from './pages/Tools/Text/MinMaxFinder';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            {/* ===== Calculator / converter tools ===== */}
            <Route
              path={CALCULATOR_CONVERTER.url}
              element={<CalculatorConverterTools />}
            />
            <Route
              path={`${CALCULATOR_CONVERTER.url}/duration`}
              element={<DurationCalculator />}
            />
            <Route
              path={`${CALCULATOR_CONVERTER.url}/temperature`}
              element={<TemperatureConverter />}
            />

            {/* ===== Image tools ===== */}
            <Route path={IMAGE.url} element={<ImageTools />} />
            <Route path={`${IMAGE.url}/convert`} element={<ImageConverter />} />
            <Route path={`${IMAGE.url}/crop`} element={<ImageCropper />} />

            {/* ===== Encoder / decoder tools ===== */}
            <Route
              path={ENCODER_DECODER.url}
              element={<EncoderDecoderTools />}
            />
            <Route
              path={`${ENCODER_DECODER.url}/base64`}
              element={<Base64EncoderDecoder />}
            />

            {/* ===== Color tools ===== */}
            <Route path={COLOR.url} element={<ColorTools />} />
            <Route
              path={`${COLOR.url}/converter`}
              element={<ColorConverter />}
            />

            {/* ===== Text tools ===== */}
            <Route path={TEXT.url} element={<TextTools />} />
            <Route path={`${TEXT.url}/replacer`} element={<StringReplacer />} />
            <Route
              path={`${TEXT.url}/word-counter`}
              element={<WordCounter />}
            />
            <Route
              path={`${TEXT.url}/min-max-finder`}
              element={<MinMaxFinder />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
