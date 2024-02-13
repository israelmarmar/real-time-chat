import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FaSignInAlt, FaSpinner } from "react-icons/fa";
import './login.css'

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const register = async () => {
        console.log('register')
        if (password !== confirmPassword) return alert("senhas diferentes");
        setLoading(true);

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}users`,
                { username, email, password }
            );
            setLoading(false);
            alert("cadastrado");
            router.push("login");
        } catch (e) {
            alert("Erro");
        }
    };

    return (
        <main className='main-login'>
            <div className="login-container">
                <h1>Cadastro</h1>
                <label>Usuário</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Senha</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Confirmar Senha</label>
                <input
                    type="password"
                    id="confirmpassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br />
                <br />
                <button
                    disabled={loading}
                    className="login-button"
                    onClick={register}
                >
                    {loading ? <FaSpinner className="loading-icon" /> : <></>}
                    Cadastrar
                </button>
            </div>
        </main>
    );
};

export default Register;
