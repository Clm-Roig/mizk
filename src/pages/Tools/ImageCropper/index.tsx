import {
  Button,
  Flex,
  Heading,
  ScaleFade,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Accept } from 'react-dropzone';
import { Crop, PixelCrop } from 'react-image-crop';
import FileUpload from '../../../components/FileUpload';
import useDebounce from '../../../hooks/useDebounce';
import CropZone from './CropZone';
import drawCanvasPreview from './drawCanvasPreview';
import Preview from './Preview';

const ACCEPTED_FORMATS: Accept = {
  'image/bmp': [],
  'image/gif': [],
  'image/jpg': ['.jpg', '.jpeg'],
  'image/png': [],
  'image/webp': [],
};

function ImageCropper() {
  const [imagePath, setImagePath] = useState('');
  const [fileType, setFileType] = useState('');
  const [imageName, setImageName] = useState('');
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [crop, setCrop] = useState<Crop>();

  const imageRef = useRef<HTMLImageElement>(null);

  const onFileAccepted = (file: File) => {
    if (file) {
      setFileType(file.type);
      setCrop(undefined);
      setCompletedCrop(undefined);
      setImagePath(URL.createObjectURL(file));
      setImageName(file.name);
    }
  };

  const removeImage = () => {
    setImagePath('');
    setImageName('');
  };

  const downloadCrop = () => {
    if (previewCanvasRef.current) {
      const anchor = document.createElement('a');
      const splittedName = imageName.split('.');
      const name = splittedName.slice(0, splittedName.length - 1).join('.');
      const extension = splittedName.pop();
      const imgName = `${name} - cropped.${extension}`;

      anchor.download = imgName;
      anchor.href = previewCanvasRef.current.toDataURL(fileType);
      anchor.click();
    } else {
      // eslint-disable-next-line no-alert
      alert(
        'Sorry, a rare error occured: previewCanvasRef.current is not defined'
      );
    }
  };

  useDebounce(async () => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imageRef.current &&
      previewCanvasRef.current
    ) {
      // Use canvasPreview as it's much faster than imgPreview.
      drawCanvasPreview(
        imageRef.current,
        previewCanvasRef.current,
        completedCrop
      );
    }
  }, 100);

  return (
    <>
      <Heading as="h1">Image cropper</Heading>
      <VStack>
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
            <Flex
              gap={4}
              alignItems="flex-start"
              wrap="wrap"
              justifyContent="center"
            >
              <VStack width={['90%', '', '', '45%']}>
                <CropZone
                  crop={crop}
                  imagePath={imagePath}
                  imageRef={imageRef}
                  onRemoveImage={removeImage}
                  setCrop={setCrop}
                  setCompletedCrop={setCompletedCrop}
                />
                <Text fontWeight="bold">{imageName}</Text>
              </VStack>

              {imageRef.current && (
                <VStack width={['90%', '', '', '45%']}>
                  <Preview
                    imageRef={imageRef}
                    previewCanvasRef={previewCanvasRef}
                    isEmpty={!completedCrop}
                  />
                  {previewCanvasRef.current && (
                    <Button onClick={downloadCrop}>Download</Button>
                  )}
                </VStack>
              )}
            </Flex>
          </VStack>
        </ScaleFade>
      </VStack>
    </>
  );
}

export default ImageCropper;
