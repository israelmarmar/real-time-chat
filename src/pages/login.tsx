import React, { useState } from 'react';
import './login.css'
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        // Evite que a requisição seja enviada novamente enquanto estiver em andamento
        if (loading) return;

        try {
            setLoading(true); // Habilita o botão de carregamento

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
                email,
                password,
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                router.push('/');
            } else {
                setLoading(false);
                toast.error('Credenciais inválidas. Tente novamente.');
            }
        } catch (error) {
            console.log(error)
            toast.error('Credenciais inválidas. Tente novamente.');
        } finally {
            setLoading(false); // Desabilita o botão de carregamento
        }
    };

    return (
        <div>
            <main className='main-login'>
                <div className="login-container">
                    <h1>Login</h1>
                    <div>
                        <label>Usuário:</label>
                        <input type="text" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Senha:</label>
                        <input type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button onClick={handleLogin}>Entrar</button>
                    <br />
                    <Link href='register' className='register-button' >Cadastre-se</Link>
                </div>
            </main>
            <ToastContainer />
        </div>
    );
};

export default Login;
