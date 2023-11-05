import "./clientes.scss";
import axios from 'axios';
import { useEffect, useState } from "react";
import { BiTime, BiClipboard } from "react-icons/bi";
import { Card, Badge, Table } from "react-bootstrap";
import castTime from "../../utils/functions/castTime";
import formatDateShow from "../../utils/functions/formatDateShow";
import InputSelect from "../../components/InputSelect/InputSelect";
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";

const Clientes = ({ fechaInicio, fechaFin, dropSiempre, id_abo, dropSelect, dropAnio, setDropSelect }) => {

	const [casos, setCasos] = useState([]);
	const [caso, setCaso] = useState([]);
	const [sesionesByCaso, setSesionesByCaso] = useState([]);
	const [estadisticas, setEstadisticas] = useState({
		cantidad_sesiones: 0,
		tiempo_total: 0,
	});

	const getCasos = async () => {
		try {
			let url = "http://localhost:8090/casos/abogado/" + id_abo;
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

				let url = "http://localhost:8090/consultas/sesiones/id_caso/" + id + "/" + fechaInicio + "/" + fechaFin + "/" + id_abo + "/" + dropSelect;
				const response = await axios.get(url);
				if (response.status === 200) {
					//console.log(response.data);
					setSesionesByCaso(response.data);
				}
			}
		}
		catch (err) {
			console.log(err.message);
		}
	};

	const getSesionesByIdCasoDesdeSiempre = async (id) => {
		try {
			let url = "http://localhost:8090/consultas/sesiones/" + id + "/" + id_abo;
			const response = await axios.get(url);
			if (response.status === 200) {
				setSesionesByCaso(response.data);
			}
		} catch (err) {
			console.log(err.message);
		}
	}

	const getEstadisticas = async (id_caso, fechaInicio, fechaFin, id_abo, dropSiempre) => {
		try {
			let url = `http://localhost:8090/consultas/cliente/estadisticas/${id_caso}/${fechaInicio}/${fechaFin}/${id_abo}/${dropSiempre}`;
			const response = await axios.get(url);
			if (response.status === 200) {
				setEstadisticas(response.data);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getCasos();
	}, [fechaInicio, fechaFin, id_abo, dropSiempre])

	useEffect(() => {
		if (caso.id !== undefined) {
			getSesionesByIdCaso(caso.id);
			getEstadisticas(caso.id, fechaInicio, fechaFin, id_abo, dropSiempre);
		}
	}, [caso, fechaInicio, fechaFin, id_abo, dropSiempre])

	const createCasoOption = (caso) => {
		return (
			{
				label: `${caso.id_cliente.nombre} - ${caso.id_materia.nombre} - ${formatDateShow(caso.fecha)}`,
				value: caso.id
			}
		)
	}

	return (
		<>
			<main className="layout-clientes">
				<h2 className="clientes__title">Resumen</h2>
				<fieldset className="clientes__fieldset-select">
					<legend className="clientes__legend"> Buscar caso</legend>
					<InputSelect
						objects={casos}
						set={setCaso}
						createOption={createCasoOption}
						placeholder={"Seleccione un caso"}
					/>
				</fieldset>

				<Card className="card-grafico">
					<GraficoGernal1 tiempoSesiones={sesionesByCaso} title={"Sesiones del cliente"} />
				</Card>

				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "50px", gridColumn: "1/4" }}>

					<Card className="card-estadisticas-c">
						<div className="card-estadisticas__header">
							<h2 className="card-estadisticas-c__title">Sesiones</h2>
							<Badge className="card-estadisticas-c__icon"><BiClipboard /></Badge>
						</div>
						<h1 className="card-estadisticas-c__estadistica">{estadisticas.cantidad_sesiones}</h1>
						<p className="card-estadisticas-c__caption">Sesiones realizadas</p>
					</Card>

					<Card className="card-estadisticas-c">
						<div className="card-estadisticas-c__header">
							<h2 className="card-estadisticas-c__title">Tiempo total</h2>
							<Badge className="card-estadisticas-c__icon"><BiTime /></Badge>
						</div>
						<h1 className="card-estadisticas-c__estadistica">{castTime(estadisticas.tiempo_total)}</h1>
						<p className="card-estadisticas-c__caption">De tiempo trabajado</p>
					</Card>

				</div>

				<Card className="card-sesiones">
					<Card.Body>
						<Card.Title >Sesiones registradas</Card.Title>
						<Table className="table-sesiones">
							<thead>
								<tr>
									<th>Fecha</th>
									<th>Tiempo</th>
								</tr>
							</thead>
							<tbody>
								{sesionesByCaso.map((sesion, index) => (
									<tr key={index}>
										<td>{formatDateShow(sesion.fecha)}</td>
										<td>{castTime(sesion.tiempo)}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Card.Body>
				</Card>

			</main>
		</>
	);
}
export default Clientes;
