import { Typography, Paper, Chip } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

type Status = "pending" | "approved" | "dismissed";
type MUIColor = "default" | "primary" | "secondary" | "success" | "error";

export interface VacationHistoryItemProps {
  startDate: string;
  endDate: string;
  status: Status;
}

const VacationHistoryItem = ({
  startDate,
  endDate,
  status,
}: VacationHistoryItemProps) => {
  const getStatusProps = () => {
    switch (status) {
      case "pending":
        return {
          label: "Cancel Request",
          color: "error",
          icon: <AccessTimeIcon />,
        };
      case "approved":
        return {
          label: "Approved",
          color: "success",
          icon: <CheckCircleIcon />,
        };
      case "dismissed":
        return { label: "Dismissed", color: "default", icon: <ErrorIcon /> };
      default:
        return { label: "Unknown", color: "warning", icon: null };
    }
  };

  const { label, color, icon } = getStatusProps();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="body1">{`${startDate} - ${endDate}`}</Typography>
      <Chip
        icon={icon ? icon : undefined}
        label={label}
        color={color as MUIColor}
        variant="outlined"
      />
    </Paper>
  );
};

export default VacationHistoryItem;
