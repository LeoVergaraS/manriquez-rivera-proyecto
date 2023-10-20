import { Card, Row, Col } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";
import List from "../../components/List/List";
import Table_01 from "../../components/Table_01/Table_01";

const Clientes = ({ consultasS }) => {

	const headerClientes = ["Sesiones", "Tiempo"];
	const elementos = [{ sesiones: "10-10-2023", tiempo: 200 }, { sesiones: "12-10-2023", tiempo: 200 }];

	return (
		<>
			<Row>
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
								<Card.Text style={{ color: "white" }}><h3>Gráfico</h3>
								</Card.Text>
								<GraficoGernal1 tiempoSesiones={consultasS} title={"Sesiones del cliente"} />
							</Card.Body>
						</Card>
					</Row>
					<Row>
						<Card style={{
							marginLeft: "50px", marginTop: "50px", backgroundColor: "#235c62", borderColor: "#DFBF68"
						}}>
							<Card.Body>
								<Card.Text style={{ color: "white" }}><h3>Estadísticas generales</h3>
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
									<Card.Text style={{ color: "white", textAlign:"center" }}><h3>Sesiones del caso</h3>
									</Card.Text>
										<Table_01 header={headerClientes}
											listObject={elementos} />
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
