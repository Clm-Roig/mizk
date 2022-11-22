import { Box, Image } from '@chakra-ui/react';
import { RefObject } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import RemoveButton from '../../../components/RemoveButton';

interface Props {
  crop?: Crop;
  imagePath: string;
  imageRef: RefObject<HTMLImageElement>;
  onRemoveImage: () => void;
  setCompletedCrop: (crop: PixelCrop) => void;
  setCrop: (crop: Crop) => void;
}
function CropZone({
  crop,
  setCrop,
  setCompletedCrop,
  imagePath,
  imageRef,
  onRemoveImage,
}: Props) {
  return (
    <Box
      boxShadow="xl"
      maxWidth="100%"
      height="auto"
      position="relative"
      display="flex"
    >
      <ReactCrop
        crop={crop}
        onChange={setCrop}
        onComplete={(c) => setCompletedCrop(c)}
      >
        <Image
          ref={imageRef}
          src={imagePath}
          maxWidth="100%"
          maxHeight="100%"
          m="auto"
        />
      </ReactCrop>
      <RemoveButton aria-label="Remove image" onClick={onRemoveImage} />
    </Box>
  );
}

export default CropZone;
