import { Box, Typography } from "@mui/material";
import PageLayout from "../components/PageLayout";
import ResourceTable from "../components/ResourceTable";
import { useGetResources } from "../services/ResourceService";
import { ResourceObject } from "../generated/Api";
import { useEffect } from "react";
import { data } from "react-router-dom";

const Dashboard = () => {
  const { data: resources } = useGetResources();

  useEffect(() => {
    console.log("fromdash", resources);
  }, [resources]);
  return (
    <PageLayout>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 4, padding: 2 }}
      >
        <Typography variant="h5" component="h2">
          Resource List
        </Typography>
      </Box>

      <ResourceTable
        resources={resources?.data ?? ([] as ResourceObject[])}
      ></ResourceTable>
    </PageLayout>
  );
};

export default Dashboard;
