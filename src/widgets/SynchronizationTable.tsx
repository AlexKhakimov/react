import React, { useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
  Typography,
  Grid,
  Paper,
  styled,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useGetSyncDataQuery } from "../store/api/syncApi";

interface DataItem {
  id: string;
  name: string;
  action: string;
}

interface SynchronizationTableProps {
  data: DataItem[];
  onInfoClick: (key: string) => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
}));

const InfoLabel = styled(Typography)({
  fontWeight: "bold",
  color: "#666",
});

const InfoValue = styled(Typography)({
  marginLeft: "8px",
  wordBreak: "break-word",
});

const SynchronizationTable: React.FC<SynchronizationTableProps> = ({
  data,
  onInfoClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemKey, setSelectedItemKey] = useState<string>("");

  const {
    data: apiData,
    isLoading,
    error,
  } = useGetSyncDataQuery(selectedItemKey, {
    skip: !isModalOpen,
  });

  const handleInfoClick = (key: string) => {
    setSelectedItemKey(key);
    setIsModalOpen(true);
    onInfoClick(key);
  };

  const columns: MRT_ColumnDef<DataItem>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Наименование",
    },
    {
      accessorKey: "action",
      header: "Действие",
      Cell: ({ row }) => (
        <IconButton
          onClick={() => handleInfoClick(row.original.id)}
          color="primary"
          size="small"
        >
          <InfoIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={true}
        enableSorting={true}
        muiTableProps={{
          sx: {
            tableLayout: "fixed",
          },
        }}
      />

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="info-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="info-dialog-title">Детальная информация</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <CircularProgress />
          ) : error ? (
            <DialogContentText color="error">
              {error instanceof Error
                ? error.message
                : "Произошла ошибка при загрузке данных"}
            </DialogContentText>
          ) : apiData ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledPaper>
                  <Grid container spacing={1}>
                    {Object.entries(apiData).map(([key, value]) => (
                      <Grid item xs={12} key={key}>
                        <Grid container alignItems="center">
                          <Grid item>
                            <InfoLabel variant="subtitle2">{key}:</InfoLabel>
                          </Grid>
                          <Grid item xs>
                            <InfoValue>
                              {typeof value === "object"
                                ? JSON.stringify(value, null, 2)
                                : String(value)}
                            </InfoValue>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </StyledPaper>
              </Grid>
            </Grid>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SynchronizationTable;
