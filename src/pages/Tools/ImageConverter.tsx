import {
  Box,
  Button,
  Heading,
  IconButton,
  Image,
  ScaleFade,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import FileUpload from '../../components/FileUpload';

function ImageConverter() {
  const [imagePath, setImagePath] = useState('');
  const [imageName, setImageName] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);

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
      alert('Sorry, an error occured...');
    }
  };

  // Responsive img handling

  return (
    <>
      <Heading as="h1">Image converter</Heading>

      <VStack>
        <Text>Convert any png image to jpg</Text>
        <FileUpload
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
              <IconButton
                rounded="50%"
                fontSize="2rem"
                position="absolute"
                right="-1rem"
                top="-1rem"
                variant="solid"
                colorScheme="red"
                aria-label="Remove image"
                icon={<AiFillCloseCircle />}
                onClick={removeImage}
              />
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
