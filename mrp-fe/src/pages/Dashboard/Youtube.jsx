import { Button, Form, Modal, Row } from "react-bootstrap";
import "./youtube.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import DropdownR from "../../components/Dropdown/DropdownR";
import formatearFecha from "../../utils/functions/formatearFecha";
import General from "./General";
import Clientes from "./Clientes";
import Materias from "./Materias";
import DropdownAbogado from "../../components/Dropdown/DropdownAbogado";

const Youtube = () => {
	const [selectedCliente, setSelectedCliente] = useState("");
	const [selectedGeneral, setSelectedGeneral] = useState("selected");
	const [selectedMateria, setSelectedMateria] = useState("");
	const [personalizado, setPersonalizado] = useState({
		fechaInicio: new Date(),
		fechaFin: new Date(),
	});

	const [dropSelect, setDropSelect] = useState(7);
	const [dropSiempre, setDropSiempre] = useState(0);
	const [dropAnio, setDropAnio] = useState(0);

	const [flag, setFlag] = useState(0);

	const [estadisticas, setEstadisticas] = useState([]);

	const [showModal, setShowModal] = useState(false);

	const [fechaFin, setFechaFin] = useState(formatearFecha(new Date(), 1, 0));
	const [fechaInicio, setFechaInicio] = useState(
		formatearFecha(new Date(), 0, 7)
	);
	// Variable que almacena las consultas de vista GENERAL
	// se les aplica todos los filtros  
	const [consultasS, setConsultasS] = useState([]);
	const [consultasM, setConsultasM] = useState([]);

	const [abogado, setAbogado] = useState({
		nombre: "Abogados",
		id: -1,
	});

	const [abogados, setAbogados] = useState([]);

	const handleModal = () => setShowModal(!showModal);

	const abogadoSelect = (eventKey) => {
		if (eventKey === "-1") {
			setAbogado({
				nombre: "Todos",
				id: -1,
			});
		} else {
			setAbogado(abogados[eventKey]);
		}
	}

	const handleSelected = (type) => {
		if (type === "cliente") {
			setSelectedCliente("selected");
			setSelectedMateria("");
			setSelectedGeneral("");
		} else if (type === "materia") {
			setSelectedMateria("selected");
			setSelectedCliente("");
			setSelectedGeneral("");
		} else {
			setSelectedGeneral("selected");
			setSelectedCliente("");
			setSelectedMateria("");
		}
	};

	const getConsultasMaterias = async () => {
		try {
			let url =
				"http://localhost:8090/consultas/materia/" +
				fechaInicio +
				"/" +
				fechaFin + "/" + dropSelect + "/" + dropSiempre + "/" + abogado.id;
			const response = await axios.get(url);
			if (response.status === 200) {
				setConsultasM(response.data);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const handleSearch = () => {
		setFechaInicio(formatDate(personalizado.fechaInicio));
		setFechaFin(formatDate(personalizado.fechaFin));
		console.log("personalizado.fechaInicio", personalizado.fechaInicio)
		console.log("personalizado.fechaFin", personalizado.fechaFin)
		const difMS = personalizado.fechaFin - personalizado.fechaInicio;
		const difDias = Math.trunc(difMS / (1000 * 60 * 60 * 24));
		setDropSelect(difDias + 1);
		setDropSiempre(0);
		setDropAnio(0);
		handleModal();
	};

	const formatDate = (date) => {
		let dd = date.getDate();
		let mm = date.getMonth() + 1;
		let yyyy = date.getFullYear();
		if (dd < 10) {
			dd = "0" + dd;
		}
		if (mm < 10) {
			mm = "0" + mm;
		}
		return yyyy + "-" + mm + "-" + dd;
	};
	// aqui se obtienen las consultas de sesiones
	const getConsultasSesiones = async () => {
		try {

			// si es que se selecciono desde siempre
			if (dropSiempre == 1) {
				console.log("ENTRE?")
				getConsultasSesionesDesdeSiempre();
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

				// todas las otras opciones
				console.log("Porfa hace algo");
				let url =
					"http://localhost:8090/consultas/sesiones/" +
					fechaInicio +
					"/" +
					fechaFin + "/" + dropSelect + "/" + abogado.id;
				const response = await axios.get(url);

				if (response.status === 200) {
					setConsultasS(response.data);
				}

			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const getConsultasSesionesDesdeSiempre = async () => {
		try {
			let url =
				"http://localhost:8090/consultas/sesiones/" + abogado.id;
			const response = await axios.get(url);
			if (response.status === 200) {
				setConsultasS(response.data);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const getEstadisticas = async () => {
		try {
			let url = "http://localhost:8090/consultas/prueba/" + fechaInicio + "/" + fechaFin + "/" + dropSiempre + "/" + abogado.id;
			const response = await axios.get(url);
			if (response.status === 200) {
				setEstadisticas(response.data);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const getAbogados = async () => {
		try {
			let url = "http://localhost:8090/abogados";
			const response = await axios.get(url);
			if (response.status === 200) {
				setAbogados(response.data);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		getConsultasMaterias();
		getConsultasSesiones();
		getEstadisticas();
		getAbogados();
		console.log("fecha inicio", fechaInicio);
		console.log("fecha fin", fechaFin);
		console.log("dropSelect", dropSelect);
		//console.log("abogadoaa",abogado);
	}, [fechaFin, fechaInicio, dropSelect, dropSiempre, dropAnio, abogado, flag, abogado]);

	return (
		<>
			<div className="navegador">
				<ul className="navegador__tabs">
					<p
						className={"navegador__tabs-item " + selectedGeneral}
						onClick={() => handleSelected("general")}
					>
						General
					</p>
					<p
						className={"navegador__tabs-item " + selectedCliente}
						onClick={() => handleSelected("cliente")}
					>
						Clientes
					</p>
					<p
						className={"navegador__tabs-item " + selectedMateria}
						onClick={() => handleSelected("materia")}
					>
						Materia
					</p>
				</ul>
				<div className="dropDowns" >

					<DropdownAbogado
						dropSelect={abogadoSelect}
						abogados={abogados}
						abogado={abogado}
					/>

					<DropdownR
						className="navegador__tiempo"
						setFI={setFechaInicio}
						setFF={setFechaFin}
						setDropSelect={setDropSelect}
						setDropSiempre={setDropSiempre}
						setDropAnio={setDropAnio}
						setShowModal={setShowModal}
						setFlag={setFlag}
					/>

				</div>
			</div>

			{selectedGeneral === "selected" ? (
				<General consultasS={consultasS} estadisticas={estadisticas} consultasM={consultasM} />) : null}

			{selectedCliente === "selected" ? (
				<Clientes fechaInicio={fechaInicio}
					fechaFin={fechaFin}
					flag={flag}
					id_abo={abogado.id} />) : null}


			{selectedMateria === "selected" ? (
				<Materias abogado={abogado} fechaInicio={fechaInicio} fechaFin={fechaFin} />) : null}

			<Modal show={showModal} onHide={handleModal}>
				<Modal.Header closeButton>
					<Modal.Title>Rango de tiempo</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Fecha inicio</Form.Label>
							<Form.Control
								type="date"
								value={formatDate(personalizado.fechaInicio)}
								onChange={(e) =>
									setPersonalizado({
										...personalizado,
										fechaInicio: new Date(e.target.value),
									})
								}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Fecha fin</Form.Label>
							<Form.Control
								type="date"
								value={formatDate(personalizado.fechaFin)}
								onChange={(e) =>
									setPersonalizado({
										...personalizado,
										fechaFin: new Date(e.target.value),
									})
								}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleModal}>
						Cancelar
					</Button>
					<Button variant="success" onClick={handleSearch}>
						Buscar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Youtube;
