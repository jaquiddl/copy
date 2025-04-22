import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SignIn from "./features/signIn/SignIn.tsx";
import HomePage from "./features/home/HomePage.tsx";
import NoPage from "./features/noPage/NoPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Vacations from "./features/vacations/Vacations.tsx";
import Dashboard from "./features/Dashboard.tsx";
import ManageProfiles from "./features/profiles/ManageProfiles.tsx";
import ManageProjects from "./features/project/ManageProjects.tsx";

// Ensure this matches the file name
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/vacations" element={<Vacations />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profiles" element={<ManageProfiles />} />
          <Route path="/project" element={<ManageProjects />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
