import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "../types/form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

axios.defaults.withCredentials = true;

const LoginPage = () => {
  const [formData, setFormData] = useState<Form>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_BASE_URL + "/login", formData);
      if (res.status === 200) {
        setResponse(res.data.message);
        setFormData({ email: "", password: "" });
        navigate("/");
      } else if (res.status === 400) {
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.error);
        } else {
          setError("An unexpected error occurred");
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <form onSubmit={handleLogin} method="post">
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Grid container justifyContent={"flex-end"}>
                <Grid item>
                  <Link to="/register">Don't have an account? Register</Link>
                </Grid>
              </Grid>
            </form>
            {response && <p className="mt-4 text-green-600">{response}</p>}
            {error && <p className="mt-4 text-red-600">Error: {error}</p>}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
