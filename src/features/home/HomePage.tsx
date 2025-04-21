import PageLayout from "../../components/PageLayout.tsx";
import { Box } from "@mui/material";
import FormPropsTextFields from "../../components/Form.tsx";
import SkillGrid from "../../components/SkillGrid.tsx";
import { ResourceObject } from "../../generated/Api";
import { useEffect } from "react";
import { useGetResourceById } from "../../services/ResourceService.ts";

const HomePage = () => {
  const { data: resource } = useGetResourceById(4);
  useEffect(() => {
    console.log("fromdash", resource);
  }, [resource]);
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
          <FormPropsTextFields>resource={resource?.data}</FormPropsTextFields>
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <SkillGrid />
        </Box>
      </Box>
    </PageLayout>
  );
};

export default HomePage;
