import { Box, Typography } from "@mui/material";
import FloatingButtons from "./FloatingButtons";
import SelectActionCard from "./Cards";
// import { useGetPets } from "../services/useApiTest";

export default function SkillGrid() {
  // const { data } = useGetPets();

  // console.log(data);

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
        <FloatingButtons></FloatingButtons>
      </Box>

      <Box
        component="form"
        // sx={{
        //   "& .MuiTextField-root": { m: 1, width: "25ch" },
        //   display: "grid",
        //   gridTemplateColumns: "auto auto auto", // 2 columns
        //   columnGap: 0,
        //   maxWidth: "60ch",
        //   // mx: "auto",
        // }}
        noValidate
        autoComplete="off"
      ></Box>
      <SelectActionCard></SelectActionCard>
    </Box>
  );
}
