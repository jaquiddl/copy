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
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Pagination,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import useApi from "../../services/APIService";
import {
  CreateProfileObject,
  ProfileObject,
  Skill,
  Resource,
} from "../../generated/Api";
import PageLayout from "../../components/PageLayout";

const ManageProfiles = () => {
  const [viewDetails, setViewDetails] = useState<ProfileObject | null>(null);
  const queryClient = useQueryClient();
  const getAPI = useApi();

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<CreateProfileObject>({
    name: "",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    projectId: 4,
    active: true,
    external: false,
    skills: [],
    resource: undefined,
  });

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const response = await getAPI().profiles.getAllCategories({
        format: "json",
      });
      return Array.isArray(response) ? response : response.data;
    },
  });

  const paginatedProfiles = profiles?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const { data: skills = [] } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const response = await getAPI().skills.getAllSkills({ format: "json" });
      return Array.isArray(response) ? response : response?.data ?? [];
    },
  });

  const { data: resources = [] } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const response = await getAPI().resources.getAllResources({
        format: "json",
      });
      return Array.isArray(response) ? response : response?.data ?? [];
    },
  });

  const createProfile = useMutation({
    mutationFn: (data: CreateProfileObject) =>
      getAPI().profiles.createProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["profiles"]);
      setOpen(false);
    },
  });

  const updateProfile = useMutation({
    mutationFn: (data: ProfileObject) => getAPI().profiles.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["profiles"]);
      setOpen(false);
    },
  });

  const deleteProfile = useMutation({
    mutationFn: (id: number) => getAPI().profiles.deleteProfile(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["profiles"]);
    },
  });

  const handleEdit = (profile: ProfileObject) => {
    setEditId(profile.id ?? null);
    setForm({
      name: profile.name ?? "",
      startDate: profile.startDate ?? new Date().toISOString(),
      endDate: profile.endDate ?? new Date().toISOString(),
      projectId: profile.projectId!,
      active: profile.active ?? true,
      external: profile.external ?? false,
      skills: profile.skills ?? [],
      resource: profile.resource ?? undefined,
    });
    setOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (editId) {
      updateProfile.mutate({ ...form, id: editId });
    } else {
      createProfile.mutate(form);
    }
  };

  return (
    <PageLayout>
      <Container sx={{ mt: 5 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Profiles Management
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setForm({
                  name: "",
                  startDate: new Date().toISOString(),
                  endDate: new Date().toISOString(),
                  projectId: 4,
                  active: true,
                  external: false,
                  skills: [],
                  resource: undefined,
                });
                setEditId(null);
                setOpen(true);
              }}
            >
              Create new profile
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
                      <TableCell>Active</TableCell>
                      <TableCell>External</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedProfiles?.map((profile: ProfileObject) => (
                      <TableRow key={profile.id}>
                        <TableCell>{profile.name}</TableCell>
                        <TableCell>
                          {profile.startDate?.substring(0, 10)} -{" "}
                          {profile.endDate?.substring(0, 10)}
                        </TableCell>
                        <TableCell>{profile.active ? "✅" : "❌"}</TableCell>
                        <TableCell>{profile.external ? "🌐" : "👤"}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => setViewDetails(profile)}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            color="warning"
                            onClick={() => handleEdit(profile)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() =>
                              profile.id && deleteProfile.mutate(profile.id)
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
                    count={Math.ceil((profiles?.length || 0) / rowsPerPage)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                  />
                </Box>
              </>
            )}
          </CardContent>
        </Card>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {editId ? "Edit Profile" : "Create Profile"}
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              fullWidth
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              type="date"
              label="Start Date"
              name="startDate"
              value={form.startDate.substring(0, 10)}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="normal"
              fullWidth
              type="date"
              label="End Date"
              name="endDate"
              value={form.endDate.substring(0, 10)}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="skills-label">Skills</InputLabel>
              <Select
                labelId="skills-label"
                multiple
                value={form.skills?.map((s) => s.id) || []}
                onChange={(e) => {
                  const selected = e.target.value as number[];
                  const selectedSkills =
                    skills?.filter((skill) => selected.includes(skill.id!)) ||
                    [];
                  setForm((prev) => ({ ...prev, skills: selectedSkills }));
                }}
                renderValue={(selected) =>
                  (selected as number[])
                    .map((id) => skills?.find((skill) => skill.id === id)?.name)
                    .join(", ")
                }
              >
                {skills?.map((skill) => (
                  <MenuItem key={skill.id} value={skill.id}>
                    {skill.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="resource-label">Resource</InputLabel>
              <Select
                labelId="resource-label"
                value={form.resource?.id ?? ""}
                onChange={(e) => {
                  const selected = resources?.find(
                    (r) => r.id === Number(e.target.value)
                  );
                  setForm((prev) => ({ ...prev, resource: selected }));
                }}
              >
                {resources?.map((resource) => (
                  <MenuItem key={resource.id} value={resource.id}>
                    {resource.firstName} {resource.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={form.active}
                  onChange={handleChange}
                  name="active"
                />
              }
              label="Active"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.external}
                  onChange={handleChange}
                  name="external"
                />
              }
              label="External"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained">
              {editId ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={!!viewDetails}
          onClose={() => setViewDetails(null)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Profile Details</DialogTitle>
          <DialogContent dividers>
            {viewDetails && (
              <>
                <Typography variant="h6" gutterBottom>
                  Name: {viewDetails.name}
                </Typography>
                <Typography variant="body1">
                  Date: {viewDetails.startDate?.substring(0, 10)} -{" "}
                  {viewDetails.endDate?.substring(0, 10)}
                </Typography>
                <Typography variant="body1">
                  Active: {viewDetails.active ? "Sí" : "No"}
                </Typography>
                <Typography variant="body1">
                  External: {viewDetails.external ? "Sí" : "No"}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Skills
                </Typography>
                {viewDetails.skills?.length ? (
                  <ul>
                    {viewDetails.skills.map((skill) => (
                      <li key={skill.id}>{skill.name}</li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No associated skills
                  </Typography>
                )}

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Resource
                </Typography>
                {viewDetails.resource ? (
                  <>
                    <Typography variant="body1">
                      Name: {viewDetails.resource.firstName}{" "}
                      {viewDetails.resource.lastName}
                    </Typography>
                    <Typography variant="body1">
                      Job Title: {viewDetails.resource.jobTitle}
                    </Typography>
                    <Typography variant="body1">
                      Experience: {viewDetails.resource.experience}
                    </Typography>
                    <Typography variant="body1">
                      Location: {viewDetails.resource.location}
                    </Typography>
                    <Typography variant="body1">
                      User: {viewDetails.resource.user}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No resource allocation
                  </Typography>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewDetails(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </PageLayout>
  );
};

export default ManageProfiles;
