import {
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Text,
  useToast,
  VStack,
  ScaleFade,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { toDataURL, toString } from 'qrcode';
import { FaExchangeAlt } from 'react-icons/fa';
import Textarea from '../../components/Textarea';

function QRCodeGenerator() {
  const toast = useToast();
  const [inputValue, setInputValue] = useState('');
  const [qRCode, setQRCode] = useState<string>();
  const [error, setError] = useState('');
  const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setError('');
    setInputValue(e.currentTarget.value);
  };

  const handleDownloadSVG = () => {
    toString(inputValue, {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: 0,
    }).then((svg) => {
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.svg';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const handleDownloadJPG = () => {
    toDataURL(inputValue, {
      errorCorrectionLevel: 'H',
      width: 512,
      margin: 0,
      type: 'image/jpeg',
    }).then((url) => {
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qrcode.jpg';
      a.click();
    });
  };

  const handleCopyImage = () => {
    toDataURL(inputValue, {
      errorCorrectionLevel: 'H',
      width: 512,
      margin: 0,
      type: 'image/png',
    }).then((url) => {
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          toast({
            title: 'QR Code copied to your clipboard!',
            status: 'success',
            position: 'top',
            duration: 2000,
            isClosable: true,
          });
        });
    });
  };

  useEffect(() => {
    if (inputValue) {
      toString(inputValue, {
        type: 'svg',
        errorCorrectionLevel: 'H',
        margin: 0,
      })
        .then((svg) => {
          const base64 = btoa(unescape(encodeURIComponent(svg)));
          setQRCode(`data:image/svg+xml;base64,${base64}`);
        })
        .catch((err) => {
          if (
            err.message ===
            'The amount of data is too big to be stored in a QR Code'
          ) {
            setError(
              'La chaîne de caractères saisie est trop longue pour être stockée dans un QR Code.'
            );
          } else {
            setError(err.message);
          }
        });
    }
    setQRCode(undefined);
  }, [inputValue]);
  return (
    <>
      <Heading as="h1">QR Code generator</Heading>
      <VStack spacing={4}>
        <VStack align="left" spacing={2} w="full">
          <Text fontSize="xl">Your text</Text>
          <Textarea value={inputValue} onChange={handleInputChange} />
        </VStack>

        <Icon as={FaExchangeAlt} transform="rotateZ(90deg)" color="gray" />

        <VStack align="left" spacing={2} w="full">
          <Text fontSize="xl">Your QR Code</Text>
          {qRCode && (
            <VStack gap={4}>
              <Center>
                <ScaleFade in={!!qRCode} initialScale={0.8}>
                  <img
                    src={qRCode}
                    alt="QR Code"
                    width={200}
                    height={200}
                    style={{ display: 'block', margin: 0, padding: 0 }}
                  />
                </ScaleFade>
              </Center>
              <HStack justifyContent="center" wrap="wrap">
                <Button onClick={handleDownloadJPG}>Download JPG</Button>
                <Button onClick={handleDownloadSVG}>Download SVG</Button>
                <Button colorScheme="primary" onClick={handleCopyImage}>
                  Copy
                </Button>
              </HStack>
            </VStack>
          )}
          {error && (
            <Center>
              {error && (
                <Text color="red" fontSize="lg">
                  {error}
                </Text>
              )}
            </Center>
          )}
        </VStack>
      </VStack>
    </>
  );
}

export default QRCodeGenerator;
