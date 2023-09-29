import { Container, Nav, Navbar } from 'react-bootstrap';
import './navbar.scss'

function NavbarResponsive() {
    return (
        <Navbar expand="lg" className="navbar bg-body-tertiary">
            <Container className='navbar__container'>
                <Navbar.Toggle className="navbar__toggle" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="navbar__collapse" id="basic-navbar-nav">
                    <Nav className="navbar__nav m-auto justify-content-center gap-3" >
                        <Nav.Link className="navbar__nav-link" href="/">Inicio</Nav.Link>
                        <Nav.Link className="navbar__nav-link" href="/consulta">Tiempo de caso</Nav.Link>
                        <Nav.Link className="navbar__nav-link" href="/materia">Por Materia</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarResponsive;
