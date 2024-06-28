import { Box, Button, CircularProgress, Container, Paper, TextField, Typography, Grid } from '@mui/material';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { API, Backend } from '../../axios/axios';
import logo from "../../assets/logo2.png"; // Importa a logo

export const CadastroUsuario = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const createUserFormSchema = z.object({
        name: z.string().nonempty('Campo obrigatório'),
        email: z.string().nonempty('Campo obrigatório').email('Formato de email inválido'),
        idade: z.string().nonempty('Campo obrigatório'),
        password: z.string().nonempty('Campo obrigatório').min(8, 'A senha precisa de no mínimo 8 caracteres'),
        confirmPassword: z.string().nonempty('Campo obrigatório')
    }).refine((fields) => fields.password === fields.confirmPassword, {
        path: ['confirmPassword'],
        message: 'As senhas precisam ser iguais'
    });

    type createUserFormData = z.infer<typeof createUserFormSchema>;

    const { register, handleSubmit, formState: { errors } } = useForm<createUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    });

    const createUser = (data: createUserFormData) => {
        setIsLoading(true);

        API.post(Backend + '/usuarios/cadastro', {
            nome: data.name,
            email: data.email,
            idade: data.idade,
            senha: data.password,
        }).then((response) => {
            setIsLoading(false);
            toast.success('Usuário cadastrado');
            navigate('/login');
        }).catch((error) => {
            setIsLoading(false);
            if (error.response.status === 409) {
                toast.error('Usuário já cadastrado');
            } else {
                toast.error('Falha ao cadastrar');
            }
        });
    };

    return (
        <Container maxWidth={'lg'}>
            <Box
                margin={6}
                maxWidth={1000}
                height={800}
                maxHeight={1000}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRadius={'15px'}
                component={Paper}
                boxShadow={2}
            >
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={5}>
                        <Box display="flex" justifyContent="center">
                            <img src={logo} alt="Logo" style={{ width: '100%', maxWidth: '200px' }} /> {/* Adiciona a logo */}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            gap={3}
                            width="80%"
                            component='form'
                            onSubmit={handleSubmit(createUser)}
                        >
                            <Typography variant="h4" align="center" color={'black'}>
                                Cadastro
                            </Typography>

                            <TextField
                                label="Nome"
                                {...register('name')}
                                color='pedro'
                                helperText={errors.name?.message}
                                disabled={isLoading}
                                variant='outlined'
                                error={!!errors.name?.message}
                            />

                            <TextField
                                label="Email"
                                type='email'
                                {...register('email')}
                                disabled={isLoading}
                                color='pedro'
                                helperText={errors.email?.message}
                                error={!!errors.email?.message}
                            />

                            <TextField
                                label="Data de Nascimento"
                                type="date"
                                {...register('idade')}
                                disabled={isLoading}
                                color='pedro'
                                helperText={errors.idade?.message}
                                error={!!errors.idade?.message}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <TextField
                                label="Senha"
                                type='password'
                                color='pedro'
                                {...register('password')}
                                helperText={errors.password?.message}
                                error={!!errors.password?.message}
                                disabled={isLoading}
                            />

                            <TextField
                                label="Confirmação de senha"
                                type='password'
                                color='pedro'
                                {...register('confirmPassword')}
                                helperText={errors.confirmPassword?.message}
                                error={!!errors.confirmPassword?.message}
                                disabled={isLoading}
                            />

                            <Box width={'100%'} display={'flex'} justifyContent={'center'} marginTop={2}>
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size='large'
                                        type='submit'
                                        endIcon={
                                            isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined
                                        }
                                    >
                                        Cadastrar
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};
