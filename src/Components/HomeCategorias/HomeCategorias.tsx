import axios from "axios";
import { useEffect, useState } from "react";
import { ICategorias, IPostagem } from "../../Interface";
import { Container, Grid } from "@mui/material";
import { CardPostagem } from "../CardPostagem/CardPostagem";
import { API, Backend } from "../../axios/axios";


type HomeCategoriaProps = {
    categoria: ICategorias;
}

export const HomeCategoria = ({ categoria }: HomeCategoriaProps) => {

    const [listaPostagem, setListaPostagem] = useState<IPostagem[]>([]);


    useEffect(() => {
        API
            .get<{ response: IPostagem[] }>(Backend+`/postagens/listar/${categoria?.cat_id}`)
            .then(({ data }) => {
                setListaPostagem(data.response);
            })
            .catch((error) => {
                console.error('Erro ao obter categorias:', error);
            });
    }, []);



    return (
        <Container maxWidth={'lg'}>

            <Grid container spacing={5} >
                {listaPostagem.map((postagem, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <CardPostagem postagem={postagem} />

                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}