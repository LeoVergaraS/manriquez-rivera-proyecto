import './navbar.scss'
import Cookies from 'js-cookie';
import { Container, Nav, Navbar } from 'react-bootstrap';

const NavbarResponsive = ({ token }) => {

    const logout = () => {
        if (token) {
            Cookies.remove('token')
        }
        window.location.href = '/login'
    };

    return (
        <Navbar expand="lg" className="navbar bg-body-tertiary">
            <Container className='navbar__container'>
                <Navbar.Toggle className="navbar__toggle" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="navbar__collapse" id="basic-navbar-nav">
                    <Nav className="navbar__nav m-auto justify-content-center gap-3" >
                        <Nav.Link className="navbar__nav-link" href="/">Inicio</Nav.Link>
                        <Nav.Link className="navbar__nav-link" href="/consulta">Dashboard</Nav.Link>
                        <Nav.Link className="navbar__nav-link" href="/admin">Admin</Nav.Link>
                    </Nav>
                    <Nav className="navbar__nav justify-content-right" >
                        <Nav.Link className="navbar__nav-link"  onClick={logout}>{token ? "Cerrar sesión" : "Iniciar sesión"}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarResponsive;
