import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Button, Chip, Box } from "@mui/material";
import AllocateDialog from "./Dialog";
import { ResourceObject } from "../generated/Api";

interface ResourceTableProps {
  resources: ResourceObject[];
}

const ResourceTable = (props: ResourceTableProps) => {
  const [resources, setResources] = useState<ResourceObject[]>(props.resources);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] =
    useState<ResourceObject | null>(null);

  useEffect(() => {
    setResources(props.resources);
  }, [props.resources]);

  const handleOpenDialog = (row: ResourceObject) => {
    setSelectedResource(row);
    setDialogOpen(true);
  };

  const handleConfirmAllocation = (updatedResource: ResourceObject) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === updatedResource.id ? { ...r, ...updatedResource } : r
      )
    );
    setDialogOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", flex: 1 },
    { field: "firstName", headerName: "Name", flex: 1 },
    { field: "jobTitle", headerName: "Job title", flex: 1 },
    { field: "experience", headerName: "Experience", flex: 1 },

    {
      field: "Assignable",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Available" ? "success" : "error"}
          variant="outlined"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog(params.row)}
        >
          Allocate Resource
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={resources}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
              page: 0,
            },
          },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableRowSelectionOnClick
      />

      {selectedResource && (
        <AllocateDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          resource={selectedResource}
          onConfirm={handleConfirmAllocation}
        />
      )}
    </Box>
  );
};

export default ResourceTable;
