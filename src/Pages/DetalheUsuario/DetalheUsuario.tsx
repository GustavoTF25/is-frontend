import { useNavigate, useParams } from "react-router-dom";
import { IPostagem, IUsuario } from "../../Interface";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Paper, Grid, CardMedia, Typography, Button, TextField } from "@mui/material";
import { ImagemUsuario } from "../../Components/ImagemUsuario/ImagemUsuario";
import { CardPostagem } from "../../Components/CardPostagem/CardPostagem";

export const DetalheUsuario = () => {
    const { usu_id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [usuario, setUsuario] = useState<IUsuario | null>(null);
    const [listaPostagem, setListaPostagem] = useState<IPostagem[]>([]);
     
    
    useEffect(() => {
        axios
            .get<{ response: IUsuario[] }>(
                `http://localhost:8000/usuarios/${usu_id}/`
            )
            .then(({ data }) => {
                setUsuario(data.response[0]);
            })
            .catch((error) => {
                console.error("Erro ao obter detalhes do usuario:", error);
                if (error.response) {
                    console.log("Resposta do servidor:", error.response.data);
                    console.log("Status do servidor:", error.response.status);
                }
            });
    }, []);
    useEffect(() => {

        axios
            .get<{ response: IPostagem[] }>(`http://localhost:8000/postagens/detalhe/${usu_id}`)
            .then(({ data }) => {
                setListaPostagem(data.response);
              
            })
            .catch((error) => {
                console.error('Erro ao obter postagens:', error);
            });
    }, []);

    const formatDate = (isoDate:string | undefined) => {
        if (!isoDate) return 'Data desconhecida';
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return (
        <Container maxWidth={"lg"}>
            <Box
                margin={6}
                maxWidth={3000}
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
                            src={`http://localhost:8000/${usuario?.usu_foto}`}
                            sx={{ borderRadius: "10px", maxHeight: '300px' }}
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
                    
                          <Typography sx={{ fontStyle: 'italic' }}>
                            {usuario?.usu_bio}
                        </Typography>  
                
                   
                       
                         
                        </Box> 
                        

                    </Grid>
                    <Grid item xs={12}>
                        <Typography >
                            UsuÃ¡rio desde {formatDate(usuario?.usu_datacriado)}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box marginTop={4}>
                <Typography variant="h5" gutterBottom>
                    Postagens de {usuario?.usu_nome}
                </Typography>
                <Grid container spacing={5}>
                    {listaPostagem.map((postagem, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <CardPostagem postagem={postagem} />
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </Container>
    );
};
        