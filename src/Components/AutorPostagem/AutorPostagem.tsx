import { useEffect, useState } from "react";
import { IPostagem, IUsuario } from "../../Interface";
import axios from "axios";
import { Avatar, Box, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { API, Backend } from "../../axios/axios";

type AutorPostagemProps = {
    postagem: IPostagem;
}


export const AutorPostagem = ({ postagem }: AutorPostagemProps) => {

    const [usuario, setUsuario] = useState<IUsuario | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        API
            .get<{ response: IUsuario[] }>(Backend+`/usuarios/${postagem.usu_id}/`)
            .then(({ data }) => {
                setUsuario(data.response[0]); 
               // onClick={() => navigate(`/usuario/${postagem.usu_id}`)}
            })
            .catch((error) => {
                console.error('Erro ao obter detalhes da postagem:', error);
                if (error.response) {
                    console.log('Resposta do servidor:', error.response.data);
                    console.log('Status do servidor:', error.response.status);
                }
            });

    }, []);
    const handleUserClick = () => {
        if (usuario) {
            navigate(`/usuario/${usuario.usu_id}`);
        }
    };

    return (
        <>
            <Avatar
                alt="foto do autor"
                src={Backend+`/${usuario?.usu_foto}`}
                onClick={handleUserClick}
                style={{ cursor: 'pointer' }} // Adiciona um cursor de ponteiro para indicar que é clicável
          
            />
            <Typography variant="body1" onClick={handleUserClick} style={{ cursor: 'pointer' }}>
                {usuario?.usu_nome}
            </Typography>

        </>
    )

}