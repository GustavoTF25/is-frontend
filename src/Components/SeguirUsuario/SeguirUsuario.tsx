import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API, Backend } from "../../axios/axios";
import { ISeguir } from "../../Interface";

type SeguirButtonProps = {
  usu_id: number; // ID do usuário a ser seguido
  isFollowing: number; // Estado inicial de seguir como número
  onToggleFollow: (newStatus: number) => void; // Callback para notificar o estado de seguir
};

export const SeguirUsuario = ({ usu_id, isFollowing, onToggleFollow }: SeguirButtonProps) => {
  const token = localStorage.getItem("token");
  const [seguindo, setSeguindo] = useState(isFollowing);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSeguindo(isFollowing); // Atualizar o estado local ao receber novos props
  }, [isFollowing]);

  const handleSeguirToggle = () => {
    if (!token) {
      toast.error("Você precisa estar logado para seguir um usuário");
      return;
    }

    setLoading(true);
    const url = Backend + `/usuarios/seguir/${usu_id}/`;
    const method = seguindo ? "POST" : "POST"; // POST para seguir, DELETE para deixar de seguir

    API({
      method,
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const newStatus = seguindo ? 0 : 1 ; // Alterna o estado de seguir
        // const Seguindo: boolean = newStatus ; // Atualiza o estado de seguir
        // const Seguir = +Seguindo;
        setSeguindo(newStatus);
        onToggleFollow(newStatus); // Notifica o componente pai sobre a mudança de estado
        toast.success(seguindo ? "Você deixou de seguir o usuário" : "Você começou a seguir o usuário");
      })
      .catch((error) => {
        console.error("Erro ao tentar seguir/parar de seguir o usuário:", error);
        toast.error("Erro ao tentar seguir/parar de seguir o usuário");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Button
      variant="contained"
      color={seguindo ? "secondary" : "primary"}
      onClick={handleSeguirToggle}
      disabled={loading} // Desabilita o botão enquanto carrega
    >
      {seguindo ? "Deixar de Seguir" : "Seguir"}
    </Button>
  );
};
