import { Card, Badge, Table } from "react-bootstrap";
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";
import { useEffect, useState } from "react";
import InputSelect from "../../components/InputSelect/InputSelect";
import axios from 'axios';
import formatDateShow from "../../utils/functions/formatDateShow";
import "./cliente.scss";
import castTime from "../../utils/functions/castTime";
import { BiUser, BiTime, BiClipboard } from "react-icons/bi";

const Clientes = ({fechaInicio, fechaFin, flag, id_abo}) => {

	const [casos, setCasos] = useState([]);
	const [caso, setCaso] = useState([]);
	const [sesionesByCaso, setSesionesByCaso] = useState([]);
	const [estadisticas, setEstadisticas] = useState([]);

	//console.log("id abo",id_abo);
	//console.log("flag",flag);

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
			let url = "http://localhost:8090/consultas/sesiones/id_caso/" + id + "/" + fechaInicio + "/" + fechaFin + "/" + flag + "/" + id_abo;
			const response = await axios.get(url);
			if (response.status === 200) {
				//console.log(response.data);
				setSesionesByCaso(response.data);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const getEstadisticas = async (id_caso, fechaInicio, fechaFin, id_abo, flag) => {
		try {
			let url = `http://localhost:8090/consultas/cliente/estadisticas/${id_caso}/${fechaInicio}/${fechaFin}/${id_abo}/${flag}`;
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
	}, [fechaInicio, fechaFin, flag, id_abo])

	useEffect(() => {
		if (caso.id !== undefined){
			getSesionesByIdCaso(caso.id);
			getEstadisticas(caso.id, fechaInicio, fechaFin, id_abo, flag);
		} 
	}, [caso, fechaInicio, fechaFin, flag, id_abo])

	const createCasoOption = (caso) => {
		return (
			{
				label: `${caso.id_cliente.nombre} - ${caso.id_materia.nombre} - ${formatDateShow(caso.fecha)}`,
				value: caso.id
			}
		)
	}

	//console.log(sesionesByCaso);

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
				
				<div style={{display: "flex", justifyContent: "center",alignItems:"center", gap:"50px", gridColumn:"1/4"}}>

				<Card className="card-estadisticas">
					<div className="card-estadisticas__header">
						<h2 className="card-estadisticas__title">Sesiones</h2>
						<Badge className="card-estadisticas__icon"><BiClipboard/></Badge>
					</div>
					<h1 className="card-estadisticas__estadistica">{estadisticas.cantidad_sesiones}</h1>
					<p className="card-estadisticas__caption">Sesiones realizadas</p>
				</Card>

				<Card className="card-estadisticas">
					<div className="card-estadisticas__header">
						<h2 className="card-estadisticas__title">Tiempo total</h2>
						<Badge className="card-estadisticas__icon"><BiTime/></Badge>
					</div>
					<h1 className="card-estadisticas__estadistica">{castTime(estadisticas.tiempo_total)}</h1>
					<p className="card-estadisticas__caption">Tiempo trabajado</p>
				</Card>

				</div>

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
