import { Avatar, Box, Typography } from "@mui/material"
import { IComentarios, IUsuario } from "../../Interface";
import { useEffect, useState } from "react";
import axios from "axios";
import { API, Backend } from "../../axios/axios";

type AutorComentarioProps = {
    comentario: IComentarios;
}

export const AutorComentario = ({ comentario }: AutorComentarioProps) => {

    const [usuario, setUsuario] = useState<IUsuario | null>(null);


    useEffect(() => {
       API
            .get<{ response: IUsuario[] }>(Backend+`/usuarios/${comentario.usu_id}/`)
            .then(({ data }) => {
                setUsuario(data.response[0]);
            })
            .catch((error) => {
                console.error('Erro ao obter detalhes da postagem:', error);
                if (error.response) {
                    console.log('Resposta do servidor:', error.response.data);
                    console.log('Status do servidor:', error.response.status);
                }
            });

    }, []);
    return (
        <>
            <Avatar
                alt="foto do autor o comentario"
                src={Backend+`/${usuario?.usu_foto}`}
            />
            <Box display={'flex'} flexDirection={'column'}>
                <Typography variant="body2">
                    {usuario?.usu_nome}
                </Typography>
                <Typography variant="body1">
                    {comentario.com_texto}
                </Typography>
            </Box>
        </>
    )
}