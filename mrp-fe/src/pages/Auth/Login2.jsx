import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Cookies from 'js-cookie';
import login2 from "./login2.scss";

const Login = () => {

    const [seePassword, setSeePassword] = useState(false);
    const [tipo, setTipo] = useState('password');

    const [login, setLogin] = useState({
        username: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    }

    const handleSee = () => {
        if (seePassword) {
            setSeePassword(false);
            setTipo("password");
        } else {
            setSeePassword(true);
            setTipo("text");
        }
    }

    const handleLogin = async () => {
        try {
            const body = { username: login.username.trim(), password: login.password };
            let url = "http://localhost:8090/auth/login";
            console.log("body:", body);
            const response = await axios.post(url, body);
            if (response.status === 200) {
                const expirationTime = new Date(new Date().getTime() + 1000 * 60 * 60 * 12);
                Cookies.set("token", response.data.token, { expires: expirationTime });
                window.location.href = "/";
                console.log("respondesata:", response.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <body className="bodyLogin">
                <div className="wrapper">
                    <Form onSubmit={handleSubmit} className="formLogin">
                    <h2 className="tittleLogin">App del abogao Manrique</h2>
                    <br></br>
                        <Form.Group className="mb-3" controlId="formUsuario">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="text"
                                name="username"
                                onChange={handleInputChange}
                                placeholder="Ingrese su usuario"
                                required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control 
                                type={tipo}
                                name="password"
                                onChange={handleInputChange}
                                placeholder="Ingrese su contraseña"
                                required />
                            <Form.Text className="text-muted"
                                style={{ cursor: "pointer"}}
                                onClick={handleSee}>Mostrar contraseña</Form.Text>
                        </Form.Group>
                        <button className="submitLogin">Iniciar sesión</button>
                    </Form>
                    <div></div>
                    <div className="banner">
                        <h1 className="wel_text">Vienvenío</h1>
                    </div>
                </div>
            </body>
        </>
    );

}

export default Login;