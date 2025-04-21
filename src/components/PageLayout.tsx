import { Box, Toolbar } from "@mui/material";
import ResponsiveAppBar from "./navbar.tsx";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ResponsiveAppBar />
      <Toolbar />
      <Box>{children}</Box>
    </>
  );
};

export default PageLayout;
