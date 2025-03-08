import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import FileUploadDialog from '@components/FileUploadDialog';
import SynchronizationTable from '@widgets/SynchronizationTable';

interface DataItem {
  id: string;
  name: string;
  action: string;
}

const SynchronizationPage: React.FC = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const data: DataItem[] = [
    // Example data - you can replace this with your actual data
    { id: '1', name: 'Item 1', action: 'Action 1' },
    { id: '2', name: 'Item 2', action: 'Action 2' },
  ];

  const handleUploadClick = () => {
    setIsUploadDialogOpen(true);
  };

  const handleImport = () => {
    // Implement import logic here
    console.log('Import clicked');
  };

  const handleFileUpload = (file: File) => {
    // Implement file upload logic here
    console.log('Uploading file:', file.name);
  };

  const handleInfoClick = (key: string) => {
    console.log('Info clicked for key:', key);
    // Добавьте здесь дополнительную логику обработки клика, если нужно
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button 
          variant="contained" 
          onClick={handleUploadClick}
          sx={{ bgcolor: 'red', '&:hover': { bgcolor: '#d32f2f' } }}
        >
          Загрузить
        </Button>
        <Button 
          variant="contained" 
          onClick={handleImport}
          sx={{ bgcolor: 'red', '&:hover': { bgcolor: '#d32f2f' } }}
        >
          Импорт
        </Button>
      </Stack>
      
      <SynchronizationTable 
        data={data} 
        onInfoClick={handleInfoClick}
      />

      <FileUploadDialog
        open={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onUpload={handleFileUpload}
      />
    </Box>
  );
};

export default SynchronizationPage;
