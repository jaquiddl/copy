import PageLayout from "../../components/PageLayout.tsx";
import { Box } from "@mui/material";
import FormPropsTextFields from "../../components/Form.tsx";
import SkillGrid from "../../components/SkillGrid.tsx";
import { SkillObject } from "../../generated/Api";
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
          {resource?.data && <FormPropsTextFields resource={resource.data} />}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {resource?.data && <SkillGrid resource={resource.data} />}
        </Box>
      </Box>
    </PageLayout>
  );
};

export default HomePage;
