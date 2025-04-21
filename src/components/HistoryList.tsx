import { Box, Typography } from "@mui/material";
import VacationHistoryItem, { VacationHistoryItemProps } from "./HistoryItem";

const data: VacationHistoryItemProps[] = [
  { startDate: "18 July 2025", endDate: "1 August 2025", status: "pending" },
  { startDate: "18 July 2024", endDate: "1 August 2024", status: "approved" },
  { startDate: "1 July 2024", endDate: "August 2024", status: "dismissed" },
];

const VacationHistoryList = () => {
  return (
    <Box p={2}>
      <Typography variant="h6" mb={2}>
        History
      </Typography>
      {data.map((item, index) => (
        <VacationHistoryItem key={index} {...item} />
      ))}
    </Box>
  );
};

export default VacationHistoryList;
