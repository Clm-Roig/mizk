import { useCallback, useState } from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import {
  Center,
  useColorModeValue,
  Icon,
  Text,
  Stack,
  Collapse,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FaFile } from 'react-icons/fa';

interface Props {
  acceptedFormats: Accept;
  dropText: string;
  onFileAccepted: (file: File) => void;
}

function FileUpload({ dropText, onFileAccepted, acceptedFormats }: Props) {
  const [errorText, setErrorText] = useState('');
  const onDropAccepted = useCallback(
    (acceptedFiles: Array<File>) => {
      setErrorText('');
      onFileAccepted(acceptedFiles[0]);
    },
    [onFileAccepted]
  );

  const onDropRejected = (fileRejections: FileRejection[]) => {
    setErrorText(
      `Your file ${
        fileRejections[0].file.name
      }  has been rejected: ${fileRejections[0].errors[0].message.toLowerCase()}.`
    );
  };
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDropAccepted,
      onDropRejected,
      accept: acceptedFormats,
      multiple: false,
    });

  const computedDropText = isDragActive ? 'Drop the files here...' : dropText;

  const activeBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue(
    isDragActive ? 'accent' : 'gray.300',
    isDragActive ? 'accent' : 'gray.500'
  );

  return (
    <Stack spacing={2} align="center">
      <Center
        p={10}
        cursor="pointer"
        bg={isDragActive ? activeBg : 'transparent'}
        _hover={{ bg: activeBg }}
        borderRadius={4}
        border="2px dashed"
        borderColor={borderColor}
        w="100%"
        {...getRootProps()}
      >
        {isDragReject && <p>Some files will be rejected</p>}
        <input {...getInputProps()} />
        <Icon as={FaFile} mr={2} />
        <Text>{computedDropText}</Text>
      </Center>

      <Collapse in={errorText !== ''}>
        <Alert status="error">
          <AlertIcon />
          {errorText}
        </Alert>
      </Collapse>
    </Stack>
  );
}

export default FileUpload;
