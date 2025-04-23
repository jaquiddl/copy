"use client";
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Box,
  OutlinedInput,
  ListItemText,
  InputAdornment,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../../services/APIService";
import { Role, Skill, ResourceObject } from "../../generated/Api";

// Iconos
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import WorkIcon from "@mui/icons-material/Work";
import TimelineIcon from "@mui/icons-material/Timeline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import StarIcon from "@mui/icons-material/Star";

const CreateResourcePage = () => {
  const getAPI = useApi();
  const queryClient = useQueryClient();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = useState<ResourceObject>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    experience: "",
    location: "",
    role: { id: 1 },
    active: true,
    password: "",
    user: "",
    skills: [],
  });

  const { data: skills = [] } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const response = await getAPI().skills.getAllSkills({ format: "json" });
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

  const createResource = useMutation({
    mutationFn: (data: ResourceObject) => getAPI().resources.createResource(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["resources"]);
      alert("¡Recurso creado exitosamente!");
    },
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f8f8 0%, #e0f7fa 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={0}
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          p: isMobile ? 3 : 5,
          width: "100%",
          maxWidth: 600,
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          maxHeight: "95vh",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight={800}
          sx={{
            mb: 4,
            color: "#005bea",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Crear Nuevo Recurso
        </Typography>

        <Box component="form" display="grid" gap={3}>
          <TextField
            label="Nombre"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Apellido"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Puesto"
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WorkIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Experiencia"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TimelineIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Ubicación"
            name="location"
            value={form.location}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Usuario"
            name="user"
            value={form.user}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel id="role-label">Rol</InputLabel>
            <Select
              labelId="role-label"
              value={form.role?.id ?? ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  role: { id: Number(e.target.value) },
                }))
              }
              label="Rol"
              startAdornment={
                <InputAdornment position="start">
                  <AssignmentIndIcon />
                </InputAdornment>
              }
            >
              {roles.map((role: Role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel id="skills-label">Habilidades</InputLabel>
            <Select
              labelId="skills-label"
              multiple
              value={form.skills?.map((s) => s.id!) || []}
              onChange={(e) => {
                const selectedIds = e.target.value as number[];
                const selectedSkills = skills.filter((s) =>
                  selectedIds.includes(s.id!)
                );
                setForm((prev) => ({ ...prev, skills: selectedSkills }));
              }}
              input={<OutlinedInput label="Habilidades" />}
              renderValue={(selected) =>
                (selected as number[])
                  .map((id) => skills.find((s) => s.id === id)?.name)
                  .join(", ")
              }
              startAdornment={
                <InputAdornment position="start">
                  <StarIcon />
                </InputAdornment>
              }
            >
              {skills.map((skill: Skill) => (
                <MenuItem key={skill.id} value={skill.id}>
                  <Checkbox
                    checked={form.skills?.some((s) => s.id === skill.id)}
                  />
                  <ListItemText primary={skill.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box display="flex" alignItems="center" gap={1}>
            <Checkbox
              checked={form.active}
              onChange={handleChange}
              name="active"
            />
            <Typography>Activo</Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => createResource.mutate(form)}
            sx={{
              background: "linear-gradient(to right, #005bea, #00c6fb)",
              color: "white",
              fontWeight: "bold",
              py: 1.5,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                background: "linear-gradient(to right, #0040c1, #00a9d4)",
              },
            }}
          >
            GUARDAR RECURSO
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateResourcePage;
