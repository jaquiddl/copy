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
import { ProjectObject, ProjectTypeObject, Resource, CreateProjectObject } from "../../generated/Api";

const ManageProjects = () => {
    const queryClient = useQueryClient();
    const getAPI = useApi();

    const [projects, setProjects] = useState<ProjectObject[]>([]);
    const [filtered, setFiltered] = useState<ProjectObject[]>([]);
    const [editId, setEditId] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const [viewProject, setViewProject] = useState<ProjectObject | null>(null);
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const [form, setForm] = useState<CreateProjectObject>({
        name: "",
        startDate: new Date().toISOString().substring(0, 10),
        endDate: new Date().toISOString().substring(0, 10),
        projectTypeId: 0,
        idProjectManager: 0,
        active: true,
    });
    const { data: projectTypes = [] } = useQuery({
        queryKey: ["projectTypes"],
        queryFn: async () => {
          const response = await getAPI().projectTypes.getAllProjectTypes({ format: "json" });
      
          // Esto asegura que sea siempre un array plano
          return Array.isArray(response) ? response : response?.data ?? [];
        },
      });
      
      const { data: managers = [] } = useQuery({
        queryKey: ["resources"],
        queryFn: async () => {
          const response = await getAPI().resources.getAllResources({ format: "json" });
          return Array.isArray(response) ? response : response?.data ?? [];
        },
      });
      
      const { data: projectsData = [], isLoading } = useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
          const response = await getAPI().projects.getAllActiveProjects({ format: "json" });
      
          // Normalizar: si es un objeto con .data, devolver .data; si es array, usarlo directamente
          const result = Array.isArray(response) ? response : response?.data ?? [];
      
          // Actualiza estado
          setProjects(result);
          setFiltered(result);
      
          return result;
        },
      });

    const createProject = useMutation({
        mutationFn: (data: CreateProjectObject) => getAPI().projects.addProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"]);
            setOpen(false);
        },
    });

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

    const handleEdit = (project: ProjectObject) => {
        setEditId(project.id ?? null);
        setForm({
            name: "",
            startDate: new Date().toISOString().substring(0, 10),
            endDate: new Date().toISOString().substring(0, 10),
            projectTypeId: projectTypes[0]?.id ?? "",
            idProjectManager: managers[0]?.id ?? "",
            active: true,
        });
        setOpen(true);
    };

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = () => {
        if (editId) {
            updateProject.mutate({ ...form, id: editId });
        } else {
            createProject.mutate(form);
        }
    };
    useEffect(() => {
        console.log("projectTypes cargado:", projectTypes);
        console.log("managers cargado:", managers);
      }, [projectTypes, managers]);
      

    const paginated = filtered?.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <Container sx={{ mt: 5 }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Gestión de Proyectos
                    </Typography>
                    <Button variant="contained" onClick={() => {
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
                    }}>
                        Crear nuevo proyecto
                    </Button>

                    {isLoading ? (
                        <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
                    ) : (
                        <>
                            <Table sx={{ mt: 4 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Fechas</TableCell>
                                        <TableCell>Estado</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginated?.map((project) => (
                                        <TableRow key={project.id}>
                                            <TableCell>{project.name}</TableCell>
                                            <TableCell>{project.startDate} - {project.endDate}</TableCell>
                                            <TableCell>{project.active ? "✅" : "❌"}</TableCell>
                                            <TableCell>
                                                <IconButton color="primary" onClick={() => setViewProject(project)}>
                                                    <Visibility />
                                                </IconButton>
                                                <IconButton color="warning" onClick={() => handleEdit(project)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => project.id && deleteProject.mutate(project.id)}>
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
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>{editId ? "Editar Proyecto" : "Crear Proyecto"}</DialogTitle>
                <DialogContent>
                    <TextField fullWidth margin="normal" name="name" label="Nombre" value={form.name} onChange={handleChange} />
                    <TextField fullWidth margin="normal" type="date" name="startDate" label="Fecha Inicio"
                        value={form.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                    <TextField fullWidth margin="normal" type="date" name="endDate" label="Fecha Fin"
                        value={form.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="project-type">Tipo de Proyecto</InputLabel>
                        <Select labelId="project-type" name="projectTypeId" value={form.projectTypeId} onChange={handleChange}>
                            {projectTypes.map((pt) => (
                                <MenuItem key={pt.id} value={pt.id}>{pt.name}</MenuItem>
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
                    <Button variant="contained" onClick={handleSubmit}>{editId ? "Actualizar" : "Crear"}</Button>
                </DialogActions>
            </Dialog>

            {/* Detalles del proyecto */}
            <Dialog open={!!viewProject} onClose={() => setViewProject(null)} fullWidth maxWidth="md">
                <DialogTitle>Detalles del Proyecto</DialogTitle>
                <DialogContent dividers>
                    {viewProject && (
                        <>
                            <Typography variant="h6">{viewProject.name}</Typography>
                            <Typography>Fechas: {viewProject.startDate} - {viewProject.endDate}</Typography>
                            <Typography>Estado: {viewProject.active ? "Activo" : "Inactivo"}</Typography>

                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6">Perfiles asignados</Typography>
                            {viewProject.profiles?.length ? (
                                <ul>
                                    {viewProject.profiles.map((profile) => (
                                        <li key={profile.id}>
                                            {profile.name} ({profile.resource?.firstName} {profile.resource?.lastName})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <Typography variant="body2" color="text.secondary">Sin perfiles asignados</Typography>
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewProject(null)}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ManageProjects;
