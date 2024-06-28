import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Link,
  TextField,
  CircularProgress,
  Grid,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import logo from '../../assets/logo2.png';

export const LoginUsuario = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const LoginUserFormSchema = z.object({
    email: z
      .string()
      .nonempty("campo obrigatorio")
      .email("Formato de email inválido"),
    password: z.string().nonempty("campo obrigatorio"),
  });

  type LoginFormData = z.infer<typeof LoginUserFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginUserFormSchema),
  });

  const loginUser = (data: LoginFormData) => {
    setIsLoading(true);
    axios
      .post("http://localhost:8000/usuarios/login", {
        email: data.email,
        senha: data.password,
      })
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("email ou senha incorretos");
      });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} justifyContent="center">
        {/* Login Section */}
        <Grid item xs={12} md={6}>
          <Box
            component={Paper}
            margin={2}
            padding={4}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"15px"}
            boxShadow={2}
            minHeight={600} // Aumentando a altura do card de login
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={3}
              width="100%"
              maxWidth={400}
              component="form"
              onSubmit={handleSubmit(loginUser)}
            >
              <Typography variant="h4" align="center" color={"black"}>
                Login
              </Typography>

              <TextField
                label="Email"
                {...register("email")}
                helperText={errors.email?.message}
                disabled={isLoading}
                error={!!errors.email?.message}
                color="primary"
                type="email"
              />

              <TextField
                label="Senha"
                {...register("password")}
                type="password"
                helperText={errors.password?.message}
                disabled={isLoading}
                error={!!errors.password?.message}
                color="primary"
              />
              <Box display={"flex"} justifyContent={"end"}>
                <Link href="/recuperarSenha" color={"primary"}>
                  Esqueceu a Senha?
                </Link>
              </Box>

              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                marginTop={2}
              >
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    type="submit"
                    endIcon={
                      isLoading ? (
                        <CircularProgress
                          variant="indeterminate"
                          color="inherit"
                          size={20}
                        />
                      ) : undefined
                    }
                  >
                    Login
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Imagem Section */}
        <Grid item xs={12} md={6}>
          <Box
            component={Paper}
            margin={2}
            padding={2}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"15px"}
            boxShadow={2}
            minHeight={600} // Aumentando a altura do card da imagem
          >
            <Box display="flex" justifyContent="center" marginBottom={2}>
              <img src={logo} alt="Logo" style={{ maxHeight: '300px' }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
