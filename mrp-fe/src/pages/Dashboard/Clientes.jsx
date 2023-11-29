import "./clientes.scss";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BiTime, BiClipboard } from "react-icons/bi";
import castTime from "../../utils/functions/castTime";
import formatDateShow from "../../utils/functions/formatDateShow";
import InputSelect from "../../components/InputSelect/InputSelect";
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";
import { Card, Table, Container, Col, Row, Pagination } from "react-bootstrap";
import captions from "../../utils/functions/captions";
import urlweb from "../../utils/config/urlweb";

const Clientes = ({
	fechaInicio,
	fechaFin,
	dropSiempre,
	id_abo,
	dropSelect,
	dropAnio,
	setDropSelect,
	setFechaInicio,
	setFechaFiltroInicio,
	setFechaFiltroFin,
}) => {
	const [caso, setCaso] = useState([]);
	const [casos, setCasos] = useState([]);
	const [sesionesByCaso, setSesionesByCaso] = useState([]);
	const [sesionesByCasoTabla, setSesionesByCasoTabla] = useState([]); //para la tabla
	const [estadisticas, setEstadisticas] = useState({
		cantidad_sesiones: 0,
		tiempo_total: 0,
	});

	const getCasosByFecha = async (id_abo) => {
		try {
			if (dropSiempre == 1) {
				getCasosByIdAbogadoDesdeSiempre(id_abo);
			} else {
				const config = {
					headers: { Authorization: `Bearer ${Cookies.get("token")}` },
				};
				let url = `http://${urlweb}/casos/abogado/${id_abo}/${fechaInicio}/${fechaFin}`;
				const response = await axios.get(url, config);
				if (response.status === 200) {
					setCasos(response.data);
					handleOptions(response.data);
				}
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const getCasosByIdAbogadoDesdeSiempre = async (id_abo) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			};
			console.log("getCasosDesdeSiempre");
			let url = `http://${urlweb}/casos/abogado/siempre/${id_abo}/${fechaInicio}/${fechaFin}`;
			const response = await axios.get(url, config);
			if (response.status === 200) {
				setCasos(response.data);
				handleOptions(response.data);
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
					headers: { Authorization: `Bearer ${Cookies.get("token")}` },
				};
				let url = `http://${urlweb}/consultas/sesiones/id_caso/${id}/${fechaInicio}/${fechaFin}/${id_abo}/${dropSelect}`
				const response = await axios.get(url, config);
				if (response.status === 200) {
					setSesionesByCaso(response.data);
					//console.log("response.data", response.data);
					//setFechaInicio(response.data[0].fecha);
					setFechaFiltroInicio(response.data[0].fecha);
					setFechaFiltroFin(fechaFin)
				}
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const getSesionesByIdCasoDesdeSiempre = async (id) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			};
			let url = `http://${urlweb}/consultas/sesiones/${id}/${id_abo}`;
			const response = await axios.get(url, config);
			if (response.status === 200) {
				setSesionesByCaso(response.data);
				//setFechaInicio(response.data[0].fecha);
				setFechaFiltroInicio(response.data[0].fecha);
				setFechaFiltroFin(fechaFin)
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const getSesionesByIdCasoTabla = async (id) => {
		try {

			if (dropSiempre == 1) {
				getSesionesByIdCasoTablaDesdeSiempre(id);
			} else {

				if (dropAnio == 1) {
					const fechaInicioAux = new Date(fechaInicio);
					const fechaFinAux = new Date(fechaFin);

					const difMS = fechaFinAux - fechaInicioAux;
					const difDias = Math.trunc(difMS / (1000 * 60 * 60 * 24));
					setDropSelect(difDias + 1);
				}

				const config = {
					headers: { Authorization: `Bearer ${Cookies.get("token")}` },
				};
				let url = `http://${urlweb}/consultas/sesiones/tabla/id_caso/${id}/${fechaInicio}/${fechaFin}/${id_abo}/${dropSelect}`
				const response = await axios.get(url, config);
				if (response.status === 200) {
					setSesionesByCasoTabla(response.data);
				}
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const getSesionesByIdCasoTablaDesdeSiempre = async (id) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			};
			let url = `http://${urlweb}/consultas/sesiones/tabla/id_caso/${id}/${id_abo}`;
			const response = await axios.get(url, config);
			if (response.status === 200) {
				setSesionesByCasoTabla(response.data);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const getEstadisticas = async (id_caso, fechaInicio, fechaFin, id_abo, dropSiempre) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			};
			let url = `http://${urlweb}/consultas/cliente/estadisticas/${id_caso}/${fechaInicio}/${fechaFin}/${id_abo}/${dropSiempre}`;
			const response = await axios.get(url, config);
			if (response.status === 200) {
				setEstadisticas(response.data);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const [options, setOptions] = useState([]);

	const createCasoOptionDesdeSiempre = (caso) => {
		return {
			label: `${caso.nombre_cliente} - ${caso.nombre_materia
				} - ${formatDateShow(caso.fecha)}`,
			value: caso.id,
		};
	};

	const createCasoOption = (caso) => {
		return {
			label: `${caso.id_cliente.nombre} - ${caso.id_materia.nombre
				} - ${formatDateShow(caso.fecha)}`,
			value: caso.id,
		};
	};

	const handleOptions = (casos) => {
		if (casos.length === 0) return setOptions([]);
		const nKeys = Object.keys(casos[0]).length;
		if (nKeys === 4) setOptions(casos.map(createCasoOptionDesdeSiempre));
		else setOptions(casos.map(createCasoOption));
	}

	//Para la paginacion de la tabla
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [sliceData, setSliceData] = useState(null);
	const [pagesCount, setPagesCount] = useState(0);

	const handlePageChange = (page) => {
		if (page < 1 || page > pagesCount) return;
		setCurrentPage(page);
	};

	const paginatedData = (data) => {
		setSliceData(
			data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
		);
	};

	useEffect(() => {
		paginatedData(sesionesByCasoTabla);
		setPagesCount(Math.ceil(sesionesByCasoTabla.length / pageSize));
	}, [currentPage, sesionesByCasoTabla]);

	useEffect(() => {
		getCasosByFecha(id_abo);
	}, [id_abo, fechaInicio, fechaFin, dropSiempre]);

	useEffect(() => {
		if (caso.id !== undefined) {
			getSesionesByIdCaso(caso.id);
			getSesionesByIdCasoTabla(caso.id);
			getEstadisticas(caso.id, fechaInicio, fechaFin, id_abo, dropSiempre);
		}
	}, [caso, fechaInicio, fechaFin, id_abo, dropSiempre]);

	return (
		<Container fluid className="dashboard-clientes-layout">
			<Row className="dashboard-clientes__row">
				<Col xs={12} xxl={6}>
					<Row className="dashboard-clientes__row--select">
						<Col>
							<fieldset className="clientes__fieldset-select">
								<legend className="clientes__legend">Buscar caso</legend>
								<InputSelect
									objects={casos}
									set={setCaso}
									options={options}
									placeholder={"Seleccione un caso"}
									home={false}
								/>
							</fieldset>
						</Col>
					</Row>
					<Row className="dashboard-clientes__row--estadisticas" xs={1} md={2}>
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
								<h1 className={"card-estadisticas-c__estadistica" + (estadisticas.tiempo_total >= 3600 ? " tiempo" : "")} >
									{estadisticas.tiempo_total === null
										? "0 seg"
										: castTime(estadisticas.tiempo_total)}
								</h1>
								<p className="card-estadisticas-c__caption">
									{estadisticas.tiempo_total === null ? "Trabajados en total" : captions(estadisticas.tiempo_total)}
								</p>
							</Card>
						</Col>
					</Row>
					<Row className="dashboard-clientes__row--grafico"> 
						<Col>
							<GraficoGernal1
								tiempoSesiones={sesionesByCaso}
								title={"Sesiones del cliente"}
							/>
						</Col>
					</Row>
				</Col>
				<Col xs={12} xxl={6} >
					<Row className="dashboard-clientes__row--special"/>
					<Row>
						<Col>
							<Card className="card-sesiones">
								<Card.Body>
									<Card.Title>Sesiones registradas</Card.Title>
									<Table className="table-sesiones" responsive>
										<thead>
											<tr>
												<th>Fecha</th>
												<th>Hora de inicio</th>
												<th>Tiempo</th>
												<th>Actividad</th>
											</tr>
										</thead>
										<tbody>
											{sliceData !== null &&
												sliceData.map((sesion, index) => (
													<tr key={index}>
														<td>{formatDateShow(sesion.fecha)}</td>
														<td>{sesion.hora_inicio}</td>
														<td>{castTime(sesion.tiempo)}</td>
														<td>{sesion.actividad}</td>
													</tr>
												))}
										</tbody>
									</Table>
									{pagesCount !== 0 && (
										<Pagination className="table-paginated__pagination">
											<Pagination.First
												onClick={() => handlePageChange(1)}
												className="table-paginated__pagination-first"
											/>
											<Pagination.Prev
												onClick={() => handlePageChange(currentPage - 1)}
												className="table-paginated__pagination-prev"
											/>
											{[...Array(pagesCount).keys()].map((page) => {
												if (pagesCount <= 5) {
													return (
														<Pagination.Item
															key={page + 1}
															active={page + 1 === currentPage}
															onClick={() => handlePageChange(page + 1)}
															className="table-paginated__pagination-item"
														>
															{page + 1}
														</Pagination.Item>
													);
												} else {
													if (currentPage <= 3 && page <= 5) {
														if (page === 5)
															return (
																<Pagination.Ellipsis className="table-paginated__pagination-ellipsis" />
															);
														return (
															<Pagination.Item
																key={page + 1}
																active={page + 1 === currentPage}
																onClick={() => handlePageChange(page + 1)}
																className="table-paginated__pagination-item"
															>
																{page + 1}
															</Pagination.Item>
														);
													} else if (
														currentPage >= pagesCount - 2 &&
														page >= pagesCount - 6
													) {
														if (page === pagesCount - 6)
															return (
																<Pagination.Ellipsis className="table-paginated__pagination-ellipsis" />
															);
														return (
															<Pagination.Item
																key={page + 1}
																active={page + 1 === currentPage}
																onClick={() => handlePageChange(page + 1)}
																className="table-paginated__pagination-item"
															>
																{page + 1}
															</Pagination.Item>
														);
													} else if (
														currentPage - 4 <= page &&
														page <= currentPage + 2
													) {
														if (
															currentPage - 4 === page ||
															currentPage + 2 === page
														)
															return (
																<Pagination.Ellipsis className="table-paginated__pagination-ellipsis" />
															);
														return (
															<Pagination.Item
																key={page + 1}
																active={page + 1 === currentPage}
																onClick={() => handlePageChange(page + 1)}
																className="table-paginated__pagination-item"
															>
																{page + 1}
															</Pagination.Item>
														);
													}
												}
											})}
											<Pagination.Next
												onClick={() => handlePageChange(currentPage + 1)}
												className="table-paginated__pagination-next"
											/>
											<Pagination.Last
												onClick={() =>
													handlePageChange(
														Math.ceil(sesionesMateria.length / pageSize)
													)
												}
												className="table-paginated__pagination-last"
											/>
										</Pagination>
									)}
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};
export default Clientes;
