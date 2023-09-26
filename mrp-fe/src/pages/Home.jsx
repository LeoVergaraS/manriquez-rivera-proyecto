import Form from 'react-bootstrap/Form';
import { Container, Col, Row } from 'react-bootstrap';
import { BiSearchAlt } from 'react-icons/bi';
import './home.scss'

function Home() {
    return (
        <Container>
            <Row style={{ margin: "75px", alignItems:"center" }}>
                <Col xs="auto">
                    <BiSearchAlt style={{ color: "white", fontSize: "35px" }} />
                </Col>
                <Col>
                    <Form.Select aria-label="Default select example">
                        <option>¿Qué cliente desea buscar?</option>
                        <option value="1">Juan Iturbe</option>
                        <option value="2">Eduardo Abarca</option>
                        <option value="3">Miki Carcamo</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row>
                <Col>

                </Col>
            </Row>

        </Container>
    );
}

export default Home;