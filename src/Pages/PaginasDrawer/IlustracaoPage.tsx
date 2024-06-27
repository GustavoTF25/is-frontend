import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { CardPostagem } from "../../Components/CardPostagem/CardPostagem";
import logo from "../../assets/logo2.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { ICategorias } from "../../Interface";
import { HomeCategoria } from "../../Components/HomeCategorias/HomeCategorias";
import Pagina404 from "../Pagina404/Pagina404";
import { API, Backend } from "../../axios/axios";

export const IlustracaoPage = () => {
  const [categoria, setCategoria] = useState<ICategorias | null>(null);

  useEffect(() => {
    API
      .get<{ response: ICategorias[] }>(
        Backend+`/postagens/listarNome/Ilustração`
      )
      .then(({ data }) => {
        setCategoria(data.response[0]);
      })
      .catch((error) => {
        console.error("Erro ao obter categorias:", error);
      });
  }, []);

  if (categoria === null) {
    return <p>Carregando...</p>; // ou qualquer indicador de carregamento desejado
  }

  return <HomeCategoria categoria={categoria} />;
};
