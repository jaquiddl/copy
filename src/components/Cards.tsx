import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

const cards = [
  {
    id: 2,
    title: "Skill",
    description: "Level",
  },
  {
    id: 3,
    title: "Skill",
    description: "Level",
  },
  {
    id: 3,
    title: "Skill",
    description: "Level",
  },
  {
    id: 3,
    title: "Skill",
    description: "Level",
  },
  {
    id: 3,
    title: "Skill",
    description: "Level",
  },
  {
    id: 3,
    title: "Skill",
    description: "Level",
  },
  {
    id: 3,
    title: "Skill",
    description: "Level",
  },
];

function SelectActionCard() {
  const [selectedCard, setSelectedCard] = React.useState(-1);
  return (
    <Box
      sx={{
        width: "80%",
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(150px, 1fr))",
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? "" : undefined}
            sx={{
              height: "100%",
              "&[data-active]": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selectedHover",
                },
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h6" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default SelectActionCard;
