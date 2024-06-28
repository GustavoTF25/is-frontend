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
import { StyledTextField } from "../../Themes";
import { useState } from "react";
import { Backend } from "../../axios/axios";
import logo from "../../assets/logo2.png"; // Importa a logo

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
      .post(Backend+"/usuarios/login", {
        email: data.email,
        senha: data.password,
      })
      .then((response) => {
        //setMensagemErro(true);
        setIsLoading(false);
        if (response.status === 200) {
          setIsLoading(false)
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
    <Container maxWidth={"lg"}>
      <Box
        margin={6}
        maxWidth={1000}
        height={800}
        maxHeight={1000}
        //sx={{ backgroundColor: "#BA5AFA" }}
        display={"flex"}
        gap={1}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"15px"}
        component={Paper}
        boxShadow={2}
      >  <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12} md={5}>
          <Box display="flex" justifyContent="center">
              <img src={logo} alt="Logo" style={{ width: '100%', maxWidth: '200px' }} /> {/* Adiciona a logo */}
          </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          width="80%"
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
            color="pedro"
            type="email"
          />

          <TextField
            label="Senha"
            {...register("password")}
            type="password"
            helperText={errors.password?.message}
            disabled={isLoading}
            error={!!errors.password?.message}
            color="pedro"
          />
          <Box display={"flex"} justifyContent={"end"}>
            <Link href="/recuperarSenha" color="#2104ab">
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
        </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
