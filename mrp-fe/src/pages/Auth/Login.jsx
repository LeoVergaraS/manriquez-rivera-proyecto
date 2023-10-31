import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";

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
            console.log("body:",body);
            const response = await axios.post(url, body);
            if (response.status === 200) {
                const expirationTime = new Date(new Date().getTime() + 1000 * 60 * 60 * 12);
                Cookies.set("token", response.data.token, { expires: expirationTime });
                window.location.href = "/";
                console.log("respondesata:",response.data);
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="d-flex"
            style={{
                height: "calc(100vh - 76px)",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <div style={{
                width: "auto",
                height: "390px",
                backgroundColor: "rgb(217, 217, 217)",
                padding: "50px",
                borderRadius: 10,
                boxShadow: "0px 0px 6px 3px rgba(0,0,0,0.5)"
            }}>
                <h1>Iniciar Sesión</h1>
                <Form onSubmit={handleSubmit}>
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
                        <Form.Control type={tipo}
                            name="password"
                            onChange={handleInputChange}
                            placeholder="Ingrese su contraseña"
                            required />
                        <Form.Text className="text-muted"
                            style={{ cursor: "pointer" }}
                            onClick={handleSee}>Mostrar contraseña</Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
                        Ingresar
                    </Button>
                </Form>
            </div>
        </div>
    );

}

export default Login;