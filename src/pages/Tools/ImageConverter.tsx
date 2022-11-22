import {
  Box,
  Button,
  Heading,
  Image,
  ScaleFade,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Accept } from 'react-dropzone';
import FileUpload from '../../components/FileUpload';
import RemoveButton from '../../components/RemoveButton';

const ACCEPTED_FORMATS: Accept = {
  'image/avif': [],
  'image/bmp': [],
  'image/gif': [],
  'image/ico': [],
  'image/svg+xml': [],
  'image/png': [],
  'image/x-icon': [],
  'image/webp': [],
};

function ImageConverter() {
  const [imagePath, setImagePath] = useState('');
  const [imageName, setImageName] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const formatList = Object.keys(ACCEPTED_FORMATS)
    .map((k) => k.split('/')[1].split('+')[0]) // Second split to separate svg+xml to obtain only svg
    .join(', ');

  const onFileAccepted = (file: File) => {
    if (file) {
      setImagePath(URL.createObjectURL(file));
      setImageName(file.name);
    }
  };

  const removeImage = () => {
    setImagePath('');
    setImageName('');
  };

  const convertToJpg = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (imgRef && imgRef.current && ctx) {
      // Draw image on a white canva
      canvas.width = imgRef.current.naturalWidth;
      canvas.height = imgRef.current.naturalHeight;
      ctx.fillStyle = '#fff'; /// set white fill style
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imgRef.current, 0, 0);

      // Trigger download
      const anchor = document.createElement('a');
      anchor.href = canvas.toDataURL('image/jpeg');
      anchor.download = imageName;
      anchor.click();
    } else {
      // eslint-disable-next-line no-alert
      alert(
        'Sorry, a rare error occured: imgRef, imgRef.current or ctx is not defined'
      );
    }
  };

  return (
    <>
      <Heading as="h1">Image converter</Heading>

      <VStack>
        <Text>Convert an image ({formatList}) to jpg</Text>
        <FileUpload
          acceptedFormats={ACCEPTED_FORMATS}
          dropText="Drag & drop your image here or click to select it on your device"
          onFileAccepted={onFileAccepted}
        />

        <ScaleFade
          in={imagePath !== ''}
          unmountOnExit
          style={{ width: '100%' }}
        >
          <VStack p={4}>
            <Box
              width="max(240px,25vw)"
              height="max(240px,25vw)"
              position="relative"
              display="flex"
              p={1}
              boxShadow="xl"
            >
              <Image
                ref={imgRef}
                src={imagePath}
                maxWidth="100%"
                maxHeight="100%"
                m="auto"
              />
              <RemoveButton aria-label="Remove image" onClick={removeImage} />
            </Box>

            <Text fontWeight="bold">{imageName}</Text>
            <Button onClick={convertToJpg}>Convert to JPG</Button>
          </VStack>
        </ScaleFade>
      </VStack>
    </>
  );
}

export default ImageConverter;
