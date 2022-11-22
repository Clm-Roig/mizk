import { Center, Text } from '@chakra-ui/react';
import { RefObject } from 'react';

interface Props {
  imageRef: RefObject<HTMLImageElement>;
  isEmpty: boolean;
  previewCanvasRef: RefObject<HTMLCanvasElement>;
}
function Preview({ imageRef, isEmpty, previewCanvasRef }: Props) {
  return (
    <>
      {imageRef.current && (
        <Center
          boxShadow="xl"
          width={imageRef.current.width}
          height={imageRef.current.height}
        >
          {!isEmpty ? (
            <canvas
              ref={previewCanvasRef}
              style={{
                objectFit: 'contain',
                width: '100%',
                height: '100%',
              }}
            />
          ) : (
            <Text align="center">
              Drag n drop on the image to start cropping !
            </Text>
          )}
        </Center>
      )}
      <Text fontWeight="bold">Crop preview</Text>
    </>
  );
}

export default Preview;
