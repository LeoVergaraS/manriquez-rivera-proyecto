import "./login.scss";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Swal from "sweetalert2";
import urlweb from "../../utils/config/urlweb";

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
      let url = `http://${urlweb}/auth/login`;
      const response = await axios.post(url, body);
      if (response.status === 200) {
        const expirationTime = new Date(
          new Date().getTime() + 1000 * 60 * 60 * 12
        );
        Cookies.set("token", response.data.token, { expires: expirationTime });
        Swal.fire({
          icon: 'success',
          title: 'Sesión iniciada con éxito',
          text: 'Bienvenido!',
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

  ////////////////////////////////////////////////
  //                  Animacion
  ////////////////////////////////////////////////
  const [animation, setAnimation] = useState(false);
  const [hover, setHover] = useState(false);
  const handleAnimation = (value) => {
    setAnimation(value);
  }

  const handleHover = (value) => {
    setHover(value);
  }


  return (
    <main className="bodyLogin">
      <div className={`formulario ${animation ? "formulario--animation" : ""}`}>
      <Form onSubmit={handleSubmit} className={`form-login ${animation ? "form-login--animation" : ""}`}>
        <h2 className="form-login__title">Iniciar sesión</h2>
        <p className="form-login__text">Ingrese sus credenciales</p>
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
              onMouseEnter={() => setMessage("Ocultar contraseña")}
              onMouseLeave={() => setMessage("")}
              style={{ fontSize: "25px", cursor: "pointer" }} />) :
            (<VscEye
              onClick={handleSee}
              onMouseEnter={() => setMessage("Mostrar contraseña")}
              onMouseLeave={() => setMessage("")}
              style={{ fontSize: "25px", cursor: "pointer" }} />)
          }
          {message}
        </div>
        </Form.Group>
        <button className="form-login__button-submit">Iniciar sesión</button>
      </Form>
      </div>
      <div 
        className={`banner ${animation ? "banner--animation" : ""} `}
        onClick={() => handleAnimation(true)}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <h1 className={`banner__wel-title ${animation ? "banner__wel-title--animation" : ""} ${!animation && hover ? "banner__wel-title--hover" : ""}`}>Bienvenido!</h1>
        <p className={`banner__wel-text ${animation ? "banner__wel-text--animation" : ""} ${!animation && hover ? "banner__wel-text--hover" : ""}`}>A la aplicación CronoCobro</p>
      </div>
    </main>
  );
};

export default Login;
