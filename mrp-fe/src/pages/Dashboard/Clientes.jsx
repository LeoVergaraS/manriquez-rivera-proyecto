import { Card, Row, Col } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";
import Table_01 from "../../components/Table_01/Table_01";
import { useEffect, useState } from "react";
import InputSelect from "../../components/InputSelect/InputSelect";
import axios from 'axios';
import formatDateShow from "../../utils/functions/formatDateShow";

const Clientes = ({ consultasS, fechaInicio, fechaFin,flag }) => {

	const headerClientes = ["Sesiones", "Tiempo"];
	const [casos, setCasos] = useState([]);
	const [caso, setCaso] = useState([]);
	const [sesionesByCaso, setSesionesByCaso] = useState([]);
	
	const getCasos = async () => {
		try {
			let url = "http://localhost:8090/casos";
			const response = await axios.get(url);
			if (response.status === 200) {
				setCasos(response.data);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const getSesionesByIdCaso = async (id) => {
	try {
		let url = "http://localhost:8090/consultas/sesiones/id_caso/" + id + "/"+fechaInicio + "/" + fechaFin + "/" + flag;
		const response = await axios.get(url);
		if (response.status === 200) {
			console.log(response.data);
			setSesionesByCaso(response.data);
		}
	} catch (err) {
		console.log(err.message);
	}
};

useEffect(() => {
	console.log(fechaInicio,fechaFin)
	getCasos();
}, [fechaInicio,fechaFin,flag])

useEffect(() => {
	if(caso.id !== undefined) getSesionesByIdCaso(caso.id);
}, [caso,fechaInicio,fechaFin,flag])

const createCasoOption = (caso) => {
	return (
	 {label: `${caso.id_cliente.nombre} - ${caso.id_materia.nombre} - ${formatDateShow(caso.fecha)}`,
		value: caso.id}
	)
}

return (
	<>
		<Row style={{ margin: "75px", alignItems: "center", width: "50%" }}>
			<fieldset className="fieldset-select">
				<legend className="fieldset-select__legend"> Buscar caso </legend>
				<InputSelect 
					objects={casos} 
					set={setCaso} 
					createOption={createCasoOption}
					placeholder={"Seleccione un caso"}
					/>
			</fieldset>
		</Row>
		<Row style={{ width: "100%" }}>
			<Col xs={12} md={6}>
				<Row>
					<Card
						style={{
							marginLeft: "50px",
							marginTop: "50px",
							backgroundColor: "#235c62",
							borderColor: "#DFBF68"
						}}
					>
						<Card.Body>
							<Card.Text style={{ color: "white" }}>Gráfico
							</Card.Text>
							<GraficoGernal1 tiempoSesiones={sesionesByCaso} title={"Sesiones del cliente"} />
						</Card.Body>
					</Card>
				</Row>
				<Row>
					<Card style={{
						marginLeft: "50px", marginTop: "50px", backgroundColor: "#235c62", borderColor: "#DFBF68"
					}}>
						<Card.Body>
							<Card.Text style={{ color: "white" }}>Estadísticas generales
							</Card.Text>
							<Row>
								<Col className="d-flex justify-content-center align-items-center"
								>
									<ListGroup as="ol">
										<ListGroup.Item
											as="li"
											className="d-flex justify-content-between align-items-start"
										>
											<div className="ms-2 me-auto">
												<div className="fw-bold">27</div>
												Sesiones realizadas
											</div>
										</ListGroup.Item>

										<ListGroup.Item
											as="li"
											className="d-flex justify-content-between align-items-start"

										>
											<div className="ms-2 me-auto">
												<div className="fw-bold">8h 27m</div>
												Tiempo trabajado
											</div>
										</ListGroup.Item>

										<ListGroup.Item
											as="li"
											className="d-flex justify-content-between align-items-start"
										>
											<div className="ms-2 me-auto">
												<div className="fw-bold">11</div>
												Clientes atendidos
											</div>
										</ListGroup.Item>
									</ListGroup>
								</Col>
								<Col className="d-flex justify-content-center align-items-center">
									<ListGroup as="ol">
										<ListGroup.Item
											as="li"
											className="d-flex justify-content-between align-items-start"
										>
											<div className="ms-2 me-auto">
												<div className="fw-bold">32</div>
												Sesiones realizadas
											</div>
										</ListGroup.Item>

										<ListGroup.Item
											as="li"
											className="d-flex justify-content-between align-items-start"

										>
											<div className="ms-2 me-auto">
												<div className="fw-bold">8h 27m</div>
												Tiempo trabajado
											</div>
										</ListGroup.Item>

										<ListGroup.Item
											as="li"
											className="d-flex justify-content-between align-items-start"
										>
											<div className="ms-2 me-auto">
												<div className="fw-bold">11</div>
												Clientes atendidos
											</div>
										</ListGroup.Item>
									</ListGroup>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Row>

			</Col>

			<Col
				xs={6}
				md={6}
				className="d-flex justify-content-center align-items-center"
			>
				<Card
					style={{
						width: "50%",
						backgroundColor: "#1e464b",
						borderColor: "#1e464b",
						marginTop: "50px",
					}}
				>
					<Row>
						<Col>
							<Card style={{
								marginLeft: "50px", marginTop: "50px", backgroundColor: "#235c62", borderColor: "#DFBF68"
							}}>
								<Card.Body>
									<Card.Text style={{ color: "white", textAlign: "center" }}>Sesiones del caso
									</Card.Text>
									<Table_01 header={headerClientes}
										listObject={sesionesByCaso} />
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Card>
			</Col>
		</Row>
	</>
);
}
export default Clientes;
