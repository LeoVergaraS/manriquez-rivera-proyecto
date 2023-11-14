import "./general.scss";
import castTime from "../../utils/functions/castTime";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";
import GraficoGernal2 from "../../components/Graficos/GraficoGeneral2";
import { BiUser, BiClipboard, BiBookmark, BiBookmarks } from "react-icons/bi";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const General = ({dropSiempre, dropAnio, setFechaInicio, fechaInicio, fechaFin, dropSelect, abogado, setDropSelect, setFechaFiltroInicio, setFechaFiltroFin}) => {
	
	// Variable que almacena las consultas de vista GENERAL
	// se les aplica todos los filtros
	const [consultasS, setConsultasS] = useState([]);
	const [consultasM, setConsultasM] = useState([]);
	const [estadisticas, setEstadisticas] = useState([]);

	const getEstadisticas = async () => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` }
			};
			let url = "http://localhost:8090/consultas/prueba/" + fechaInicio + "/" + fechaFin + "/" + dropSiempre + "/" + abogado.id;
			const response = await axios.get(url, config);
			if (response.status === 200) {
				setEstadisticas(response.data);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const getConsultasMaterias = async () => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` }
			};
			let url = "http://localhost:8090/consultas/materia/" + fechaInicio + "/" + fechaFin + "/" + dropSelect + "/" + dropSiempre + "/" +
				abogado.id;
			const response = await axios.get(url, config);
			if (response.status === 200) {
				setConsultasM(response.data);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	// aqui se obtienen las consultas de sesiones
	const getConsultasSesiones = async () => {
		try {
			// si es que se selecciono desde siempre
			if (dropSiempre == 1) {
				getConsultasSesionesDesdeSiempre();
			} else {
				// esto calcula la diferencia de dias entre las fechas cuando se selecciona un año en el dropSelect
				if (dropAnio == 1) {
					const fechaInicioAux = new Date(fechaInicio);
					const fechaFinAux = new Date(fechaFin);

					const difMS = fechaFinAux - fechaInicioAux;
					const difDias = Math.trunc(difMS / (1000 * 60 * 60 * 24));
					setDropSelect(difDias + 1);
				}

				const config = {
					headers: { Authorization: `Bearer ${Cookies.get("token")}` }
				};

				let url = "http://localhost:8090/consultas/sesiones/" + fechaInicio + "/" + fechaFin + "/" + dropSelect + "/" + abogado.id;
				const response = await axios.get(url, config);

				if (response.status === 200) {
					setConsultasS(response.data);
					setFechaFiltroInicio(response.data[0].fecha);
					setFechaFiltroFin(fechaFin)
				}
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const getConsultasSesionesDesdeSiempre = async () => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` }
			};
			let url = "http://localhost:8090/consultas/sesiones/" + abogado.id;
			const response = await axios.get(url, config);
			if (response.status === 200) {
				setConsultasS(response.data);
				setFechaFiltroInicio(response.data[0].fecha);
				setFechaFiltroFin(fechaFin)
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		getConsultasMaterias();
		getConsultasSesiones();
		getEstadisticas();
	}, [fechaFin, fechaInicio, dropSelect, dropSiempre, dropAnio, abogado]);

	return (
		<Container fluid className="mt-3">
			<Row style={{ height: "calc(100vh - 175px)" }}>
				<Col>
					<Container style={{ height: "100%" }}>
						<Row className="mb-4" style={{ height: "49%" }}>
							<Col>
								<Card className="card-grafico-1">
									<Card.Body style={{ padding: 0 }}>
										<GraficoGernal1
											tiempoSesiones={consultasS}
											title={"Tiempo de sesiones por día"}
										/>
									</Card.Body>
								</Card>
							</Col>
						</Row>
						<Row style={{ height: "48%" }} >
							<Col>
								<Card className="card-grafico-2">
									<Card.Body style={{ padding: 0 }}>
										<GraficoGernal2
											consultasM={consultasM}
											title={"Tiempo de materias por día"}
										/>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Container>
				</Col>
				<Col>
					<Container style={{ height: "100%" }}>
						<Row className="mb-4" style={{ height: "49%" }}>
							<Col>
								<Card className="card-estadisticas">
									<div className="card-estadisticas__header">
										<h2 className="card-estadisticas__title">Sesiones</h2>
										<span className="card-estadisticas-c__icon">
											<BiClipboard />
										</span>
									</div>
									<Table responsive="sm" style={{ textAlign: "center" }}>
										<tbody>
											<tr>
												<td>Cantidad</td>
												<td>{estadisticas.cantidad_sesiones}</td>
											</tr>
											<tr>
												<td>Tiempo total</td>
												<td>{castTime(estadisticas.cantidad_tiempo)}</td>
											</tr>
										</tbody>
									</Table>
								</Card>
							</Col>
							<Col>
								<Card className="card-estadisticas">
									<div className="card-estadisticas__header">
										<h2 className="card-estadisticas__title">Clientes</h2>
										<span className="card-estadisticas-c__icon">
											<BiUser />
										</span>
									</div>
									<Table responsive="sm" style={{ textAlign: "center" }}>
										<tbody>
											<tr>
												<td>Cantidad</td>
												<td>{estadisticas.cantidad_clientes}</td>
											</tr>
											<tr>
												<td>Más atendido</td>
												<td>{estadisticas.nombre_cliente_max}</td>
											</tr>
											<tr>
												<td>Tiempo</td>
												<td>{castTime(estadisticas.tiempo_cliente_max)}</td>
											</tr>
										</tbody>
									</Table>
								</Card>
							</Col>
						</Row>
						<Row style={{ height: "49%" }}>
							<Col>
								<Card className="card-estadisticas">
									<div className="card-estadisticas__header">
										<h2 className="card-estadisticas__title">Materias</h2>
										<span className="card-estadisticas-c__icon">
											<BiBookmark />
										</span>
									</div>
									<Table responsive="sm" style={{ textAlign: "center" }}>
										<tbody>
											<tr>
												<td>Cantidad</td>
												<td>{estadisticas.cantidad_materias}</td>
											</tr>
											<tr>
												<td>Más atendida</td>
												<td>{estadisticas.nombre_materia_max}</td>
											</tr>
											<tr>
												<td>Tiempo</td>
												<td>{castTime(estadisticas.tiempo_materia_max)}</td>
											</tr>
										</tbody>
									</Table>
								</Card>
							</Col>
							<Col>
								<Card className="card-estadisticas">
									<div className="card-estadisticas__header">
										<h2 className="card-estadisticas__title">Submaterias</h2>
										<span className="card-estadisticas-c__icon">
											<BiBookmarks />
										</span>
									</div>
									<Table responsive="sm" style={{ textAlign: "center" }}>
										<tbody>
											<tr>
												<td>Cantidad</td>
												<td>{estadisticas.cantidad_submateria}</td>
											</tr>
											<tr>
												<td>Más atendida</td>
												<td>{estadisticas.nombre_submateria_max}</td>
											</tr>
											<tr>
												<td>Tiempo</td>
												<td>{castTime(estadisticas.tiempo_submateria_max)}</td>
											</tr>
										</tbody>
									</Table>
								</Card>
							</Col>
						</Row>
					</Container>
				</Col>
			</Row>
		</Container>
	);
};

export default General;
