import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface ReusableSelectProps {
  label: string;
  items: { label: string; value: string }[];
  value: string | number;
  onChange: (value: string) => void;
}

export default function ReusableSelect({
  label,
  items,
  value,
  onChange,
}: ReusableSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    const selected = event.target.value;
    const original = items.find((item) => item.value.toString() === selected);
    onChange(original?.value ?? selected);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-select-label`}
          id={`${label}-select`}
          value={value.toString()} // Convert number to string for MUI
          label={label}
          onChange={handleChange}
        >
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value.toString()}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
