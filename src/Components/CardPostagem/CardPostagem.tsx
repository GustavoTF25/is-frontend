import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import logo from '../../assets/logo2.png'
import { IPostagem } from "../../Interface";
import { useNavigate } from "react-router-dom";
//import logo2 from '../../../../IndieAPI/postagens/30/32.png';


type CardPostagemProps = {
    postagem: IPostagem;
}

export const CardPostagem = ({ postagem }: CardPostagemProps) => {

    console.log(postagem)
    const navigate = useNavigate();

    return (
        <Box width={'345px'} padding={'10px'}>
            <Card>
                <CardMedia
                    component='img'
                    height='140'
                    image={postagem.pos_capa ? `http://localhost:8000/${postagem.pos_capa}` : logo}
                    sx={{ borderRadius: '5px' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component='div'>
                        {postagem.pos_nome}
                    </Typography>
                    <Typography variant="body2" color={'text.secondary'}>
                        {postagem.pos_descricao}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small' color="pedro"> Share</Button>
                    <Button size='small' color='pedro'
                        onClick={() => navigate(`/postagem/${postagem.pos_id}`)}
                    > Ler Mais</Button>
                </CardActions>
            </Card>
        </Box>
    )
}