import Form from 'react-bootstrap/Form';
import { Container, Col, Row } from 'react-bootstrap';
import { BiSearchAlt } from 'react-icons/bi';
import "./materia.scss";
const Materia = () => {
    return (
        <Container>
            <Row style={{ margin: "75px", alignItems: "center", justifyContent: "center" }}>
                <Col xs={2}>
                    <Form.Select aria-label="Default select example">
                        <option>Materia</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='container2'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Materia</th>
                                    <th>Tiempo</th>
                                </tr>
                                <tr className="special-row"></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Laboral</td>
                                    <td>5 Hrs.</td>
                                </tr>
                                <tr>
                                    <td>Familia</td>
                                    <td>10 Hrs.</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default Materia