import { Box, Typography } from "@mui/material";
import FloatingButtons from "./FloatingButtons";
import SelectActionCard from "./Cards";
import { ResourceObject } from "../generated/Api";

interface SkillProps {
  resource: ResourceObject;
}

export default function SkillGrid({ resource }: SkillProps) {
  const skills = resource.skills ?? [];

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
          Skills Section
        </Typography>
        <FloatingButtons />
      </Box>

      <Box component="form" noValidate autoComplete="off">
        {/* Form content if needed */}
      </Box>

      <SelectActionCard skills={skills} />
    </Box>
  );
}
