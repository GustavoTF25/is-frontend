import { useEffect, useState } from "react";
import { IArquivo, IPostagem } from "../../Interface";
import axios from "axios";
import { Box } from "@mui/material";
import { API, Backend } from "../../axios/axios";



type MediaPostageProps = {
    postagem: IPostagem;
}

export const MediaPostagem = ({ postagem }: MediaPostageProps) => {
    const [arquivo, setArquivo] = useState<IArquivo | null>(null);

    useEffect(() => {

        API
            .get<{ response: IArquivo[] }>(Backend+`/postagens/arquivos/${postagem.pos_id}/`)
            .then(({ data }) => {
                setArquivo(data.response[0]);
            })
            .catch((error) => {
                console.error('Erro ao obter postagens:', error);
            });
    }, []);

    const renderizarTag = (arquivo: IArquivo | null) => {
        if (!arquivo || !arquivo.arq_caminho) {
            return <p>Arquivo inválido</p>;
        }
        const extensao = arquivo.arq_caminho.split('.').pop()?.toLocaleString();

        if (extensao === 'jpg' || extensao === 'jpeg' || extensao === 'png' || extensao === 'webp') {
            return <img src={Backend+`/${arquivo.arq_caminho}`} alt="Imagem" />;
        } else if (extensao === 'mp4' || extensao === 'webm' || extensao === 'ogg' || extensao === 'mkv') {
            return <video controls src={Backend+`/${arquivo.arq_caminho}`} />;
        } else if (extensao === 'mp3' || extensao === 'ogg' || extensao === 'wav' || extensao === 'm4a' || extensao === 'mkv') {
            return <audio controls src={Backend+`/${arquivo.arq_caminho}`} />;
        } else {
            return <p>Formato de arquivo não suportado para reprodução no navegador</p>;
        }
    };


    return (
        <div>
            {arquivo && (
                <Box>
                    {renderizarTag(arquivo)}
                    {/* <p>{arquivo.}</p> */}
                </Box>
            )}
        </div>
    );
};

