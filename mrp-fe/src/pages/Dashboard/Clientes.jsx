import { Card, Row, Col, Container, Badge, Table } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";
import Table_01 from "../../components/Table_01/Table_01";
import { useEffect, useState } from "react";
import InputSelect from "../../components/InputSelect/InputSelect";
import axios from 'axios';
import formatDateShow from "../../utils/functions/formatDateShow";
import "./cliente.scss";

const Clientes = ({ consultasS, fechaInicio, fechaFin, flag }) => {

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
			let url = "http://localhost:8090/consultas/sesiones/id_caso/" + id + "/" + fechaInicio + "/" + fechaFin + "/" + flag;
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
		console.log(fechaInicio, fechaFin)
		getCasos();
	}, [fechaInicio, fechaFin, flag])

	useEffect(() => {
		if (caso.id !== undefined) getSesionesByIdCaso(caso.id);
	}, [caso, fechaInicio, fechaFin, flag])

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

				<Card className="card-estadisticas">
					<div className="card-estadisticas__header">
						<h2 className="card-estadisticas__title">Sesiones</h2>
						<Badge className="card-estadisticas__icon">Bi</Badge>
					</div>
					<h1 className="card-estadisticas__estadistica">12</h1>
					<p className="card-estadisticas__caption">Sesiones realizadas</p>
				</Card>

				<Card className="card-estadisticas">
					<div className="card-estadisticas__header">
						<h2 className="card-estadisticas__title">Tiempo total</h2>
						<Badge className="card-estadisticas__icon">Bi</Badge>
					</div>
					<h1 className="card-estadisticas__estadistica">8h 17m</h1>
					<p className="card-estadisticas__caption">Tiempo trabajado</p>
				</Card>

				<Card className="card-estadisticas">
					<div className="card-estadisticas__header">
						<h2 className="card-estadisticas__title">Otra estadistica</h2>
						<Badge className="card-estadisticas__icon">Bi</Badge>
					</div>
					<h1 className="card-estadisticas__estadistica">-----</h1>
					<p className="card-estadisticas__caption">------</p>
				</Card>

				<Card className="card-sesiones">
					<Card.Body>
						<Card.Title >Sesiones registradas</Card.Title>
						<Table responsive="sm" hover >
							<thead>
								<tr>
									<th style={{ width: '100px' }}>Fecha</th>
									<th style={{ width: '100px' }}>Tiempo</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>2021-10-01</td>
									<td>1h 30m</td>
								</tr>
							</tbody>
						</Table>
					</Card.Body>
				</Card>

			</main>
		</>
	);
}
export default Clientes;
