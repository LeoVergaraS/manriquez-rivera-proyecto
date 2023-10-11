import Form from 'react-bootstrap/Form';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { BiSearchAlt } from 'react-icons/bi';
import { FaPlayCircle, FaRegPlayCircle } from 'react-icons/fa';
import { FaCirclePause } from 'react-icons/fa6';
import { PiClockCountdownFill, PiCornersOutLight } from 'react-icons/pi';
import './home.scss'
import '../components/Table/table.scss'
import { useState, useEffect } from 'react';
import Cronometro from '../components/Cronometro/Cronometro';
import axios from 'axios';

function Home() {

    const [sesiones, setSesiones] = useState([]);
    const [clientes,setClientes] = useState([]);


    const [sesion, setSesion] = useState({
        id: null,
        fecha: null,
        tiempo: null,
        materia: {
            id: null,
            nombre: "Seleccione un cliente"
        },
        cliente: {
            id: null,
            nombre: "Seleccione un cliente"
        }
    })

    const [idClienteSeleccionado, setIdClienteSeleccionado] = useState(0)
    const [sesionSeleccionada, setSesionSeleccionada] = useState({
        id: null,
        fecha: null,
        tiempo: null,
        abogado: "-",
        id_materia: {
            id: null,
            nombre: "-"
        },
        id_cliente: {
            id: null,
            nombre: "-"
        },
        id_submateria:{
            id: null,
            nombre: "-"
        }
    })
    const [clienteSeleccionado, setClienteSeleccionado]= useState({
        id: null,
        nombre: "seleccione un cliente",
       borrado:null
    })

    const handleSelect = (e) => {
        setIdClienteSeleccionado(e.target.value);
        console.log(e.target.value);
        let idCliente= parseInt(e.target.value);
        let foundCliente= clientes.find(cliente=>cliente.id === idCliente);
        console.log(foundCliente);
        setClienteSeleccionado(foundCliente);
        let foundSesion= sesiones.find(sesion=>sesion.id_cliente.id === idCliente)
        setSesionSeleccionada(foundSesion);
        
    }
    
    const Play = () => {
        console.log("Comienza el caso");
    }

    const Pause = () => {
        console.log("Pausa el caso")
    }


    const getSesiones = async () => {
        try {
            let url = 'http://localhost:8090/sesiones';
            const response = await axios.get(url);
            if (response.status === 200) {
                setSesiones(response.data);
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

    useEffect(() => {
        getSesiones();
        getClientes();
    }, [])

    //console.log("sesiones", sesiones);

    return (
        <Container fluid style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" }}>
            <Row style={{ margin: "75px", alignItems: "center", width: "50%" }}>
                <Col xs="auto">
                    <BiSearchAlt style={{ color: "white", fontSize: "50px" }} />
                </Col>
                <Col>
                    <Form.Select aria-label="Default select example" style={{ fontSize: "22px" }} value={idClienteSeleccionado} onChange={handleSelect}>
                        <option value={0} disabled selected>¿Qué cliente desea buscar?</option>
                        {clientes.map((cliente) => ( 
                                <option key={cliente.id} value={cliente.id}>
                                {cliente.nombre}
                              </option>
                         ))}
                    </Form.Select>
                </Col>
            </Row>
            <Row >
                <Col style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div className='container2'>
                        <Card style={{ background: "#3B575A", borderRadius:"25px" }}>
                            <Card.Body>
                                <table>
                                    <thead>
                                        <tr style={{ background: "#3B575A" }}>
                                            <th>Cliente</th>
                                            <th>Materia</th>
                                            <th>Sub Materia</th>
                                            <th>Abogado</th>
                                            <th></th>
                                        </tr>
                                        <tr className="special-row"></tr>
                                    </thead>
                                    <tbody style={{ color: "white" }}>
                                            <tr key={sesionSeleccionada.id} style={{ background: "#3B575A" }}>
                                                <td>{sesionSeleccionada.id_cliente.nombre}</td>
                                                <td>{sesionSeleccionada.id_materia.nombre}</td>
                                                <td>{sesionSeleccionada.id_submateria.nombre}</td>
                                                <td>{sesionSeleccionada.abogado}</td>
                                            </tr> 
                                    </tbody>
                                </table>
                            </Card.Body>
                        </Card>
                        <Card 
                            style={{ background: "#3B575A", 
                                     height: "200px", 
                                     width: "300px", 
                                       marginLeft: "30px", 
                                        borderRadius:"25px"}}
                            >
                            <Card.Body style={{display:"flex",justifyContent:"center", alignItems:"center"}}>
                                <Cronometro/>
                                
                                {/*<div >
                                    <PiClockCountdownFill style={{ color: "#DFBF68", fontSize: "75px", cursor:"pointer" }} />
                                    </div>*/}
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>

        </Container >
    );
}

export default Home;