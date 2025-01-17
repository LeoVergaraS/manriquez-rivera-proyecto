import "./materias.scss";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import castTime from "../../utils/functions/castTime";
import { BiUser, BiTime, BiClipboard } from "react-icons/bi";
import formatDateShow from "../../utils/functions/formatDateShow";
import InputSelect from "../../components/InputSelect/InputSelect";
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";
import { Card, Col, Container, Pagination, Row, Table } from "react-bootstrap";
import captions from "../../utils/functions/captions";
import GraficoBarras from "../../components/Graficos/GraficoBarras";
import urlweb from "../../utils/config/urlweb";

const Materias = ({
	id_abogado,
	fechaInicio,
	fechaFin,
	dropSelect,
	dropSiempre,
	dropAnio,
	setDropSelect,
	setFechaInicio,
	setFechaFiltroInicio,
	setFechaFiltroFin,
}) => {
	const [materias, setMaterias] = useState([]);
	const [materia, setMateria] = useState({ id: 0 });
	const [sesionesMateria, setSesionesMateria] = useState([]);
	const [sesionesMateriaTabla, setSesionesMateriaTabla] = useState([]); //para la tabla

	const [estadisticas, setEstadisticas] = useState({
		cantidad_sesiones: 0,
		tiempo_total: 0,
		cantidad_clientes: 0,
	});

	const getMaterias = async () => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			};
			let url = `${urlweb}/materias`;
			const response = await axios.get(url, config);
			if (response.status === 200) {
				setMaterias(response.data);
			}
		} catch (err) {
			console.error(err);
		}
	};
	// GRAFICO //
	const getSesionesByMateriaDesdeSiempre = async (id_abogado) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			};
			let url = `${urlweb}/consultas/materia/sesiones/${materia.id}/${id_abogado}`
			const response = await axios.get(url, config);
			if (response.status === 200) {
				setSesionesMateria(response.data);
				setFechaFiltroInicio(response.data[0].fecha);
				setFechaFiltroFin(fechaFin)
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const getSesionesByMateria = async (
		id_abogado,
		fechaInicio,
		fechaFin,
		dropSelect,
		dropSiempre,
		dropAnio
	) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			};
			// si es que se selecciono desde siempre
			if (dropSiempre == 1) {
				getSesionesByMateriaDesdeSiempre(
					id_abogado,
					fechaInicio,
					fechaFin,
					dropSelect,
					dropSiempre
				);
			} else {
				// esto calcula la diferencia de dias entre las fechas cuando se selecciona un año en el dropSelect
				if (dropAnio == 1) {
					const fechaInicioAux = new Date(fechaInicio);
					const fechaFinAux = new Date(fechaFin);

					const difMS = fechaFinAux - fechaInicioAux;
					const difDias = Math.trunc(difMS / (1000 * 60 * 60 * 24));
					setDropSelect(difDias + 1);
				}
				let url =
					`${urlweb}/consultas/materia/sesiones/${materia.id}/${fechaInicio}/${fechaFin}/${dropSelect}/${id_abogado}`
				const response = await axios.get(url, config);
				if (response.status === 200) {
					setSesionesMateria(response.data);
					setFechaFiltroInicio(response.data[0].fecha);
					setFechaFiltroFin(fechaFin)
				}
			}
		} catch (err) {
			console.error(err);
		}
	};

	// TABLA //


	const getSesionesByMateriaDesdeSiempreTabla = async (id_abogado) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			};
			let url =
				`${urlweb}/consultas/materia/tabla/${materia.id}/${id_abogado}`
			const response = await axios.get(url, config);
			if (response.status === 200) {
				//setSesionesMateria(response.data);
				setSesionesMateriaTabla(
					response.data.filter((sesion) => sesion.tiempo !== 0)
				);
				console.log(sesionesMateriaTabla);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const getSesionesByMateriaTabla = async (
		id_abogado,
		fechaInicio,
		fechaFin,
		dropSelect,
		dropSiempre,
		dropAnio
	) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			};
			// si es que se selecciono desde siempre
			if (dropSiempre == 1) {
				getSesionesByMateriaDesdeSiempreTabla(
					id_abogado,
					fechaInicio,
					fechaFin,
					dropSelect,
					dropSiempre
				);
			} else {
				// esto calcula la diferencia de dias entre las fechas cuando se selecciona un año en el dropSelect
				if (dropAnio == 1) {
					const fechaInicioAux = new Date(fechaInicio);
					const fechaFinAux = new Date(fechaFin);

					const difMS = fechaFinAux - fechaInicioAux;
					const difDias = Math.trunc(difMS / (1000 * 60 * 60 * 24));
					setDropSelect(difDias + 1);
				}
				let url = `${urlweb}/consultas/materia/tabla/${materia.id}/${fechaInicio}/${fechaFin}/${dropSelect}/${id_abogado}`
				const response = await axios.get(url, config);
				if (response.status === 200) {
					setSesionesMateriaTabla(
						response.data.filter((sesion) => sesion.tiempo !== 0)
					);
				}
			}
		} catch (err) {
			console.error(err);
		}
	};

	const getEstadisticas = async (
		id_abogado,
		fechaInicio,
		fechaFin,
		dropSiempre
	) => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${Cookies.get("token")}` },
			};
			let url = `${urlweb}/consultas/materia/estadisticas/${id_abogado}/${materia.id}/${fechaInicio}/${fechaFin}/${dropSiempre}`
			const response = await axios.get(url, config);
			if (response.status === 200) {
				setEstadisticas(response.data);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const createMateriaOption = (materia) => {
		return {
			value: materia.id,
			label: materia.nombre,
		};
	};

	useEffect(() => {
		getMaterias();
	}, []);

	useEffect(() => {
		if (materia.id !== 0) {
			getSesionesByMateria(
				id_abogado,
				fechaInicio,
				fechaFin,
				dropSelect,
				dropSiempre,
				dropAnio
			);
			getSesionesByMateriaTabla(
				id_abogado,
				fechaInicio,
				fechaFin,
				dropSelect,
				dropSiempre,
				dropAnio
			);
			getEstadisticas(id_abogado, fechaInicio, fechaFin, dropSiempre);
		}
	}, [materia, id_abogado, fechaInicio, fechaFin, dropSelect, dropSiempre, dropAnio, setDropSelect,
	]);

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
		paginatedData(sesionesMateriaTabla);
		setPagesCount(Math.ceil(sesionesMateriaTabla.length / pageSize));
	}, [currentPage, sesionesMateriaTabla]);

	return (
		<Container fluid className="dashboard-materia-layout">
			<Row className="dashboard-materia__row">
				<Col xs={12} xxl={6}>
					<Row className="dashboard-materia__row--select">
						<Col>
							<fieldset className="materias__fieldset-select">
								<legend className="materias__legend">Buscar materia</legend>
								<InputSelect
									objects={materias}
									placeholder={"Seleccione una materia"}
									set={setMateria}
									options={materias.map(createMateriaOption)}
									home={false}
								/>
							</fieldset>
						</Col>
					</Row>
					<Row className="dashboard-materia__row--estadisticas" xs={1} md={3}>
						<Col>
							<Card className="card-estadisticas">
								<div className="card-estadisticas__header">
									<h2 className="card-estadisticas__title">Sesiones</h2>
									<span className="card-estadisticas__icon">
										<BiClipboard />
									</span>
								</div>
								<h1 className="card-estadisticas__estadistica">
									{estadisticas.cantidad_sesiones}
								</h1>
								<p className="card-estadisticas__caption">
									Sesiones realizadas
								</p>
							</Card>
						</Col>
						<Col>
							<Card className="card-estadisticas">
								<div className="card-estadisticas__header">
									<h2 className="card-estadisticas__title">Tiempo</h2>
									<span className="card-estadisticas-c__icon">
										<BiTime />
									</span>
								</div>
								<h1 className={"card-estadisticas__estadistica" + (estadisticas.tiempo_total >= 3600 ? " tiempo" : "")}>
									{estadisticas.tiempo_total === null ?
										"0 seg" : castTime(estadisticas.tiempo_total)}
								</h1>
								<p className="card-estadisticas__caption">
									{estadisticas.tiempo_total === null ? "Trabajados en total" : captions(estadisticas.tiempo_total)}
								</p>
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
								<h1 className="card-estadisticas__estadistica">
									{estadisticas.cantidad_clientes}
								</h1>
								<p className="card-estadisticas__caption">
									Clientes atendidos
								</p>
							</Card>
						</Col>
					</Row>
					<Row className="dashboard-materia__row--grafico">
						<Col>
							<GraficoGernal1
								tiempoSesiones={sesionesMateria}
								title={"Tiempo de sesiones por día"}
							/>
						</Col>
					</Row>
				</Col>
				<Col xs={12} xxl={6}>
					<Row className="dashboard-materia__row--special" />
					<Row>
						<Col>
							<Card className="card-sesiones">
								<Card.Body>
									<Card.Title>Sesiones registradas</Card.Title>
									<Table className="table-sesiones">
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

export default Materias;
