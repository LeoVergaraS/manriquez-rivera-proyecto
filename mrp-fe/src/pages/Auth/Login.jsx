import "./login.scss";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Swal from "sweetalert2";

const Login = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [tipo, setTipo] = useState("password");
  const [message, setMessage] = useState("");

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });


  const handleInputChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleSee = () => {
    if (seePassword) {
      setSeePassword(false);
      setTipo("password");
    } else {
      setSeePassword(true);
      setTipo("text");
    }
  };

  const handleLogin = async () => {
    try {
      const body = {
        username: login.username.trim(),
        password: login.password,
      };
      let url = "http://localhost:8090/auth/login";
      const response = await axios.post(url, body);
      if (response.status === 200) {
        const expirationTime = new Date(
          new Date().getTime() + 1000 * 60 * 60 * 12
        );
        Cookies.set("token", response.data.token, { expires: expirationTime });
        Swal.fire({
          icon: 'success',
          title: 'Sesión iniciada con éxito',
          text: 'Bien venido!',
          showConfirmButton: false,  // No mostrar el botón de confirmación (OK)
          timer: 1500,  // Muestra la alerta durante 3 segundos
          timerProgressBar: true,  // Muestra una barra de progreso durante el tiempo de espera
        }).then((result) => {
         
          window.location.href = "/";
          
        });
        
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text: "Ingrese un usuario o contraseña válida",
        showConfirmButton: false,  // No mostrar el botón de confirmación (OK)
        timer: 1500,  // Muestra la alerta durante 3 segundos
      });
      console.log(err);

    }
  };

  return (
    <main className="bodyLogin">
      <div className="wrapper">
        <Form onSubmit={handleSubmit} className="form-login">
          <h2 className="form-login__title">App Manriquez Rivera</h2>
          <br></br>
          <Form.Group className="mb-3" controlId="formUsuario">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={handleInputChange}
              placeholder="Ingrese su usuario"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type={tipo}
              name="password"
              onChange={handleInputChange}
              placeholder="Ingrese su contraseña"
              required
            />
            <div className="mostrar-contrasenia mt-1" style={{display: "flex", justifyContent: "left", alignItems: "center", gap: "5px"}}>
            {seePassword ?
              (<VscEyeClosed
                onClick={handleSee}
                onMouseEnter={() => setMessage("Ocultar contrasena")}
                onMouseLeave={() => setMessage("")}
                style={{ fontSize: "25px", cursor: "pointer" }} />) :
              (<VscEye
                onClick={handleSee}
                onMouseEnter={() => setMessage("Mostrar contrasena")}
                onMouseLeave={() => setMessage("")}
                style={{ fontSize: "25px", cursor: "pointer" }} />)
            }
            {message}
          </div>
          </Form.Group>
          <button className="form-login__button-submit">Iniciar sesión</button>
        </Form>
        <div></div>
        <div className="banner">
          <h1 className="wel_text">Bienvenido!</h1>
        </div>
      </div>
    </main>
  );
};

export default Login;
