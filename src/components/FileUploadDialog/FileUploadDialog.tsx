import React, { useRef, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Input,
  Stack,
  Typography
} from '@mui/material';

interface FileUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export const FileUploadDialog: React.FC<FileUploadDialogProps> = ({
  open,
  onClose,
  onUpload
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleLoad = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Загрузить файл</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Input
            type="file"
            inputRef={fileInputRef}
            onChange={handleFileChange}
            sx={{ display: 'none' }}
          />
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>
              {selectedFile ? selectedFile.name : 'Файл не выбран'}
            </Typography>
            <Button 
              variant="contained"
              onClick={handleBrowse}
              sx={{ bgcolor: 'red', '&:hover': { bgcolor: '#d32f2f' }, minWidth: '100px' }}
            >
              Browse
            </Button>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          variant="contained" 
          onClick={handleLoad}
          disabled={!selectedFile}
          sx={{ 
            bgcolor: 'red', 
            '&:hover': { bgcolor: '#d32f2f' },
            '&.Mui-disabled': { bgcolor: 'rgba(255, 0, 0, 0.5)' }
          }}
        >
          Load
        </Button>
        <Button 
          variant="contained" 
          onClick={handleClose}
          sx={{ bgcolor: 'red', '&:hover': { bgcolor: '#d32f2f' } }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadDialog;
