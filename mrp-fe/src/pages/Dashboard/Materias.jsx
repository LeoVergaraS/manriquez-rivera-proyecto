import "./materias.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Card } from "react-bootstrap";
import { BiUser, BiTime, BiClipboard } from "react-icons/bi";
import InputSelect from "../../components/InputSelect/InputSelect";
import GraficoGernal1 from "../../components/Graficos/GraficoGernal1";

const Materias = ({ id_abogado, fechaInicio, fechaFin, dropSelect, dropSiempre, dropAnio, setDropSelect }) => {
	const [materias, setMaterias] = useState([]);
	const [materia, setMateria] = useState({ id: 0 });
	const [sesionesMateria, setSesionesMateria] = useState([]);
	const [estadisticas, setEstadisticas] = useState({
		cantidad_sesiones: 0,
		tiempo_total: 0,
		cantidad_clientes: 0,
	});

	const getMaterias = async () => {
		try {
			let url = "http://localhost:8090/materias";
			const response = await axios.get(url);
			if (response.status === 200) {
				setMaterias(response.data);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const getSesionesByMateriaDesdeSiempre = async (id_abogado, fechaInicio, fechaFin, dropSelect, dropSiempre) => {
		try {
			let url = "http://localhost:8090/consultas/materia/sesiones/" + materia.id + "/" + id_abogado;
			const response = await axios.get(url);
			if (response.status === 200) {
				setSesionesMateria(response.data);
			}
		} catch (err) {
			console.error(err.message);
		}

	};

	const getSesionesByMateria = async (id_abogado, fechaInicio, fechaFin, dropSelect, dropSiempre, dropAnio) => {
		try {
			// si es que se selecciono desde siempre
			if (dropSiempre == 1) {
				console.log("ENTRE?")
				getSesionesByMateriaDesdeSiempre(id_abogado, fechaInicio, fechaFin, dropSelect, dropSiempre);
			}
			else {
				// esto calcula la diferencia de dias entre las fechas cuando se selecciona un año en el dropSelect
				if (dropAnio == 1) {
					const fechaInicioAux = new Date(fechaInicio);
					const fechaFinAux = new Date(fechaFin);

					const difMS = fechaFinAux - fechaInicioAux;
					const difDias = Math.trunc(difMS / (1000 * 60 * 60 * 24));
					setDropSelect(difDias + 1);
				}
				let url = "http://localhost:8090/consultas/materia/sesiones/" + materia.id + "/" + fechaInicio + "/" + fechaFin + "/" + dropSelect + "/" + id_abogado;
				const response = await axios.get(url);
				if (response.status === 200) {
					console.log(response.data);
					setSesionesMateria(response.data);
				}
			}
		} catch (err) {
			console.error(err);
		}

	};

	const getEstadisticas = async (id_abogado, fechaInicio, fechaFin, dropSiempre) => {
		try {
			let url = "http://localhost:8090/consultas/materia/estadisticas/" + id_abogado + "/" + materia.id +
				"/" + fechaInicio + "/" + fechaFin + "/" + dropSiempre;
			const response = await axios.get(url);
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
		/* if (materia.id !== undefined && props.abogado.id !== 0){
		   getEstadisticas(props.abogado.id, materia.id, props.fechaInicio, props.fechaFin);
		 };*/
		if (materia.id !== 0) {
			//console.log("ENTRE?");
			getSesionesByMateria(id_abogado, fechaInicio, fechaFin, dropSelect, dropSiempre, dropAnio);
			getEstadisticas(id_abogado, fechaInicio, fechaFin, dropSiempre);
		}

	}, [materia, id_abogado, fechaInicio, fechaFin, dropSelect, dropSiempre, dropAnio, setDropSelect]);

	return (
		<main className="layout-materias">
			<h2 className="materias__title">Resumen</h2>
			<fieldset className="materias__fieldset-select">
				<legend className="materias__legend"> Buscar materia</legend>
				<InputSelect
					objects={materias}
					placeholder={"Seleccione una materia"}
					set={setMateria}
					createOption={createMateriaOption}
				/>
			</fieldset>
			<Card className="card-grafico">
				<GraficoGernal1 tiempoSesiones={sesionesMateria} title={"Tiempo de sesiones por día"} />
			</Card>
			<Card className="card-estadisticas">
				<div className="card-estadisticas__header">
					<h2 className="card-estadisticas__title">Sesiones</h2>
					<Badge className="card-estadisticas__icon"><BiClipboard /></Badge>
				</div>
				<h1 className="card-estadisticas__estadistica">{estadisticas.cantidad_sesiones}</h1>
				<p className="card-estadisticas__caption">Sesiones realizadas</p>
			</Card>
			<Card className="card-estadisticas">
				<div className="card-estadisticas__header">
					<h2 className="card-estadisticas__title">Tiempo</h2>
					<Badge className="card-estadisticas__icon"><BiTime /></Badge>
				</div>
				<h1 className="card-estadisticas__estadistica">{estadisticas.tiempo_total}</h1>
				<p className="card-estadisticas__caption">Hrs trabajadas</p>
			</Card>
			<Card className="card-estadisticas">
				<div className="card-estadisticas__header">
					<h2 className="card-estadisticas__title">Clientes</h2>
					<Badge className="card-estadisticas__icon"><BiUser /></Badge>
				</div>
				<h1 className="card-estadisticas__estadistica">{estadisticas.cantidad_clientes}</h1>
				<p className="card-estadisticas__caption">Clientes atendidos</p>
			</Card>
		</main>
	);
};

export default Materias;
