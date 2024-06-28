import { Button, Drawer, Typography, IconButton, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiMenuFill } from "react-icons/ri";

export const MenuDrawer = () => {
  const labelCategorias = [
    {
      label: "Jogos",
      to: "/jogos",
    },
    {
      label: "Quadrinhos",
      to: "/quadrinhos",
    },
    {
      label: "Ilustrações",
      to: "/ilustracao",
    },
    {
      label: "Animações",
      to: "/animacao",
    },
    {
      label: "Musica/Audio",
      to: "/musica",
    },
    {
      label: "WebFiction",
      to: "/webfiction",
    },
    {
      label: "Software",
      to: "/software",
    },
  ];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <Button
        
        size="large"
        variant="contained"
        style={{color: 'white'}}
       
        onClick={() => setIsDrawerOpen(true)}
      >
        <RiMenuFill size={30} />
      </Button>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          style={{backgroundColor: '#F4F4F4'}} // altera a cor do menu drawer
          p={2}
          width={"250px"}
          gap={2}
          textAlign={"center"}
        >
          <Typography variant="h6" component="div" color={"black"}>
            Categorias
          </Typography>
          <Divider />
          {labelCategorias.map((categorias, index) => (
            <Box
              display={"flex"}
              key={index}
              padding={2}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Button
                variant="text"
                color="pedro"
                style={{ textTransform: "none" }}
                size="large"
                onClick={() => navigate(categorias.to)}
              >
                {categorias.label}
              </Button>
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
};
