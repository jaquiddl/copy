import { useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DialogWithSelector from "./SkillDialog.tsx";
// import { useGetAllSkills, useGetAllCategories } from ../s

const categories = [
  { label: "FrontEnd", value: "frontend" },
  { label: "BackEnd", value: "backend" },
  { label: "Design", value: "design" },
];
const skills = [
  { label: "SpringBoot", value: "springboot" },
  { label: ".NET", value: ".net" },
  { label: "React", value: "react" },
];
const levels = [
  { label: "Basic", value: "basic" },
  { label: "Begginer", value: "begginer" },
  { label: "Intermediate", value: "intermediate" },
];

export default function ExampleWithFabAndSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({
    category: "",
    skill: "",
    level: "",
  });

  // const { data: skillsData } = useGetAllSkills();
  // const { data: categoriesData } = useGetAllCategories();

  const handleClick = () => setOpen(true);

  const handleClose = (
    category: string,
    skillValue: string,
    levelValue: string
  ) => {
    setOpen(false);

    setSelected({ category, skill: skillValue, level: levelValue });
  };

  console.log("selected category: ", selected);

  return (
    <>
      <Fab color="primary" onClick={handleClick}>
        <AddIcon />
      </Fab>

      <DialogWithSelector
        open={open}
        onClose={handleClose}
        categoryOptions={categories}
        skillsOptions={skills}
        levelOptions={levels}
        title="Add new skill"
      />
    </>
  );
}
