"use client";

import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Box,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TablePagination,
    useMediaQuery,
    useTheme,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Collapse,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Delete } from "@mui/icons-material";
import useApi from "../../services/APIService";
import { ResourceObject, Role } from "../../generated/Api";
import { useEffect, useState } from "react";

const ListResourcesPage = () => {
    const getAPI = useApi();
    const queryClient = useQueryClient();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5);
    const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [editData, setEditData] = useState<ResourceObject | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { data: resources = [], isLoading } = useQuery({
        queryKey: ["resources"],
        queryFn: async () => {
            const response = await getAPI().resources.getAllResources({ format: "json" });
            return Array.isArray(response) ? response : response?.data ?? [];
        },
    });
    const { data: roles = [] } = useQuery({
        queryKey: ["roles"],
        queryFn: async () => {
            const response = await getAPI().roles.getAllRoles({ format: "json" });
            return Array.isArray(response) ? response : response?.data ?? [];
        },
    });

    const updateResource = useMutation({
        mutationFn: (data: ResourceObject) => getAPI().resources.updateResource(data),
        onSuccess: () => {
            setAlert({ message: "Recurso actualizado", type: "success" });
            queryClient.invalidateQueries(["resources"]);
            setEditData(null);
        },
        onError: () => {
            setAlert({ message: "Error al actualizar el recurso", type: "error" });
        },
    });

    const deleteResource = useMutation({
        mutationFn: (id: number) => getAPI().resources.deleteResource(id),
        onSuccess: () => {
            setAlert({ message: "Recurso eliminado", type: "success" });
            queryClient.invalidateQueries(["resources"]);
            setDeleteId(null);
        },
        onError: () => {
            setAlert({ message: "Error al eliminar el recurso", type: "error" });
        },
    });

    const paginated = resources.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleEditChange = (e: any) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev!, [name]: value }));
    };

    // Oculta alert después de 3 segundos
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <Container sx={{ mt: 5 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Lista de Recursos
                </Typography>

                <Collapse in={!!alert}>
                    {alert && (
                        <Alert severity={alert.type} sx={{ mb: 2 }}>
                            {alert.message}
                        </Alert>
                    )}
                </Collapse>

                {isLoading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Table
                            size={isMobile ? "small" : "medium"}
                            sx={{
                                borderRadius: 2,
                                overflow: "hidden",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#f9fbfd",
                            }}
                        >
                            <TableHead>
                                <TableRow
                                    sx={{
                                        background: "linear-gradient(to right, #005bea, #00c6fb)",
                                    }}
                                >
                                    {[
                                        "Nombre",
                                        "Apellido",
                                        "Puesto",
                                        "Experiencia",
                                        "Ubicación",
                                        "Usuario",
                                        "Activo",
                                        "Acciones",
                                    ].map((header) => (
                                        <TableCell
                                            key={header}
                                            sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
                                        >
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginated.map((resource) => (
                                    <TableRow
                                        key={resource.id}
                                        sx={{
                                            transition: "0.2s",
                                            "&:hover": {
                                                backgroundColor: "#e3f2fd",
                                                transform: "scale(1.01)",
                                            },
                                        }}
                                    >
                                        <TableCell align="center">{resource.firstName}</TableCell>
                                        <TableCell align="center">{resource.lastName}</TableCell>
                                        <TableCell align="center">{resource.jobTitle}</TableCell>
                                        <TableCell align="center">{resource.experience}</TableCell>
                                        <TableCell align="center">{resource.location}</TableCell>
                                        <TableCell align="center">{resource.user}</TableCell>
                                        <TableCell align="center">
                                            <Box
                                                component="span"
                                                sx={{
                                                    px: 2,
                                                    py: 0.5,
                                                    borderRadius: "999px",
                                                    backgroundColor: resource.active ? "#c8e6c9" : "#ffcdd2",
                                                    color: resource.active ? "#2e7d32" : "#c62828",
                                                    fontWeight: "bold",
                                                    fontSize: "0.875rem",
                                                }}
                                            >
                                                {resource.active ? "✅" : "❌"}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="primary"
                                                onClick={() => setEditData(resource)}
                                                sx={{ mx: 1 }}
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => setDeleteId(resource.id!)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>


                        <TablePagination
                            component="div"
                            count={resources.length}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[rowsPerPage]}
                        />
                    </>
                )}
            </Paper>

            {/* Modal editar */}
            <Dialog open={!!editData} onClose={() => setEditData(null)} maxWidth="sm" fullWidth>
                <DialogTitle>Editar Recurso</DialogTitle>
                <DialogContent dividers>
                    <Box display="grid" gap={2} mt={1}>
                        <TextField label="Nombre" name="firstName" value={editData?.firstName || ""} onChange={handleEditChange} fullWidth />
                        <TextField label="Apellido" name="lastName" value={editData?.lastName || ""} onChange={handleEditChange} fullWidth />
                        <TextField label="Puesto" name="jobTitle" value={editData?.jobTitle || ""} onChange={handleEditChange} fullWidth />
                        <TextField label="Experiencia" name="experience" value={editData?.experience || ""} onChange={handleEditChange} fullWidth />
                        <TextField label="Ubicación" name="location" value={editData?.location || ""} onChange={handleEditChange} fullWidth />
                        <TextField label="Usuario" name="user" value={editData?.user || ""} onChange={handleEditChange} fullWidth />
                        <FormControl fullWidth>
                            <InputLabel>Rol</InputLabel>
                            <Select
                                name="role"
                                value={editData?.role?.id || ""}
                                onChange={(e) => setEditData((prev) => ({ ...prev!, role: { id: Number(e.target.value) } }))}
                            >
                                {roles.map((r: Role) => (
                                    <MenuItem key={r.id} value={r.id}>
                                        {r.role}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditData(null)}>Cancelar</Button>
                    <Button variant="contained" onClick={() => updateResource.mutate(editData!)}>
                        Guardar Cambios
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmar eliminación */}
            <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                <DialogTitle>¿Eliminar recurso?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Cancelar</Button>
                    <Button color="error" onClick={() => deleteResource.mutate(deleteId!)}>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ListResourcesPage;
