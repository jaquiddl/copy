"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  Divider,
  Pagination,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useApi from "../../services/APIService";
import {
  //   ProjectObject,
  ProjectTypeObject,
  Resource,
  CreateProjectObject,
  Project,
} from "../../generated/Api";
import PageLayout from "../../components/PageLayout";
import { useAddProject, useGetProjects } from "../../services/ProjectService";
import { useGetResources } from "../../services/ResourceService";
import { useGetProjectTypes } from "../../services/ProjectTypes";

const ManageProjects = () => {
  const { data: projects, isLoading } = useGetProjects();
  const { data: managersResponse } = useGetResources();
  const { data: projectTypesResponse } = useGetProjectTypes();
  const managers = Array.isArray(managersResponse)
    ? managersResponse
    : managersResponse?.data ?? [];

  const projectTypes = Array.isArray(projectTypesResponse)
    ? projectTypesResponse
    : projectTypesResponse?.data ?? [];

  useEffect(() => {
    console.log("fromdash", projects);
  }, [projects]);

  useEffect(() => {
    console.log("projecttypes", projectTypes);
  }, [projectTypes]);

  const queryClient = useQueryClient();
  const getAPI = useApi();

  const [projectList, setProjectList] = useState<Project[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [viewProject, setViewProject] = useState<Project | null>(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    console.log("projects from useGetProjects", projects);
    if (projects && Array.isArray(projects)) {
      console.log("updating states with", projects);
      setProjectList(projects);
      setFiltered(projects);
    }
  }, [projects]);

  useEffect(() => {
    console.log("projectList: ", projectList);
    console.log("filtered: ", filtered);
  }, [projectList, filtered]);

  const [form, setForm] = useState<CreateProjectObject>({
    name: "",
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
    projectTypeId: 0,
    idProjectManager: 0,
    active: true,
  });

  const createProject = useAddProject();

  const updateProject = useMutation({
    mutationFn: (data: ProjectObject) => getAPI().projects.updateProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      setOpen(false);
    },
  });

  const deleteProject = useMutation({
    mutationFn: (id: number) => getAPI().projects.deactivateProject(id),
    onSuccess: () => queryClient.invalidateQueries(["projects"]),
  });

  const handleEdit = (project: Project) => {
    setEditId(project.id ?? null);
    setForm({
      name: project.name ?? "",
      startDate: project.startDate?.substring(0, 10) ?? "",
      endDate: project.endDate?.substring(0, 10) ?? "",
      projectTypeId: project.projectType ?? "",
      idProjectManager: managers[0]?.id ?? "",
      active: true,
    });
    setOpen(true);
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (editId) {
      updateProject.mutate({ ...form, id: editId });
    } else {
      createProject.mutate(form, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["projects"] });
          setOpen(false);
        },
        onError: (error) => {
          console.error("failed to creare project", error);
        },
      });
    }
  };
  useEffect(() => {
    console.log("projectTypes cargado:", projectTypes);
    console.log("managers cargado:", managers);
  }, [projectTypes, managers]);

  const paginated = filtered?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <PageLayout>
      <Container sx={{ mt: 5 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Projects Management
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setEditId(null);
                setForm({
                  name: "",
                  startDate: new Date().toISOString().substring(0, 10),
                  endDate: new Date().toISOString().substring(0, 10),
                  projectTypeId: 0,
                  idProjectManager: 0,
                  active: true,
                });
                setOpen(true);
              }}
            >
              Create new project
            </Button>

            {isLoading ? (
              <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Table sx={{ mt: 4 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginated?.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>
                          {project.startDate} - {project.endDate}
                        </TableCell>
                        <TableCell>{project.active ? "✅" : "❌"}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => setViewProject(project)}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            color="warning"
                            onClick={() => handleEdit(project)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() =>
                              project.id && deleteProject.mutate(project.id)
                            }
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Box display="flex" justifyContent="center" mt={2}>
                  <Pagination
                    count={Math.ceil((filtered?.length || 0) / rowsPerPage)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                  />
                </Box>
              </>
            )}
          </CardContent>
        </Card>

        {/* Crear/Editar proyecto */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {editId ? "Edit Project" : "Create Project"}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              name="name"
              label="Name"
              value={form.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              type="date"
              name="startDate"
              label="Start Date"
              value={form.startDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              margin="normal"
              type="date"
              name="endDate"
              label="End Date"
              value={form.endDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="project-type">Project Type</InputLabel>
              <Select
                labelId="project-type"
                label="Project Type"
                name="projectTypeId"
                value={form.projectTypeId}
                onChange={handleChange}
              >
                {projectTypes.map((pt) => (
                  <MenuItem key={pt.id} value={pt.id}>
                    {pt.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="manager">Project Manager</InputLabel>
              <Select
                labelId="manager"
                name="idProjectManager"
                value={form.idProjectManager}
                onChange={handleChange}
              >
                {(managers || []).map((pm) => (
                  <MenuItem key={pm.id} value={pm.id}>
                    {pm.firstName} {pm.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button variant="contained" onClick={handleSubmit}>
              {editId ? "Actualizar" : "Crear"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Detalles del proyecto */}
        <Dialog
          open={!!viewProject}
          onClose={() => setViewProject(null)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Project Details</DialogTitle>
          <DialogContent dividers>
            {viewProject && (
              <>
                <Typography variant="h6">{viewProject.name}</Typography>
                <Typography>
                  Dates: {viewProject.startDate} - {viewProject.endDate}
                </Typography>
                <Typography>
                  State: {viewProject.active ? "Active" : "Inactive"}
                </Typography>

                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Allocated Profiles</Typography>
                {viewProject.profiles?.length ? (
                  <ul>
                    {viewProject.profiles.map((profile) => (
                      <li key={profile.id}>
                        {profile.name} ({profile.resource?.firstName}{" "}
                        {profile.resource?.lastName})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No allocated Profiles
                  </Typography>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewProject(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </PageLayout>
  );
};

export default ManageProjects;
