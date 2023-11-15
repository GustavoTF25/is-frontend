import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Layout from '../Components/Layout';
import { LoginUsuario } from '../Pages/Login/LoginUsuario';
import Pagina404 from '../Pages/Pagina404/Pagina404';
import { CriarPostagem } from '../Pages/CriarPostagem/CriarPostagem';
import { CadastroUsuario } from '../Pages/CadastroUsuario/CadastroUsuario';
import { RecuperarSenha } from '../Pages/RecuperarSenha/RecuperarSenha';


export default function AppRouter() {




    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<></>} />

                    <Route path='/criarPostagem' element={<CriarPostagem />} />

                    {/* Rotas do Gerais */}
                    <Route path="cadastroUsuario" element={<CadastroUsuario />} />
                    <Route path="login" element={<LoginUsuario />} />
                    <Route path="recuperarSenha" element={<RecuperarSenha />} />
                    <Route path="*" element={<Pagina404 />} />

                </Route>
            </Routes>
        </Router>





    );



}