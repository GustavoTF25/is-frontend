import { useNavigate, useParams } from "react-router-dom";
import { IPostagem, ISeguir, IUsuario } from "../../Interface";
import { useEffect, useState } from "react";
import { Box, Container, Paper, Grid, CardMedia, Typography } from "@mui/material";
import { CardPostagem } from "../../Components/CardPostagem/CardPostagem";
import { SeguirUsuario } from "../../Components/SeguirUsuario/SeguirUsuario";
import { API, Backend } from "../../axios/axios";

export const DetalheUsuario = () => {
  const { usu_id } = useParams<{ usu_id?: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [usuario, setUsuario] = useState<IUsuario | null>(null);
  const [listaPostagem, setListaPostagem] = useState<IPostagem[]>([]);
  const [isFollowing, setIsFollowing] = useState<number>(0); // Estado de seguir
  const [totalSeguidores, setTotalSeguidores] = useState<number>(0); // Estado para total de seguidores

  useEffect(() => {
    API.get<{ response: IUsuario[] }>(Backend + `/usuarios/${usu_id}/`)
      .then(({ data }) => {
        setUsuario(data.response[0]);
        setTotalSeguidores(data.response[0].usu_totalseguidores || 0);
      })
      .catch((error) => {
        console.error("Erro ao obter detalhes do usuario:", error);
      });
  }, [usu_id]);

  useEffect(() => {
    API.get<{ response: IPostagem[] }>(Backend + `/postagens/detalhe/${usu_id}`)
      .then(({ data }) => {
        setListaPostagem(data.response);
      })
      .catch((error) => {
        console.error("Erro ao obter postagens:", error);
      });
  }, [usu_id]);

  useEffect(() => {
    if (token) {
      API.get<{ response: ISeguir[] }>(Backend + `/usuarios/segue/${usu_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        // console.log("data.response", data.response);
        // console.log("data.response.seg_valor", data.response[0].seg_valor);
        setIsFollowing(data.response[0].seg_valor); // Atualizar estado de seguir com base na resposta da API
      })
        .catch((error) => {
          console.error("Erro ao obter status de seguir:", error);
        });
    }
  }, [usu_id, token]);

  const handleToggleFollow = (newStatus: number) => {
    setIsFollowing(newStatus); // Atualiza o estado de seguir quando o botão é clicado
    setTotalSeguidores((prevTotal) => newStatus ? prevTotal + 1 : prevTotal - 1); // Atualiza o contador de seguidores
  };

  const formatDate = (isoDate: string | undefined) => {
    if (!isoDate) return "Data desconhecida";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderPlaceholders = (count: number) => {
    const placeholders = [];
    for (let i = 0; i < count; i++) {
      placeholders.push(
        <Grid item xs={12} sm={4} key={`placeholder-${i}`}>
          <Box
            sx={{
              width: "100%",
              height: 200,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" color="textSecondary">
              
            </Typography>
          </Box>
        </Grid>
      );
    }
    return placeholders;
  };

  return (
    <Container maxWidth={"lg"}>
      <Box
        margin={6}
        maxWidth={"100%"}
        width={"95%"}
        height={"auto"}
        display={"flex"}
        gap={1}
        flexDirection={"column"}
        justifyItems={"center"}
        alignItems={"center"}
        borderRadius={"15px"}
        component={Paper}
        padding={5}
        boxShadow={2}
      >
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <CardMedia
              component="img"
              height="140"
              src={Backend + `/${usuario?.usu_foto}`}
              sx={{ borderRadius: "10px", maxHeight: "300px" }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box
              alignItems={"center"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Typography variant="h4">{usuario?.usu_nome}</Typography>
            </Box>
            <Box
              marginTop={"5%"}
              alignItems={"center"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Typography sx={{ fontStyle: "italic" }}>
                {usuario?.usu_bio}
              </Typography>
              <Box marginTop={37} marginLeft={60} position={"absolute"}>
             
              </Box>
              
            </Box>
          </Grid>
          <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Typography>
              Usuário desde {formatDate(usuario?.usu_datacriado)}
            </Typography>
            <Typography>
              Total de Seguidores {totalSeguidores}
            </Typography>
            <Box>
              {/* Integrar o botão de seguir */}
              {usuario && (
                <SeguirUsuario usu_id={usuario.usu_id} isFollowing={isFollowing} onToggleFollow={handleToggleFollow} />
              )}
            </Box>
          </Box>
        </Grid>
        </Grid>
      </Box>
      <Box marginTop={4} marginLeft={5}>
        <Typography variant="h5" gutterBottom>
          Postagens de {usuario?.usu_nome}
        </Typography>
        <Grid container spacing={5}>
          {listaPostagem.map((postagem, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <CardPostagem postagem={postagem} />
            </Grid>
          ))}
          {listaPostagem.length < 3 && renderPlaceholders(3 - listaPostagem.length)}
        </Grid>
      </Box>
    </Container>
  );
};
