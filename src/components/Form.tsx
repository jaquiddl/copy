import { Box, TextField, Typography } from "@mui/material";
import { ResourceObject } from "../generated/Api";

interface ResourceProps {
  resource: ResourceObject;
}
export default function FormPropsTextFields(props: ResourceProps) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Typography variant="h5" component="h2">
          Personal Details
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "grid",
          gridTemplateColumns: "auto auto", // 2 columns
          columnGap: 2,
          maxWidth: "60ch",
          padding: "10px",
          paddingTop: "35px",
          // mx: "auto",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="field-1"
          label="Name"
          defaultValue="Mock User"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          id="field-2"
          label="Last name"
          defaultValue="Mock User"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          id="field-3"
          label="ID"
          defaultValue="Mock User"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          id="field-4"
          label="Location"
          defaultValue="Mock User"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          id="field-5"
          label="Job title"
          defaultValue="Mock User"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          id="field-6"
          label="Experience"
          defaultValue="Mock User"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          id="field-7"
          label="Allocation"
          defaultValue="Mock User"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          id="field-8"
          label="Profile"
          defaultValue="Mock User"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
      </Box>
    </Box>
  );
}
