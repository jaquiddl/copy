import { Box } from "@mui/material";
import PageLayout from "../../components/PageLayout";
import ResponsiveDatePickers from "../../components/DatePicker";
import VacationHistoryList from "../../components/HistoryList";

const Vacations = () => {
  return (
    <PageLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          padding: 2,
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <ResponsiveDatePickers></ResponsiveDatePickers>
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <VacationHistoryList></VacationHistoryList>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default Vacations;
