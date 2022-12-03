import { Box, FormLabelProps, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NumberEditor from '../../../../components/NumberEditor';
import {
  kelvinToCelsius,
  kelvinToFarenheit,
  celsiusToFarenheit,
  celsiusToKelvin,
  farenheitToCelsius,
  farenheitToKelvin,
} from './temperatureConverters';

const formLabelProps: FormLabelProps = {
  textAlign: 'right',
  width: '120px',
};

type PendingValues = {
  celsius?: string;
  farenheit?: string;
  kelvin?: string;
};

function TemperatureConverter() {
  const [kelvinT, setKelvinT] = useState<string>('0');
  const [celsiusT, setCelsiusT] = useState<string>('');
  const [farenheitT, setFarenheitT] = useState<string>('');

  // Allow the component to manage the three inter-dependant values
  const [pendingNewValues, setPendingNewValues] = useState<PendingValues>({
    celsius: kelvinToCelsius(kelvinT),
    farenheit: kelvinToFarenheit(kelvinT),
    kelvin: undefined,
  });

  const resetAllTemperatures = () => {
    setCelsiusT('');
    setFarenheitT('');
    setKelvinT('');
  };

  const handleCelsiusChange = (vString: string) => {
    if (vString === '') {
      resetAllTemperatures();
    } else {
      setCelsiusT(vString);
      setPendingNewValues({
        celsius: undefined,
        farenheit: celsiusToFarenheit(vString),
        kelvin: celsiusToKelvin(vString),
      });
    }
  };
  const handleFarenheitChange = (vString: string) => {
    if (vString === '') {
      resetAllTemperatures();
    } else {
      setFarenheitT(vString);
      setPendingNewValues({
        celsius: farenheitToCelsius(vString),
        farenheit: undefined,
        kelvin: farenheitToKelvin(vString),
      });
    }
  };
  const handleKelvinChange = (vString: string) => {
    if (vString === '') {
      resetAllTemperatures();
    } else {
      setKelvinT(vString);
      setPendingNewValues({
        celsius: kelvinToCelsius(vString),
        farenheit: kelvinToFarenheit(vString),
        kelvin: undefined,
      });
    }
  };
  useEffect(() => {
    const {
      celsius: pendingC,
      farenheit: pendingF,
      kelvin: pendingK,
    } = pendingNewValues;
    if (pendingC) {
      setCelsiusT(pendingC);
      setPendingNewValues((prev) => ({ ...prev, celsius: undefined }));
    }
    if (pendingF) {
      setFarenheitT(pendingF);
      setPendingNewValues((prev) => ({ ...prev, farenheit: undefined }));
    }
    if (pendingK) {
      setKelvinT(pendingK);
      setPendingNewValues((prev) => ({ ...prev, kelvin: undefined }));
    }
  }, [pendingNewValues]);

  return (
    <>
      <Heading as="h1">Temperature converter</Heading>
      <VStack spacing={4}>
        <Box>
          <NumberEditor
            formLabelProps={formLabelProps}
            label="Celsius (°C)"
            value={celsiusT}
            onChange={handleCelsiusChange}
            step={1}
            min={-273.15}
            precision={2}
          />
        </Box>
        <Box>
          <NumberEditor
            formLabelProps={formLabelProps}
            label="Farenheit (°F)"
            value={farenheitT}
            onChange={handleFarenheitChange}
            step={1}
            min={-459.67}
            precision={2}
          />
        </Box>
        <Box>
          <NumberEditor
            formLabelProps={formLabelProps}
            label="Kelvin (K)"
            value={kelvinT}
            onChange={handleKelvinChange}
            step={1}
            min={0}
            precision={2}
          />
        </Box>
      </VStack>
    </>
  );
}

export default TemperatureConverter;
