import { Container, Nav, Navbar } from 'react-bootstrap';
import './Navbar.css'

function NavbarResponsive() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto justify-content-center gap-3" >
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="/consulta">Tiempo de caso</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarResponsive;
