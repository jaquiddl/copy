import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  MenuItem,
  Select,
  Button,
  Chip,
  Avatar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import { ResourceObject } from "../generated/Api";

interface AllocateDialogProps {
  open: boolean;
  onClose: () => void;
  resource: ResourceObject;
  onConfirm: (updated: ResourceObject) => void;
}

export default function AllocateDialog({
  open,
  onClose,
  resource,
}: AllocateDialogProps) {
  const [project, setProject] = React.useState("");
  const [profile, setProfile] = React.useState<string>(
    ""
    //resource.profiles ? resource.profiles[0] : {} as Profile
  );

  const handleConfirm = () => {
    // onConfirm({
    //   ...resource,
    //   project,
    //   profile,
    // });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Allocate Resource</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
          {/* Selects */}
          <Box sx={{ display: "flex", gap: 2, flex: 2 }}>
            <Select
              value={project}
              displayEmpty
              onChange={(e) => setProject(e.target.value)}
              fullWidth
            >
              <MenuItem value="">All projects</MenuItem>
              {["Google", "Pinterest", "Uber", "Amazon", "Oracle"].map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={profile}
              displayEmpty
              onChange={(e) => setProfile(e.target.value)}
              fullWidth
            >
              <MenuItem value="">Profile</MenuItem>
              {["Developer", "Tester", "QA", "Analyst"].map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Resource Preview */}
          <Box
            sx={{
              flex: 1,
              bgcolor: "#f5f5f5",
              p: 2,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography fontWeight={600}>
              {resource.firstName + " " + resource.lastName}
            </Typography>
            <Chip label="Full time" variant="outlined" size="small" />
            {/* <Typography variant="body2">
              Availability: {resource.jobTitle}
            </Typography> */}

            {profile && (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <CheckCircleIcon fontSize="small" color="success" />
                <Typography>{profile}</Typography>
              </Box>
            )}

            {project && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{ bgcolor: "red" }}></Avatar>
                <Box>
                  <Typography>{project}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Ags
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* Confirm button */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleConfirm}>✓ Confirm allocation</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
