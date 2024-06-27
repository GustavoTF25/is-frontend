import { Box, Container, Grid, Typography, Avatar } from "@mui/material";
import { CardPostagem } from "../../Components/CardPostagem/CardPostagem";
import { useEffect, useState } from "react";
import { API, Backend } from "../../axios/axios";
import { IPostagem, ISeguir, IUsuario } from "../../Interface";
import { jwtDecode } from "jwt-decode";

interface ISeguirComAvatar extends ISeguir {
  avatar_url: string;
}

export const Feed = () => {
  const token = localStorage.getItem("token");
  const [usu_id, setUsuId] = useState<number | null>(null);
  const [listaPostagem, setListaPostagem] = useState<IPostagem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usuariosSeguidos, setUsuariosSeguidos] = useState<ISeguirComAvatar[]>([]);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<{ usu_id: number }>(token);
        setUsuId(decodedToken.usu_id);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    if (usu_id) {
      API.get<{ response: ISeguirComAvatar[] }>(`${Backend}/usuarios/seguiu/${usu_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(({ data }) => {
          setUsuariosSeguidos(data.response);
        })
        .catch((error) => {
          console.error("Erro ao obter detalhes do usuario:", error);
        });
    }
  }, [usu_id]);

  useEffect(() => {
    const fetchPostagens = async () => {
      try {
        const allPostagens: IPostagem[] = [];
        for (const seguido of usuariosSeguidos) {
          const { data } = await API.get<{ response: IPostagem[] }>(
            `${Backend}/postagens/detalhe/${seguido.seg_seguindo}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          allPostagens.push(...data.response);
        }
        setListaPostagem(allPostagens);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao obter postagens:", error);
        setIsLoading(false);
      }
    };

    if (usuariosSeguidos.length > 0) {
      fetchPostagens();
    }
  }, [usuariosSeguidos, token]);

  return (
    <Container maxWidth="lg">
      <Box textAlign="center" marginY={4}>
        <Typography
          variant="h4"
          component="h4"
          align="center"
          style={{
            fontFamily: 'Red Hat Display, sans-serif',
            fontWeight: 'bold',
            color: '#primary',
            fontSize: '2vw',
          }}
        >
          Usuários que você segue
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" marginY={2}>
          {usuariosSeguidos.map((usuario) => (
            <Avatar 
              key={usuario.seg_seguindo} 
              alt={`Avatar de ${usuario.seg_seguindo}`} 
              src={Backend + `/${usuario.avatar_url}`} 
              style={{ margin: "0 8px" }}
            />
          ))}
        </Box>
       
      </Box>

      <Grid container spacing={4}>
        {isLoading ? (
          <Typography>Carregando...</Typography>
        ) : (
          listaPostagem.map((postagem) => (
            <Grid item xs={12} sm={6} md={4} key={postagem.pos_id}>
              <CardPostagem postagem={postagem} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};
