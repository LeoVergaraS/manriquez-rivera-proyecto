import "./general.scss";
import castTime from "../../utils/functions/castTime";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";
import GraficoGernal2 from "../../components/Graficos/GraficoGeneral2";
import GraficoBarras from "../../components/Graficos/GraficoBarras";
import { BiUser, BiClipboard, BiBookmark, BiBookmarks } from "react-icons/bi";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const General = ({ dropSiempre, dropAnio, setFechaInicio, fechaInicio, fechaFin, dropSelect, abogado, setDropSelect, setFechaFiltroInicio, setFechaFiltroFin }) => {

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
				console.log("fechaFingCSDS", fechaFin)
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
						<Row className="mb-4" style={{ height: "45%" }}>
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
						<Row className="mb-4" style={{ height: "45%" }}>
							<Col>
								<Card className="card-grafico-2">
									<Card.Body style={{ padding: 0 }}>
										<GraficoBarras
											consultasM={consultasM}
											tittle={"Tiempo de materias"}/>
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
									<div className="card-estadisticas__body">
										<h1 className="card-estadisticas__estadistica">
											{estadisticas.cantidad_sesiones}
										</h1>
										<p className="card-estadisticas__caption" style={{ marginBottom: 1 }}>
											{estadisticas.cantidad_sesiones == 1 ? "Sesión" : "Sesiones"}
										</p>
										<hr style={{ width: "90%", height: "2px", color: "#1E464B", backgroundColor: "#1E464B", borderWidth: 0 }}></hr>
										<h1 className={"card-estadisticas__estadistica" + (estadisticas.cantidad_tiempo >= 3600 ? " tiempo" : "")}>
											{estadisticas.cantidad_tiempo === null ?
												"0 seg" : castTime(estadisticas.cantidad_tiempo)}
										</h1>
										<p className="card-estadisticas__caption">
											trabajados
										</p>
									</div>

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
									<div className="card-estadisticas__body">
										<div className="card-estadisticas__upper">
											<h1 style={{fontSize: "45px"}} className="card-estadisticas__estadistica">
												{estadisticas.cantidad_clientes}
											</h1>
											<p className="card-estadisticas__caption" style={{ marginBottom: 1 }}>
												{estadisticas.cantidad_clientes == 1 ? "Cliente" : "Clientes"}
											</p>
										</div>

										<hr style={{ width: "90%", height: "2px", color: "#1E464B", backgroundColor: "#1E464B", borderWidth: 0, margin: 3 }}></hr>
										<h1 style={{fontSize: "40px"}}  className={"card-estadisticas__estadistica" + (estadisticas.tiempo_cliente_max >= 3600 ? " tiempo" : "")}>
											{estadisticas.tiempo_cliente_max === null ?
												"0 seg" : castTime(estadisticas.tiempo_cliente_max)}
										</h1>
										<p className="card-estadisticas__caption" style={{margin: 0}}>
											trabajados
										</p>
										<hr style={{ width: "90%", height: "2px", color: "#1E464B", backgroundColor: "#1E464B", borderWidth: 0, margin: 3 }}></hr>
										<h1 className="card-estadisticas__estadistica" style={{fontSize: "38px", margin: 0}}>
											{estadisticas.nombre_cliente_max}
										</h1>
										<p className="card-estadisticas__caption" style={{ marginBottom: 1 }}>
											Con más sesiones
										</p>
									</div>

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
									<div className="card-estadisticas__body">
										<div className="card-estadisticas__upper">
											<h1 style={{fontSize: "45px"}}  className="card-estadisticas__estadistica">
												{estadisticas.cantidad_materias}
											</h1>
											<p className="card-estadisticas__caption" style={{ marginBottom: 1 }}>
												{estadisticas.cantidad_materias == 1 ? "Materia" : "Materias"}
											</p>
										</div>

										<hr style={{ width: "90%", height: "2px", color: "#1E464B", backgroundColor: "#1E464B", borderWidth: 0, margin: 3 }}></hr>
										<h1 style={{fontSize: "40px"}}  className={"card-estadisticas__estadistica" + (estadisticas.tiempo_materia_max >= 3600 ? " tiempo" : "")}>
											{estadisticas.tiempo_materia_max === null ?
												"0 seg" : castTime(estadisticas.tiempo_materia_max)}
										</h1>
										<p className="card-estadisticas__caption" style={{margin: 0}}>
											trabajados
										</p>
										<hr style={{ width: "90%", height: "2px", color: "#1E464B", backgroundColor: "#1E464B", borderWidth: 0, margin: 3 }}></hr>
										<h1 className="card-estadisticas__estadistica" style={{fontSize: "38px", margin: 0}}>
											{estadisticas.nombre_materia_max}
										</h1>
										<p className="card-estadisticas__caption" style={{ marginBottom: 1 }}>
											Con más sesiones
										</p>
									</div>
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
									<div className="card-estadisticas__body">
										<div className="card-estadisticas__upper">
											<h1 className="card-estadisticas__estadistica" style={{fontSize: "45px"}}>
												{estadisticas.cantidad_submateria}
											</h1>
											<p className="card-estadisticas__caption" style={{ marginBottom: 1 }}>
												{estadisticas.cantidad_submateria == 1 ? "Submateria" : "Submaterias"}
											</p>
										</div>

										<hr style={{ width: "90%", height: "2px", color: "#1E464B", backgroundColor: "#1E464B", borderWidth: 0, margin: 3 }}></hr>
										<h1 style={{fontSize: "40px"}} className={"card-estadisticas__estadistica" + (estadisticas.tiempo_submateria_max >= 3600 ? " tiempo" : "")}>
											{estadisticas.tiempo_submateria_max === null ?
												"0 seg" : castTime(estadisticas.tiempo_submateria_max)}
										</h1>
										<p className="card-estadisticas__caption" style={{margin: 0}}>
											trabajados
										</p>
										<hr style={{ width: "90%", height: "2px", color: "#1E464B", backgroundColor: "#1E464B", borderWidth: 0, margin: 3 }}></hr>
										<h1 className="card-estadisticas__estadistica" style={{fontSize: "38px", margin: 0}}>
											{estadisticas.nombre_submateria_max}
										</h1>
										<p className="card-estadisticas__caption" style={{ marginBottom: 1 }}>
											Con más sesiones
										</p>
									</div>
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
