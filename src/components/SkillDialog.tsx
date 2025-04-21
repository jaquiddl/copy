import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import ReusableSelect from "./SelectItem.tsx";

interface DialogWithSelectorProps {
  open: boolean;
  onClose: (category: string, skillValue: string, levelValue: string) => void;
  categoryOptions: { label: string; value: string }[];
  skillsOptions: { label: string; value: string }[];
  levelOptions: { label: string; value: string }[];
  title?: string;
}

export default function DialogWithSelector({
  open,
  onClose,
  categoryOptions,
  skillsOptions,
  levelOptions,
  title = "Select a category",
}: DialogWithSelectorProps) {
  const [categorySelected, setCategorySelected] = useState<string>("");
  const [skillSelected, setSkillSelected] = useState<string>("");
  const [levelSelected, setLevelSelected] = useState<string>("");

  const handleConfirm = () => {
    onClose(categorySelected, skillSelected, levelSelected);
  };

  return (
    <Dialog open={open} onClose={() => onClose("", "", "")}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 5,
            paddingTop: 1,
          }}
        >
          <ReusableSelect
            label="Category"
            items={categoryOptions}
            value={categorySelected}
            onChange={setCategorySelected}
          />
          <ReusableSelect
            label="Skill"
            items={skillsOptions}
            value={skillSelected}
            onChange={setSkillSelected}
          />
          <ReusableSelect
            label="Level"
            items={levelOptions}
            value={levelSelected}
            onChange={setLevelSelected}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose("", "", "")}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
