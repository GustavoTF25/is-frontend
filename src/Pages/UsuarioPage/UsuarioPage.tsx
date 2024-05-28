import { useNavigate, useParams } from "react-router-dom";
import { IPostagem,IUsuario } from "../../Interface";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Paper, Grid, CardMedia, Typography, Button, TextField } from "@mui/material";
import { ImagemUsuario } from "../../Components/ImagemUsuario/ImagemUsuario";
import { CardPostagem } from "../../Components/CardPostagem/CardPostagem";





export const UsuarioPage = () => {
    const { usu_id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [usuario, setUsuario] = useState<IUsuario | null>(null);
    const [listaPostagem, setListaPostagem] = useState<IPostagem[]>([]);
    const [biografia, setBiografia] = useState("");
    const [editandoBiografia, setEditandoBiografia] = useState(false);
    

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
               // console.log("chamou o id do usuario")
            })
            .catch((error) => {
                console.error('Erro ao obter postagens:', error);
            });
    }, []);
   
    useEffect(() => {
        axios
            .get<{ response: IUsuario[] }>(`http://localhost:8000/usuarios/${usu_id}/`)
            .then(({ data }) => {
                setUsuario(data.response[0]);
                setBiografia(data.response[0].usu_bio || ""); // Inicializa a biografia
            })
            .catch((error) => {
                console.error("Erro ao obter detalhes do usuário:", error);
                if (error.response) {
                    console.log("Resposta do servidor:", error.response.data);
                    console.log("Status do servidor:", error.response.status);
                }
            });
    }, []);
    const handleBiografiaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBiografia(event.target.value);
    };
    const handleBiografiaSave = () => {
        axios
            .patch(`http://localhost:8000/usuarios/biografia/`, { biografia, usu_id })
            .then(({ data }) => {
                setEditandoBiografia(false); 
                
            })
           
            .catch((error) => {
                console.error('Erro ao atualizar a biografia:', error);
            });
    };
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
                maxWidth={'100%'}
                width={'95%'}
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
                            flexDirection={"column"}
                        >
                            <Typography variant="h4">{usuario?.usu_nome}</Typography>
                            {editandoBiografia ? (
                                <Box display="flex" flexDirection="column" alignItems="center" marginTop={2}>
                                    <TextField
                                        label="Biografia"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        value={biografia}
                                        onChange={handleBiografiaChange}
                                        fullWidth
                                    />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleBiografiaSave}
                                        sx={{ marginTop: 2 }}
                                    >
                                        Salvar
                                    </Button>
                                </Box>
                            ) : (
                                <Box display="flex" flexDirection="column" alignItems="center" marginTop={2}>
                                    <Typography variant="body1">{biografia}</Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setEditandoBiografia(true)}
                                        sx={{ marginTop: 2 }}
                                    >
                                        Editar Biografia
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box width={'300px'} >
                            <ImagemUsuario />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems="center">
                            <Typography>
                                Usuário desde {formatDate(usuario?.usu_datacriado)}
                            </Typography> 
                            <Button
                                variant="contained"
                                color="secondary"
                                size='large'
                                onClick={() => navigate(`/editarSenha/${usu_id}`)}
                            >
                            Alterar Senha
                            </Button>
                        </Box>
                    </Grid>

                    
                </Grid>
            </Box>
            <Box marginTop={4} marginLeft={5} >
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
