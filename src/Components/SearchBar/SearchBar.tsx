import { MdOutlineSearch, MdOutlineCancel, MdSearch } from "react-icons/md";
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const Searchbar = () => {
    const [value, setValue] = useState("");

    const navigate = useNavigate();

    const PesquisarFormSchema = z.object({
        query: z.string().nonempty("Campo obrigatório"),
    });

    type ComentarFormData = z.infer<typeof PesquisarFormSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ComentarFormData>({
        resolver: zodResolver(PesquisarFormSchema),
    });

    const PesquisarPostagem = (data: ComentarFormData) => {
        navigate(`/query/${data.query}`);
        reset(); // Limpa o campo de pesquisa após o envio
        setValue(""); // Reseta o valor do estado
        window.location.reload(); // Recarrega a página após a pesquisa
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit(PesquisarPostagem)(); // Submete o formulário ao pressionar Enter
        }
    };

    const handleSearch = (query: string) => {
        navigate(`/query/${query}`);
        setValue(""); // Reseta o valor do estado
        window.location.reload(); // Recarrega a página após a pesquisa
    };

    return (
        <Box component="form" onSubmit={handleSubmit(PesquisarPostagem)}>
            <Box display={"flex"} flexDirection={"row"} gap={2}>
                <TextField
                    placeholder="Pesquisar"
                    type="text"
                    variant="outlined"
                    sx={{
                        width: '400px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: 'white',
                            opacity: 1, // Para garantir que a cor seja aplicada
                        },
                    }}
                    {...register("query")}
                    color='warning'
                    size="small"
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    value={value}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MdOutlineSearch />
                            </InputAdornment>
                        ),
                        endAdornment: value && (
                            <IconButton
                                style={{ color: 'red' }}
                                aria-label="clear search"
                                onClick={() => {
                                    setValue("");
                                    navigate('/');
                                    window.location.reload(); // Recarrega a página após limpar a pesquisa
                                }}
                            >
                                <MdOutlineCancel />
                            </IconButton>
                        ),
                    }}
                />
                <Button color="secondary" variant="contained" size="small" type="submit">
                    <MdSearch color="white" size={30} />
                </Button>
            </Box>
        </Box>
    );
};
