
export interface ICategorias {
    cat_id: number;
    cat_nome: string;
}


export interface IPostagem {
    pos_id: number;
    pos_nome: string;
    pos_descricao: string;
    pos_ativo: boolean;
    pos_tags: string;
    pos_qtdgostei: number;
    pos_data: Date;
    usu_id: number;
    cat_id: number;
    pos_download: boolean;
    pos_capa: string;
}

export interface IArquivo {
    arq_id: number;
    arq_nome: string;
    arq_extensao: string;
    arq_caminho: string;
    pos_id: number;
}

export interface ISeguir {
    seg_id: number;
    seg_seguidor: number; 
    seg_seguindo: number;
    seg_valor: number;

}

export interface IUsuario {
    usu_id: number;
    usu_nome: string;
    usu_email: string;
    usu_senha: string;
    usu_totalPublicacao: string;
    usu_totalFavorito: string;
    usu_status: string;
    usu_idade: string;
    usu_admin: string;
    usu_totalseguidores: number;
    usu_datacriado: string;
    usu_foto: string;
    usu_bio: string;
}

export interface IComentarios {
    com_comentarios: number;
    com_texto: string;
    usu_id: number;
    pos_id: number;
    com_data: Date;
}

interface TokenPayload {
    usu_id: string;
    usu_nome: string;
    usu_email: string;
    usu_foto: string;
}

