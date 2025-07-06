import { HashRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import theme from './theme';
import AppLayout from './components/AppLayout';
import DurationCalculator from './pages/Tools/Calculators/DurationCalculator';
import ToJPGConverter from './pages/Tools/ToJPGConverter';
import ImageTools from './pages/Tools/ImageTools';
import CalculatorConverterTools from './pages/Tools/CalculatorConverterTools';
import EncoderDecoderTools from './pages/Tools/EncoderDecoderTools';
import Base64EncoderDecoder from './pages/Tools/Base64EncoderDecoder';
import ImageCropper from './pages/Tools/ImageCropper';
import About from './pages/About';
import ColorConverter from './pages/Tools/Calculators/ColorConverter';
import GameTools from './pages/Tools/GameTools';
import TextTools from './pages/Tools/TextTools';
import StringReplacer from './pages/Tools/Text/StringReplacer';
import WordsCharactersCounter from './pages/Tools/Text/WordsCharactersCounter';
import TemperatureConverter from './pages/Tools/Calculators/TemperatureConverter';
import {
  CALCULATOR_CONVERTER,
  GAME,
  DOMAIN,
  ENCODER_DECODER,
  IMAGE,
  TEXT,
} from './data/toolTypes.ts';
import MinMaxFinder from './pages/Tools/Text/MinMaxFinder';
import ListSorter from './pages/Tools/Text/ListSorter';
import WhatsMyIp from './pages/Tools/WhatsMyIp';
import DomainTools from './pages/Tools/DomainTools';
import Scoreboard from './pages/Tools/Scoreboard';
import RandomnessGenerator from './pages/Tools/RandomnessGenerator';

function CustomRouter({ children }: { children: ReactNode }) {
  return process.env.NODE_ENV === 'test' ? (
    <span>{children}</span>
  ) : (
    <HashRouter>{children}</HashRouter>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CustomRouter>
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
            <Route
              path={`${CALCULATOR_CONVERTER.url}/color`}
              element={<ColorConverter />}
            />

            {/* ===== Image tools ===== */}
            <Route path={IMAGE.url} element={<ImageTools />} />
            <Route
              path={`${IMAGE.url}/convert-to-jpg`}
              element={<ToJPGConverter />}
            />
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

            {/* ===== Text tools ===== */}
            <Route path={TEXT.url} element={<TextTools />} />
            <Route path={`${TEXT.url}/replacer`} element={<StringReplacer />} />
            <Route
              path={`${TEXT.url}/words-characters-counter`}
              element={<WordsCharactersCounter />}
            />
            <Route
              path={`${TEXT.url}/min-max-finder`}
              element={<MinMaxFinder />}
            />
            <Route path={`${TEXT.url}/list-sorter`} element={<ListSorter />} />

            {/* ===== Domain tools ===== */}
            <Route path={DOMAIN.url} element={<DomainTools />} />
            <Route path={`${DOMAIN.url}/my-ip`} element={<WhatsMyIp />} />

            {/* ===== Game tools ===== */}
            <Route path={GAME.url} element={<GameTools />} />
            <Route path={`${GAME.url}/scoreboard`} element={<Scoreboard />} />
            <Route
              path={`${GAME.url}/randomness-generator`}
              element={<RandomnessGenerator />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </CustomRouter>
    </ChakraProvider>
  );
}

export default App;
