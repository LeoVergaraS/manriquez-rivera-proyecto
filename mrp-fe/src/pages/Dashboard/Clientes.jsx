import "./clientes.scss";
import axios from "axios";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { BiTime, BiClipboard } from "react-icons/bi";
import castTime from "../../utils/functions/castTime";
import formatDateShow from "../../utils/functions/formatDateShow";
import { Card, Table, Container, Col, Row } from "react-bootstrap";
import InputSelect from "../../components/InputSelect/InputSelect";
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";

const Clientes = ({fechaInicio, fechaFin, dropSiempre, id_abo, dropSelect, dropAnio, setDropSelect,}) => {
	const [caso, setCaso] = useState([]);
	const [casos, setCasos] = useState([]);
	const [sesionesByCaso, setSesionesByCaso] = useState([]);
	const [estadisticas, setEstadisticas] = useState({
		cantidad_sesiones: 0,
		tiempo_total: 0,
	});

	const getCasos = async () => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` }
			};
			let url = "http://localhost:8090/casos/abogado/" + id_abo;
			const response = await axios.get(url, config);
			if (response.status === 200) {
				setCasos(response.data);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const getSesionesByIdCaso = async (id) => {
		try {
			// si es que se selecciono desde siempre
			if (dropSiempre == 1) {
				getSesionesByIdCasoDesdeSiempre(id);
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

				let url ="http://localhost:8090/consultas/sesiones/id_caso/" + id + "/" + fechaInicio + "/" + fechaFin + "/" + id_abo + "/" +
					dropSelect;
				const response = await axios.get(url, config);
				if (response.status === 200) {
					setSesionesByCaso(response.data);
				}
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const getSesionesByIdCasoDesdeSiempre = async (id) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` }
			};
			let url = "http://localhost:8090/consultas/sesiones/" + id + "/" + id_abo;
			const response = await axios.get(url,config);
			if (response.status === 200) {
				setSesionesByCaso(response.data);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const getEstadisticas = async (id_caso, fechaInicio, fechaFin, id_abo, dropSiempre) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` }
			};
			let url = `http://localhost:8090/consultas/cliente/estadisticas/${id_caso}/${fechaInicio}/${fechaFin}/${id_abo}/${dropSiempre}`;
			const response = await axios.get(url,config);
			if (response.status === 200) {
				setEstadisticas(response.data);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getCasos();
	}, [fechaInicio, fechaFin, id_abo, dropSiempre]);

	useEffect(() => {
		if (caso.id !== undefined) {
			getSesionesByIdCaso(caso.id);
			getEstadisticas(caso.id, fechaInicio, fechaFin, id_abo, dropSiempre);
		}
	}, [caso, fechaInicio, fechaFin, id_abo, dropSiempre]);

	const createCasoOption = (caso) => {
		return {
			label: `${caso.id_cliente.nombre} - ${caso.id_materia.nombre
				} - ${formatDateShow(caso.fecha)}`,
			value: caso.id,
		};
	};

	return (
		<Container fluid className="mt-3">
			<Row style={{ height: "calc(100vh - 153px)" }}>
				<Col xs={6}>
					<Container>
						<Row>
							<fieldset className="clientes__fieldset-select">
								<legend className="clientes__legend"> Buscar caso</legend>
								<InputSelect
									objects={casos}
									set={setCaso}
									createOption={createCasoOption}
									placeholder={"Seleccione un caso"}
								/>
							</fieldset>
						</Row>
						<Row className="mb-3">
							<Col>
								<Card className="card-estadisticas-c">
									<div className="card-estadisticas-c__header">
										<h2 className="card-estadisticas-c__title">Sesiones</h2>
										<span className="card-estadisticas-c__icon">
											<BiClipboard />
										</span>
									</div>
									<h1 className="card-estadisticas-c__estadistica">
										{estadisticas.cantidad_sesiones}
									</h1>
									<p className="card-estadisticas-c__caption">
										Sesiones realizadas
									</p>
								</Card>
							</Col>
							<Col>
								<Card className="card-estadisticas-c">
									<div className="card-estadisticas-c__header">
										<h2 className="card-estadisticas-c__title">Tiempo total</h2>
										<span className="card-estadisticas-c__icon">
											<BiTime />
										</span>
									</div>
									<h1 className="card-estadisticas-c__estadistica">
										{castTime(estadisticas.tiempo_total)}
									</h1>
									<p className="card-estadisticas-c__caption">
										De tiempo trabajado
									</p>
								</Card>
							</Col>
						</Row>
						<Row className="p-2" style={{ height: "450px" }}>
							<Card className="card-grafico-c">
								<GraficoGernal1
									tiempoSesiones={sesionesByCaso}
									title={"Sesiones del cliente"}
								/>
							</Card>
						</Row>
					</Container>
				</Col>
				<Col xs={6} className="p-2">
					<Container>
						<Row style={{ height: "35px" }} />
						<Row style={{ height: "calc(100vh - 206px)" }}>
							<Card className="card-sesiones">
								<Card.Body>
									<Card.Title>Sesiones registradas</Card.Title>
									<Table className="table-sesiones">
										<thead>
											<tr>
												<th>Fecha</th>
												<th>Tiempo</th>
											</tr>
										</thead>
										<tbody>
											{sesionesByCaso.map((sesion, index) => {
												if (sesion.tiempo !== 0) {
													return (
														<tr key={index}>
															<td>{formatDateShow(sesion.fecha)}</td>
															<td>{castTime(sesion.tiempo)}</td>
														</tr>
													);
												}
											})}
										</tbody>
									</Table>
								</Card.Body>
							</Card>
						</Row>
					</Container>
				</Col>
			</Row>
		</Container>
	);
};
export default Clientes;
