import Form from 'react-bootstrap/Form';
import { Container, Col, Row } from 'react-bootstrap';
import { BiSearchAlt } from 'react-icons/bi';
import "./consulta.scss";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Consulta = () => {

    const [consultasCliente, setConsultasCliente] = useState([]);
    const [consultasMateria, setConsultasMateria] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [materias, setMaterias] = useState([]);

    const getConsultasCliente = async (id) => {
        try {
            let url = 'http://localhost:8090/consultas/cliente' + id;
            const response = await axios.get(url);
            if (response.status === 200) {
                setConsultasCliente(response.data);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const getConsultasMateria = async () => {
        try {
            let url = 'http://localhost:8090/consultas/materia';
            const response = await axios.get(url);
            if (response.status === 200) {
                setConsultasMateria(response.data);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const getClientes = async () => {
        try {
            let url = 'http://localhost:8090/clientes';
            const response = await axios.get(url);
            if (response.status === 200) {
                setClientes(response.data);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const getMaterias = async () => {
        try {
            let url = 'http://localhost:8090/materias';
            const response = await axios.get(url);
            if (response.status === 200) {
                setMaterias(response.data);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getClientes();
        getMaterias();
    }, [])

    return (
        <Container>
            <Row style={{ margin: "75px", alignItems: "center", justifyContent: "center" }}>
                <Col xs={2}>
                    <Form.Select aria-label="Default select example">
                        <option>Selecciona un cliente</option>
                        {clientes.map((cliente) => (
                            <option>{cliente.nombre}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col xs={2}>
                    <Form.Select aria-label="Default select example">
                        <option>Selecciona una materia</option>
                        {materias.map((materia) => (
                            <option>{materia.nombre}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='container2'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Dia</th>
                                    <th>Tiempo</th>
                                </tr>
                                <tr className="special-row"></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>24/07/2023</td>
                                    <td>151 min</td>
                                </tr>
                            </tbody>
                            <tr className="special-row" style={{ borderBottom: "3px solid #DFBF68" }}></tr>
                            <tr className="special-row"></tr>
                            <tbody id="tbody-special">
                                <td id="td-special">Total</td>
                                <td id="td-special">151 min</td>
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default Consulta