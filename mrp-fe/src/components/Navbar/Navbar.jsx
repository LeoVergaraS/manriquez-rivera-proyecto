import './navbar.scss'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const NavbarResponsive = ({ token }) => {

    const [abogadoLogueado, setAbogadoLogueado] = useState(null);

    const logout = () => {
        if (token) {
            Cookies.remove('token')
            let claveObjeto = "CasoSeleccionado";

            localStorage.removeItem(claveObjeto);
            claveObjeto = "tiempoCronometro";
            localStorage.removeItem(claveObjeto);
        }
        window.location.href = '/login'
    };

    const getUsuarioLogueado = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` }
            };
            let url = "http://localhost:8090/auth/getUserLogueado";
            const response = await axios.get(url, config);
            if (response.status === 200) {
                setAbogadoLogueado(response.data.id_abogado);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getUsuarioLogueado();
    }, []);

    return (
        <Navbar expand="lg" className="navbar bg-body-tertiary">
            <Container className='navbar__container'>
                <Navbar.Toggle className="navbar__toggle" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="navbar__collapse" id="basic-navbar-nav">
                    <Nav className="navbar__nav justify-content-left" >
                        <Nav.Link className="navbar__nav-link">{token && abogadoLogueado ? abogadoLogueado.nombre : ""}</Nav.Link>
                    </Nav>
                    <Nav className="navbar__nav m-auto justify-content-center gap-3" >
                        <Nav.Link className="navbar__nav-link" href="/">Inicio</Nav.Link>
                        <Nav.Link className="navbar__nav-link" href="/consulta">Dashboard</Nav.Link>
                        <Nav.Link className="navbar__nav-link" href="/admin">Admin</Nav.Link>
                    </Nav>
                    <Nav className="navbar__nav justify-content-right" >
                        <Nav.Link className="navbar__nav-link" onClick={logout}>{token ? "Cerrar sesión" : "Iniciar sesión"}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarResponsive;
